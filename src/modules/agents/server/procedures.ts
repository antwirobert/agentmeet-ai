import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '@/trpc/init'
import { agentsInsertSchema } from '../schemas'
import { db } from '@/db'
import { agents } from '@/db/schema'
import { and, count, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm'
import z from 'zod'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from '@/constants'
import { TRPCError } from '@trpc/server'

export const agentsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [newAgent] = await db
        .insert(agents)
        .values({ ...input, userId: ctx.auth.user.id })
        .returning()
      return newAgent
    }),
  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2, {
          message: 'Name is required',
        }),
        instructions: z.string().min(2, {
          message: 'Instructions are required',
        }),
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [updatedAgent] = await db
        .update(agents)
        .set(input)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )
        .returning()

      if (!updatedAgent)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Agent not found' })

      return updatedAgent
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const [removedAgent] = await db
        .delete(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )
        .returning()

      if (!removedAgent)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Agent not found' })

      return removedAgent
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [existingAgent] = await db
        .select({ ...getTableColumns(agents), meetingCount: sql<number>`5` })
        .from(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )

      if (!existingAgent)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Agent not found' })

      return existingAgent
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, pageSize, search } = input
      const allAgents = await db
        .select({ ...getTableColumns(agents), meetingCount: sql<number>`5` })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize)

      const [totalItems] = await db
        .select({ count: count() })
        .from(agents)
        .where(search ? ilike(agents.name, `%${search}%`) : undefined)

      const totalPages = Math.ceil(totalItems.count / pageSize)

      return {
        agents: allAgents,
        totalItems,
        totalPages,
      }
    }),
})
