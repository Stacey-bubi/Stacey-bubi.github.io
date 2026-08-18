const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/'

/** Internal page link. Keeps the trailing slash, matching trailingSlash: 'always'. */
export function href(path = ''): string {
  const p = path.replace(/^\//, '')
  if (p === '') return BASE
  return BASE + (p.endsWith('/') ? p : p + '/')
}

/** Static asset in public/. No trailing slash — it is a file, not a route. */
export function asset(path: string): string {
  return BASE + path.replace(/^\//, '')
}
