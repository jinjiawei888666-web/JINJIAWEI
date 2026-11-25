const base = import.meta.env.BASE_URL

export function siteUrl(path) {
  return base + path.replace(/^\//, '')
}

export function sitePathname(pathname) {
  const relative = pathname.startsWith(base) ? pathname.slice(base.length) : pathname
  return '/' + relative.replace(/^\/|\/$/g, '')
}
