import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { TRPCReactProvider } from '@/trpc/client'
import { NuqsAdapter } from 'nuqs/adapters/next'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AgentMeet AI',
  description:
    'AgentMeet AI is a next-generation video calling platform where every meeting includes a real-time AI agent trained for a specific role',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster />
        </body>
      </html>
    </TRPCReactProvider>
  )
}
