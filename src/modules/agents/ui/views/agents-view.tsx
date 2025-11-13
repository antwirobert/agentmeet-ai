'use client'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { DataTable } from '../components/data-table'
import { columns } from '../components/columns'
import EmptyState from '@/components/empty-state'
import { useAgentsFilters } from '../../hooks/use-agents-filters'
import { useRouter } from 'next/navigation'
import { DataPagination } from '../components/data-pagination'

export const AgentsView = () => {
  const router = useRouter()
  const [filters, setFilters] = useAgentsFilters()

  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.agents.getAll.queryOptions({
      ...filters,
    })
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={data.agents}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        currentPage={filters.page}
        totalPages={data.totalPages}
        onPageChange={(currentPage) => setFilters({ page: currentPage })}
      />
      {data.agents.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and
            can interact with participants during the call."
        />
      )}
    </>
  )
}
