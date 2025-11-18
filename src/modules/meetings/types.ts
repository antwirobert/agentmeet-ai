import { AppRouter } from '@/trpc/routers/_app'
import { inferRouterOutputs } from '@trpc/server'

export type MeetingGetOne = inferRouterOutputs<AppRouter>['meetings']['getOne']
export type MeetingsGetAll =
  inferRouterOutputs<AppRouter>['meetings']['getAll']['meetings']

export enum MeetingStatus {
  Upcoming = 'upcoming',
  Active = 'active',
  Cancelled = 'cancelled',
  Processing = 'processing',
  Completed = 'completed',
}
