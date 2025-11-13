import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

interface AgentIdViewHeaderProps {
  agentId: string
  agentName: string
  onEdit: () => void
  onDelete: () => void
}

export const AgentIdViewHeader = ({
  agentId,
  agentName,
  onEdit,
  onDelete,
}: AgentIdViewHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/agents" className="text-xl">
                My Agents
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="mt-1" />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Link
                href={`/agents/${agentId}`}
                className="text-xl font-semibold"
              >
                {agentName}
              </Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <MoreVerticalIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
              <PencilIcon />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="cursor-pointer">
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
