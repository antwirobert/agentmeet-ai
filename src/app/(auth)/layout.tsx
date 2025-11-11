import { Terms } from '@/modules/auth/ui/components/terms'
import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
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
