import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { AgentIdView } from '@/modules/agents/ui/views/agent-id-view'
import { HydrateClient, prefetch, trpc } from '@/trpc/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface PageProps {
  params: Promise<{
    agentId: string
  }>
}

const Page = async ({ params }: PageProps) => {
  const { agentId } = await params
  prefetch(trpc.agents.getOne.queryOptions({ id: agentId }))

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={<ErrorState title="Failed to load agent details" />}
      >
        <Suspense fallback={<LoadingState title="Loading Agent Details..." />}>
          <AgentIdView agentId={agentId} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default Page
