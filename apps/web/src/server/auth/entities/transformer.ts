import { ValueTransformer } from 'typeorm'

export const transformer = {
  date: {
    from: (date: string | null) => date && new Date(parseInt(date, 10)),
    to: (date?: Date) => date?.valueOf().toString()
  },
  bigint: {
    from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
    to: (bigInt?: number) => bigInt?.toString()
  },
  json: {
    from: (json: string | null) => json && JSON.parse(json),
    to: (json?: {}) => JSON.stringify(json)
  }
} satisfies Record<'date' | 'bigint' | 'json', ValueTransformer>
