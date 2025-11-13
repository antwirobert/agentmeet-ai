import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { TRPCReactProvider } from '@/trpc/client'
import { NuqsAdapter } from 'nuqs/adapters/next'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AgentMeet AI',
  description:
    'A video calling app powered entirely by ai agents trained for a specific role.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster />
        </body>
      </html>
    </TRPCReactProvider>
  )
}
