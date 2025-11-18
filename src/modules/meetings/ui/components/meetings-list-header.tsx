'use client'

import { ResponsiveDialog } from '@/components/responsive-dialog'
import { Button } from '@/components/ui/button'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { SearchFilter } from './meetings-search-filter'
import { MeetingForm } from './meeting-form'
import { StatusFilter } from './status-filter'
import { AgentsFilter } from './agents-filter'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import { useRouter } from 'next/navigation'

export const MeetingsListHeader = () => {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useMeetingsFilters()
  const router = useRouter()

  const hasFilters = filters.search || filters.status || filters.agentId

  const handleClearAllFilters = () => {
    setFilters({
      search: '',
      status: null,
      agentId: '',
    })
  }

  return (
    <>
      <div className="flex items-center justify-between py-6">
        <h2 className="text-2xl font-semibold">My Meetings</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusIcon />
          New Meeting
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <SearchFilter />
        <StatusFilter />
        <AgentsFilter />
        {hasFilters && (
          <Button variant="outline" onClick={handleClearAllFilters}>
            <XCircleIcon />
            Clear
          </Button>
        )}
      </div>
      <ResponsiveDialog
        title="New Meeting"
        description="Create a new meeting"
        open={open}
        onOpenChange={setOpen}
      >
        <MeetingForm
          onCancel={() => setOpen(false)}
          onSuccess={(id) => {
            setOpen(false)
            router.push(`/meetings/${id}`)
          }}
        />
      </ResponsiveDialog>
    </>
  )
}
