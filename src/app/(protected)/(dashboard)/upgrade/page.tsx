import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { UpgradeView } from '@/modules/premium/ui/views/upgrade-view'
import { HydrateClient, prefetch, trpc } from '@/trpc/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const Page = async () => {
  prefetch(trpc.premium.getCurrentSubscription.queryOptions())

  prefetch(trpc.premium.getProducts.queryOptions())
  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={
          <ErrorState
            title="Error"
            description="Please try again later"
            className="mt-15"
          />
        }
      >
        <Suspense
          fallback={
            <LoadingState
              title="Loading"
              description="This may take a few seconds"
              className="mt-15"
            />
          }
        >
          <UpgradeView />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default Page
