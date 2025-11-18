import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'

export const SearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilters()

  return (
    <div className="relative">
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
