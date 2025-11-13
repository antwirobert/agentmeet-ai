import { AppRouter } from '@/trpc/routers/_app'
import { inferRouterOutputs } from '@trpc/server'

export type AgentsGetAll =
  inferRouterOutputs<AppRouter>['agents']['getAll']['agents']

export type AgentGetOne = inferRouterOutputs<AppRouter>['agents']['getOne']
