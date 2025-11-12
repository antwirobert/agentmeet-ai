'use client'

import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { BotIcon, StarIcon, VideoIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserProfile } from './user-profile'

const firstSection = [
  {
    title: 'Meetings',
    url: '/meetings',
    icon: VideoIcon,
  },
  {
    title: 'Agents',
    url: '/agents',
    icon: BotIcon,
  },
]

const secondSection = [
  {
    title: 'Upgrade',
    url: '/upgrade',
    icon: StarIcon,
  },
]

export const DashboardSidebar = () => {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-1 mt-2">
          <Image src="/logo.svg" alt="logo" width={40} height={50} />
          <h1 className="font-bold text-2xl text-white">AgentMeet.AI</h1>
        </Link>
      </SidebarHeader>
      <div className="px-3 py-3">
        <Separator className="opacity-30 bg-[#616771]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={cn(
                      'h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D637B]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                      pathname === item.url &&
                        'bg-linear-to-r/oklch border-[#5D637B]/10'
                    )}
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-3 mt-4">
          <Separator className="opacity-30 bg-[#616771]" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={cn(
                      'h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D637B]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                      pathname === item.url &&
                        'bg-linear-to-r/oklch border-[#5D637B]/10'
                    )}
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
