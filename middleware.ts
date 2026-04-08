// middleware.ts  ← project root, alongside nuxt.config.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_COUNTRIES = new Set(['US', 'CA', 'GB', 'IE', 'FR', 'DE'])

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _nuxt/      Nuxt static assets
     * - api/        Your Nuxt server routes (sitemap, OG image, etc.)
     * - Static files you want publicly crawlable
     */
    '/((?!_nuxt/|api/|favicon|apple-touch-icon|manifest\\.webmanifest|robots\\.txt|llms\\.txt|feed\\.xml|sitemap).*)',
  ],
}

export default function middleware(request: NextRequest) {
  const country = request.geo?.country ?? 'US'

  if (ALLOWED_COUNTRIES.has(country)) {
    return NextResponse.next()
  }

  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Access Restricted</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #0e0e0e;
            color: #f0ede8;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
          }
          .wrap { text-align: center; max-width: 420px; }
          h1 { font-size: 1.25rem; font-weight: 500; margin-bottom: 0.75rem; letter-spacing: .02em; }
          p  { font-size: 0.9rem; color: #888; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1>Content Not Available</h1>
          <p>This content is not available in your region.</p>
        </div>
      </body>
    </html>`,
    {
      status: 451,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }
  )
}