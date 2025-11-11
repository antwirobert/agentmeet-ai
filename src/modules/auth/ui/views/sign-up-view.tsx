'use client'

import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useState } from 'react'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string().min(2, {
      message: 'Password must be at least 8 characters.',
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const SignUpView = () => {
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setPending(true)
        },
        onSuccess: () => {
          setPending(false)
          toast.success('Sign up successful')
          router.push('/')
        },
        onError: ({ error }) => {
          setPending(false)
          toast.error(error.message)
        },
      }
    )
  }

  const handleSocialSignOn = async (provider: 'google' | 'github') => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL: '/',
      },
      {
        onRequest: () => {
          setPending(true)
        },
        onSuccess: () => {
          setPending(false)
        },
        onError: ({ error }) => {
          setPending(false)
          toast.error(error.message)
        },
      }
    )
  }

  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="p-0 grid md:grid-cols-2">
        <Form {...form}>
          <div className="flex flex-col p-8">
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-2xl">Let's get started</h2>
              <p className="text-muted-foreground">Create your account</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Robert Antwi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="robertantwi@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full mt-2" disabled={pending}>
                {pending ? <Loader2Icon className="animate-spin" /> : 'Sign up'}
              </Button>

              <div
                className="after:border-border relative text-center text-sm
                    after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex
                    after:items-center after:border-t"
              >
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  or continue with
                </span>
              </div>

              <div className="w-full flex items-center gap-5">
                <Button
                  type="button"
                  onClick={() => handleSocialSignOn('google')}
                  variant="outline"
                  className="w-9/20"
                  disabled={pending}
                >
                  <FaGoogle />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-9/20 ml-4"
                  onClick={() => handleSocialSignOn('github')}
                  disabled={pending}
                >
                  <FaGithub />
                </Button>
              </div>

              <p className="font-medium text-center">
                Already have an account?{' '}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </Form>
        <div className="hidden bg-radial from-sidebar-accent to-sidebar md:flex flex-col gap-6 items-center justify-center">
          <img src="/logo.svg" alt="logo" width={90} height={90} />
          <h2 className="text-white font-semibold text-2xl">AgentMeet.AI</h2>
        </div>
      </CardContent>
    </Card>
  )
}
