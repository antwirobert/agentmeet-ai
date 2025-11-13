import { auth } from '@/lib/auth'
import { Terms } from '@/modules/auth/ui/components/terms'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) redirect('/')

  return (
    <main className="bg-muted flex flex-col justify-center items-center min-h-screen py-4 px-8">
      <div className="w-full max-w-md md:max-w-4xl mx-auto">
        {children}
        <Terms />
      </div>
    </main>
  )
}

export default AuthLayout
