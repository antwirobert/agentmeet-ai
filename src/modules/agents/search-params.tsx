import { createLoader, parseAsString } from 'nuqs/server'

export const searchParams = {
  search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
}

export const loadSearchParams = createLoader(searchParams)
