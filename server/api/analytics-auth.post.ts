import { timingSafeEqual } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const expected = config.analyticsPassword as string

  if (!expected) {
    throw createError({ statusCode: 500, message: 'ANALYTICS_PASSWORD not set in .env' })
  }

  const body = await readBody<{ password?: string }>(event)
  const submitted = body?.password ?? ''

  const a = Buffer.from(submitted)
  const b = Buffer.from(expected)

  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw createError({ statusCode: 401, message: 'Invalid password' })
  }

  return { ok: true }
})
