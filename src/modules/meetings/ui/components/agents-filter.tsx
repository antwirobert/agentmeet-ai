'use client'

import { useQuery } from '@tanstack/react-query'
import { CommandSelect } from './command-select'
import { useTRPC } from '@/trpc/client'
import { MAX_PAGE_SIZE } from '@/constants'
import { useState } from 'react'
import GeneratedAvatar from '@/components/generated-avatar'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'

export const AgentsFilter = () => {
  const [agentSearchTerm, setAgentSearchTerm] = useState('')
  const [filters, setFilters] = useMeetingsFilters()

  const trpc = useTRPC()
  const { data } = useQuery(
    trpc.agents.getAll.queryOptions({
      pageSize: MAX_PAGE_SIZE,
      search: agentSearchTerm,
    })
  )

  return (
    <CommandSelect
      options={(data?.agents ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-3">
            <GeneratedAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="size-6"
            />
            {agent.name}
          </div>
        ),
      }))}
      value={filters.agentId}
      onSelect={(value) => setFilters({ agentId: value })}
      onSearch={setAgentSearchTerm}
      placeholder="Agent"
    />
  )
}
