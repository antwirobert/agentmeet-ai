'use client'

import { useTRPC } from '@/trpc/client'
import { MeetingIdViewHeader } from '../components/meeting-id-view-header'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useState } from 'react'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { MeetingForm } from '../components/meeting-form'
import { useConfirm } from '@/hooks/use-confirm'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { UpcomingState } from '../components/upcoming-state'
import CancelledState from '../components/cancelled-state'
import ProcessingState from '../components/processing-state'
import { ActiveState } from '../components/active-state'
import { CompletedState } from '../components/completed-state'

export const MeetingIdView = ({ meetingId }: { meetingId: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const queryClient = useQueryClient()
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  )

  const [ConfirmationDialog, confirm] = useConfirm(
    'Are you sure?',
    'The following action will remove this meeting'
  )

  const deleteMeeting = useMutation(
    trpc.meetings.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getAll.queryOptions({})
        )
        router.push('/meetings')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const handleDeleteMeeting = async () => {
    const ok = await confirm()

    if (!ok) return

    await deleteMeeting.mutateAsync({ id: meetingId })
  }

  const isActive = data.status === 'active'
  const isCancelled = data.status === 'cancelled'
  const isCompleted = data.status === 'completed'
  const isProcessing = data.status === 'processing'
  const isUpcoming = data.status === 'upcoming'

  return (
    <>
      <ConfirmationDialog />
      <ResponsiveDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Edit Meeting"
        description="Edit the meeting details"
      >
        <MeetingForm
          onCancel={() => setIsOpen(false)}
          onSuccess={() => setIsOpen(false)}
          initialValues={data}
        />
      </ResponsiveDialog>
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setIsOpen(true)}
          onDelete={handleDeleteMeeting}
        />
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <CompletedState data={data} />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && <UpcomingState meetingId={meetingId} />}
      </div>
    </>
  )
}
