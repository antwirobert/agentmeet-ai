import { Input } from '@/components/ui/input'
import { useAgentsFilters } from '@/modules/agents/hooks/use-agents-filters'
import { SearchIcon } from 'lucide-react'

export const SearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters()

  return (
    <div className="relative mb-5">
      <Input
        type="text"
        placeholder="Filter by name"
        className="bg-background w-50 pl-7"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="absolute top-[11px] left-2 size-4 text-muted-foreground" />
    </div>
  )
}
