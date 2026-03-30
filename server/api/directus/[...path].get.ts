/**
 * Server-side Directus read proxy
 *
 * Forwards GET requests to Directus with the static token so the browser
 * never contacts Directus directly (avoids CORS / auth issues on
 * client-side navigation).
 *
 * Usage: /api/directus/items/case_studies?fields=id,title&limit=50
 *   → proxies to DIRECTUS_URL/items/case_studies?fields=id,title&limit=50
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = (config.public.directusUrl as string).replace(/\/$/, '')
  const token = config.directusStaticToken

  if (!token) {
    throw createError({ statusCode: 500, message: 'Directus token not configured' })
  }

  const path = getRouterParam(event, 'path') ?? ''

  // Use the raw URL from the incoming request to preserve exact query string
  // encoding (brackets, commas, etc.) without any parsing/re-encoding
  const incomingUrl = getRequestURL(event)
  const rawQuery = incomingUrl.href.split('?')[1] ?? ''

  const url = rawQuery
    ? `${baseUrl}/${path}?${rawQuery}`
    : `${baseUrl}/${path}`

  const data = await $fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return data
})
