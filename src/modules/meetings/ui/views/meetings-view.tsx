'use client'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import EmptyState from '@/components/empty-state'
import { useRouter } from 'next/navigation'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import { DataTable } from '@/components/data-table'
import { columns } from '../components/columns'
import { DataPagination } from '@/components/data-pagination'

export const MeetingsView = () => {
  const router = useRouter()
  const [filters, setFilters] = useMeetingsFilters()

  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.meetings.getAll.queryOptions({
      ...filters,
    })
  )

  return (
    <div className="w-full pb-10">
      <DataTable
        columns={columns}
        data={data.meetings}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        currentPage={filters.page}
        totalPages={data.totalPages}
        onPageChange={(currentPage) => setFilters({ page: currentPage })}
      />
      {data.meetings.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you
            collaborate, share ideas, and interact with participants in real time."
        />
      )}
    </div>
  )
}
