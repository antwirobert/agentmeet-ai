'use client'

import { ColumnDef } from '@tanstack/react-table'
import { AgentsGetAll } from '../../types'
import GeneratedAvatar from '@/components/generated-avatar'
import { CornerDownRightIcon, VideoIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<AgentsGetAll[number]>[] = [
  {
    accessorKey: 'name',
    header: 'Agent Name',
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1 p-2">
        <div className="flex items-center gap-2">
          <GeneratedAvatar
            seed={row.original.name}
            variant="botttsNeutral"
            className="size-7"
          />
          <span className="capitalize font-semibold max-w-[200px] truncate">
            {row.original.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CornerDownRightIcon className="size-4 opacity-60" />
          <span className="capitalize text-muted-foreground max-w-[200px] truncate">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'meetings',
    header: 'Meeting Count',
    cell: ({ row }) => (
      <Badge variant={'outline'} className="flex flex-1 gap-2 [&>svg]:size-4">
        <VideoIcon className="text-blue-600" />
        <span>
          {row.original.meetingCount}{' '}
          {row.original.meetingCount === 1 ? 'meeting' : 'meetings'}
        </span>
      </Badge>
    ),
  },
]
