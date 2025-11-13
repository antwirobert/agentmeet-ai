'use client'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { PanelLeftIcon, SearchIcon } from 'lucide-react'

export const DashboardNavbar = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <nav className="bg-white py-3 border-b px-4 flex items-center gap-2">
      <Button variant="outline" onClick={toggleSidebar}>
        <PanelLeftIcon />
      </Button>
      <Button variant="outline" className="w-55 flex justify-between">
        <span className="flex items-center gap-2">
          <SearchIcon />
          Search
        </span>

        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    </nav>
  )
}
