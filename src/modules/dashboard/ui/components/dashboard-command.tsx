import GeneratedAvatar from '@/components/generated-avatar'
import {
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog,
  CommandGroup,
  CommandEmpty,
} from '@/components/ui/command'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'

interface DashboardCommandProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const trpc = useTRPC()

  const meetings = useQuery(
    trpc.meetings.getAll.queryOptions({
      search,
      pageSize: 100,
    })
  )

  const agents = useQuery(
    trpc.agents.getAll.queryOptions({
      search,
      pageSize: 100,
    })
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Find a meeting or agent..."
        value={search}
        onValueChange={(value) => setSearch(value)}
      />
      <CommandList>
        <CommandGroup heading="Meetings">
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No meetings found
            </span>
          </CommandEmpty>
          {meetings.data?.meetings.map((meeting) => (
            <CommandItem
              key={meeting.id}
              onSelect={() => {
                router.push(`/meetings/${meeting.id}`)
                setOpen(false)
              }}
            >
              {meeting.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Agents">
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No agents found
            </span>
          </CommandEmpty>
          {agents.data?.agents.map((agent) => (
            <CommandItem
              key={agent.id}
              onSelect={() => {
                router.push(`/agents/${agent.id}`)
                setOpen(false)
              }}
            >
              <GeneratedAvatar
                seed={agent.name}
                variant="botttsNeutral"
                className="size-5"
              />
              {agent.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export default DashboardCommand
