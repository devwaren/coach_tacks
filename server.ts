// server.ts
import fs from 'node:fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import type { ViteDevServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDev = process.env.NODE_ENV !== 'production'
const base = process.env.BASE || '/'

const app = express()
let vite: ViteDevServer | undefined

if (isDev) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv(path.resolve(__dirname, 'dist/client'), { extensions: [] }))
}

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template: string
    let render: (url: string) => Promise<{ html: string; head: string }>

    if (isDev && vite) {
      template = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
    } else {
      template = await fs.readFile(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
      const mod = await import(path.resolve(__dirname, 'dist/server/entry-server.js'))
      render = mod.render as typeof render
    }

    const rendered = await render(url)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace?.(e as Error)
    console.error((e as Error).stack)
    res.status(500).end((e as Error).stack)
  }
})


// ✅ Export app for Vercel
export default app
