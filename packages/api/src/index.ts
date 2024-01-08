import { Hono } from '$hono/mod.ts'
import { logger } from '$hono/middleware.ts'

import { kirby } from '@/routers/kirby.ts'
import { bing } from '@/routers/bing.ts'
import { basic } from '@/routers/basic.ts'
import { sms } from '@/routers/sms.ts'
import { spotlight } from '@/routers/spotlight.ts'

const hono = new Hono()

// Logger
hono.use('*', logger())

// hono.use('/', (c) => {
//   return c.redirect('https://doc.deno-api.imyan.ren')
// })

// 404
hono.notFound((c) => {
  const path = c.req.path
  return c.text(`Not Found ${path}`, 404)
})

kirby(hono)
bing(hono)
basic(hono)
sms(hono)
spotlight(hono)

Deno.serve({ port: 8000 }, hono.fetch)
console.log('Listening on port 8000')
