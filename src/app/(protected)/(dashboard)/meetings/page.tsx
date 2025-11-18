import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { loadSearchParams } from '@/modules/meetings/search-params'
import { MeetingsListHeader } from '@/modules/meetings/ui/components/meetings-list-header'
import { MeetingsView } from '@/modules/meetings/ui/views/meetings-view'
import { HydrateClient, prefetch, trpc } from '@/trpc/server'
import type { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

type PageProps = {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await loadSearchParams(searchParams)

  prefetch(
    trpc.meetings.getAll.queryOptions({
      ...params,
    })
  )

  return (
    <section className="px-4 md:px-8">
      <MeetingsListHeader />
      <HydrateClient>
        <ErrorBoundary
          fallback={<ErrorState title="Failed to load meetings." />}
        >
          <Suspense fallback={<LoadingState title="Loading Meetings" />}>
            <MeetingsView />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </section>
  )
}

export default Page
