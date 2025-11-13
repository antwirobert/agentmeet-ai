import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { loadSearchParams } from '@/modules/agents/search-params'
import { AgentsListHeader } from '@/modules/agents/ui/components/agents-list-header'
import { AgentsView } from '@/modules/agents/ui/views/agents-view'
import { HydrateClient, prefetch, trpc } from '@/trpc/server'
import type { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

type PageProps = {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: PageProps) => {
  const filters = await loadSearchParams(searchParams)

  prefetch(
    trpc.agents.getAll.queryOptions({
      ...filters,
    })
  )

  return (
    <section className="px-4 md:px-8">
      <AgentsListHeader />
      <HydrateClient>
        <ErrorBoundary fallback={<ErrorState title="Failed to load agents." />}>
          <Suspense fallback={<LoadingState title="Loading Agents" />}>
            <AgentsView />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </section>
  )
}

export default Page
