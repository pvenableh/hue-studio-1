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

  // Preserve the raw query string to avoid mangling bracket notation
  // (e.g. filter[status][_eq]=published)
  const rawUrl = getRequestURL(event)
  const queryString = rawUrl.search ?? ''

  const url = `${baseUrl}/${path}${queryString}`

  const data = await $fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return data
})
