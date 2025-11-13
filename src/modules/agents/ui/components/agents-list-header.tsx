'use client'

import { ResponsiveDialog } from '@/components/responsive-dialog'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { AgentForm } from './agent-form'
import { SearchFilter } from './agents-search-filter'

export const AgentsListHeader = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between py-6">
        <h2 className="text-2xl font-semibold">My Agents</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusIcon />
          New Agent
        </Button>
      </div>
      <SearchFilter />
      <ResponsiveDialog
        title="New Agent"
        description="Create a new agent"
        open={open}
        onOpenChange={setOpen}
      >
        <AgentForm
          onCancel={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
        />
      </ResponsiveDialog>
    </>
  )
}
