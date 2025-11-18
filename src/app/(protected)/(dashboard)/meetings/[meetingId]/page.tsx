import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { MeetingIdView } from '@/modules/meetings/ui/views/meeting-id-view'
import { HydrateClient, prefetch, trpc } from '@/trpc/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const Page = async ({ params }: { params: Promise<{ meetingId: string }> }) => {
  const { meetingId } = await params
  prefetch(trpc.meetings.getOne.queryOptions({ id: meetingId }))

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={<ErrorState title="Failed to load meeting details" />}
      >
        <Suspense
          fallback={<LoadingState title="Loading Meeting Details..." />}
        >
          <MeetingIdView meetingId={meetingId} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default Page
