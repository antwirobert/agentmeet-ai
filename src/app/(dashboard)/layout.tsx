import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { DashboardNavbar } from '@/modules/dashboard/ui/components/dashboard-navbar'
import { DashboardSidebar } from '@/modules/dashboard/ui/components/dashboard-sidebar'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col w-screen h-screen bg-muted">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default Layout
