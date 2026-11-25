import { copyFile, mkdir } from 'node:fs/promises'

const routes = [
  'projects/snow',
  'projects/iqoo',
  'projects/naraka',
  'projects/live-china',
  'expertise/graphic',
  'expertise/stage',
  'expertise/motion',
]

await Promise.all(routes.map(async route => {
  await mkdir(`dist/${route}`, { recursive: true })
  await copyFile('dist/index.html', `dist/${route}/index.html`)
}))
