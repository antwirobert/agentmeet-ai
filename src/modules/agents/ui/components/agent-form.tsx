'use client'

import GeneratedAvatar from '@/components/generated-avatar'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { agentsInsertSchema } from '../../schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import { toast } from 'sonner'
import { AgentGetOne } from '../../types'

interface AgentFormProps {
  onCancel: () => void
  onSuccess: () => void
  initialValues?: AgentGetOne
}

export const AgentForm = ({
  onCancel,
  onSuccess,
  initialValues,
}: AgentFormProps) => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      instructions: initialValues?.instructions ?? '',
    },
  })

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getAll.queryOptions({}))
        toast.success('Agent created sucessfully')
        onSuccess()
      },
      onError: async (error) => {
        toast.error(error.message)
      },
    })
  )

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getAll.queryOptions({}))

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          )
        }
        toast.success('Agent updated sucessfully')
        onSuccess()
      },
      onError: async (error) => {
        toast.error(error.message)
      },
    })
  )

  const isPending = createAgent.isPending || updateAgent.isPending
  const isUpdating = initialValues?.id

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isUpdating) {
      updateAgent.mutate({ ...values, id: initialValues.id })
    } else {
      createAgent.mutate(values)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <GeneratedAvatar
          seed={form.watch('name')}
          variant="botttsNeutral"
          className="size-18"
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Sales coach" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea placeholder="Sales coach" {...field} />
              </FormControl>
              <FormMessage />
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
            {isUpdating ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
