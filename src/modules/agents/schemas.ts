import z from 'zod'

export const agentsInsertSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  instructions: z.string().min(2, {
    message: 'Instructions are required',
  }),
})

export const agentsUpdateSchema = agentsInsertSchema.extend({
  id: z.string().min(2, { message: 'Id is required' }),
})
