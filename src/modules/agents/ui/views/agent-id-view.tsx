'use client'

import GeneratedAvatar from '@/components/generated-avatar'
import { Badge } from '@/components/ui/badge'

import { useTRPC } from '@/trpc/client'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { VideoIcon } from 'lucide-react'
import { AgentIdViewHeader } from '../components/agent-id-view-header'
import { useState } from 'react'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { AgentForm } from '../components/agent-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useConfirm } from '@/hooks/use-confirm'

export const AgentIdView = ({ agentId }: { agentId: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const queryClient = useQueryClient()
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  )

  const [ConfirmationDialog, confirm] = useConfirm(
    'Are you sure?',
    `The following action will remove ${data.meetingCount} associated meetings`
  )

  const deleteAgent = useMutation(
    trpc.agents.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getAll.queryOptions({}))
        router.push('/agents')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const handleDeleteAgent = async () => {
    const ok = await confirm()

    if (!ok) return

    await deleteAgent.mutateAsync({ id: agentId })
  }

  return (
    <>
      <ConfirmationDialog />
      <ResponsiveDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Edit Agent"
        description="Edit the agent details"
      >
        <AgentForm
          onCancel={() => setIsOpen(false)}
          onSuccess={() => setIsOpen(false)}
          initialValues={data}
        />
      </ResponsiveDialog>
      <div className="pt-5 px-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setIsOpen(true)}
          onDelete={handleDeleteAgent}
        />
        <div className="border rounded-lg my-5 bg-background p-4">
          <div className="flex items-center gap-3">
            <GeneratedAvatar seed={data.name} variant="botttsNeutral" />
            <h2 className="text-xl font-semibold">{data.name}</h2>
          </div>

          <Badge variant="outline" className="my-4">
            <VideoIcon className="text-blue-600" />
            {data.meetingCount}{' '}
            {data.meetingCount === 1 ? 'meeting' : 'meetings'}
          </Badge>
          <h3 className="font-semibold text-xl mb-3">Instructions</h3>
          <p>{data.instructions}</p>
        </div>
      </div>
    </>
  )
}
