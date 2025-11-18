'use cient'

import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { ChevronsUpDownIcon } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface CommandSelectProps {
  options: Array<{
    id: string
    value: string
    children: ReactNode
  }>
  onSelect: (value: string) => void
  onSearch?: (value: string) => void
  value: string
  placeholder: string
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder,
}: CommandSelectProps) => {
  const [open, setOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value)

  return (
    <>
      <Button
        variant="outline"
        type="button"
        className={cn(
          'flex justify-between',
          !selectedOption && 'text-muted-foreground'
        )}
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center">
          {selectedOption?.children ?? placeholder}
        </div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(open: boolean) => {
          if (!open) onSearch?.('')
          setOpen(open)
        }}
        className="rounded-lg border shadow-md md:min-w-[450px]"
        shouldFilter={!onSearch}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value)
                onSearch?.('')
                setOpen(false)
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
