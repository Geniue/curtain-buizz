/**
 * Single entry point for reading CMS data from the Laravel API.
 *
 * Follows the base-URL convention already used by src/lib/blog.ts so server
 * rendering can reach the backend directly instead of going back out through
 * the public hostname.
 */

const API_BASE_URLS = [
  process.env.NEXT_PUBLIC_API_URL,
  process.env.BACKEND_API_URL,
  'http://localhost:8001/api',
  'http://localhost:8000/api',
]
  .filter((url): url is string => Boolean(url))
  .map((url) => url.replace(/\/+$/, ''))

/** The backend answered, and the record does not exist. */
export class ApiNotFoundError extends Error {
  constructor(path: string) {
    super(`Not found: ${path}`)
    this.name = 'ApiNotFoundError'
  }
}

/** No configured backend could be reached, or every one errored. */
export class ApiUnavailableError extends Error {
  constructor(path: string, cause?: unknown) {
    super(`Laravel API unavailable for ${path}`)
    this.name = 'ApiUnavailableError'
    this.cause = cause
  }
}

/**
 * CMS reads are always uncached: an admin save must show up without a redeploy.
 */
export async function apiGet<T>(path: string): Promise<T> {
  let lastError: unknown = null

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      })

      // An authoritative answer from a reachable backend - do not retry others.
      if (response.status === 404) throw new ApiNotFoundError(path)

      if (!response.ok) {
        lastError = new Error(`HTTP ${response.status}`)
        continue
      }

      return (await response.json()) as T
    } catch (error) {
      if (error instanceof ApiNotFoundError) throw error
      lastError = error
    }
  }

  throw new ApiUnavailableError(path, lastError)
}
