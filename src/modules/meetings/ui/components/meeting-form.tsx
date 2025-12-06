'use client'

import GeneratedAvatar from '@/components/generated-avatar'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { meetingsInsertSchema } from '../../schemas'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import { toast } from 'sonner'
import { MeetingGetOne } from '../../types'
import { CommandSelect } from './command-select'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { AgentForm } from '@/modules/agents/ui/components/agent-form'
import { useState } from 'react'
import { MAX_PAGE_SIZE } from '@/constants'
import { useRouter } from 'next/navigation'

interface MeetingFormProps {
  onCancel: () => void
  onSuccess: (id?: string) => void
  initialValues?: MeetingGetOne
}

export const MeetingForm = ({
  onCancel,
  onSuccess,
  initialValues,
}: MeetingFormProps) => {
  const [open, setOpen] = useState(false)
  const [searchAgent, setSearchAgent] = useState('')
  const router = useRouter()
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const { data } = useQuery(
    trpc.agents.getAll.queryOptions({
      pageSize: MAX_PAGE_SIZE,
      search: searchAgent,
    })
  )

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      agentId: initialValues?.agentId ?? '',
    },
  })

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getAll.queryOptions({})
        )
        toast.success('Meeting created sucessfully')

        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        )
        onSuccess(data.id)
      },
      onError: async (error) => {
        toast.error(error.message)

        if (error.data?.code === 'FORBIDDEN') {
          router.push('/upgrade')
        }
      },
    })
  )

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getAll.queryOptions({})
        )

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          )
        }
        toast.success('Meeting updated sucessfully')
        onSuccess()
      },
      onError: async (error) => {
        toast.error(error.message)
      },
    })
  )

  const isPending = createMeeting.isPending || updateMeeting.isPending
  const isEditing = !!initialValues?.id

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEditing) {
      updateMeeting.mutate({ ...values, id: initialValues?.id })
    } else {
      createMeeting.mutate(values)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="eg. Market Validation Call"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(data?.agents ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-2">
                          <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="size-5"
                          />
                          {agent.name}
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    onSearch={setSearchAgent}
                    value={field.value}
                    placeholder="Select an agent"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-muted-foreground text-sm">
                  Not found what you're looking for?{' '}
                  <button
                    className="text-blue-500"
                    type="button"
                    onClick={() => setOpen(true)}
                  >
                    Create new agent
                  </button>
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button
              onClick={onCancel}
              type="button"
              variant="ghost"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button disabled={isPending}>
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Form>
      <ResponsiveDialog
        title="New Agent"
        description="Create a new agent"
        open={open}
        onOpenChange={setOpen}
      >
        <AgentForm
          onCancel={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
        />
      </ResponsiveDialog>
    </>
  )
}
