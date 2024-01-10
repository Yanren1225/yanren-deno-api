import { Hono } from '$hono/mod.ts'
import { cors, logger, poweredBy, prettyJSON } from '$hono/middleware.ts'

import { kirby } from '@/routers/kirby.ts'
import { bing } from '@/routers/bing.ts'
import { basic } from '@/routers/basic.ts'
import { sms } from '@/routers/sms.ts'
import { spotlight } from '@/routers/spotlight.ts'
import { fail } from '@/response/base-result.ts'
import { BaseResultCode } from '@/response/code.ts'

const hono = new Hono()

hono.use('*', poweredBy())

// Logger
hono.use('*', logger())

hono.use('*', cors())
hono.use('*', prettyJSON())

hono.all('/', (c) => {
  return c.redirect('https://doc.deno-api.imyan.ren')
})

// 404
hono.notFound((c) => {
  const path = c.req.path
  return c.json(fail(`Not Found ${path}`, BaseResultCode.NOT_FOUND))
})

hono.route('/', basic)

hono.route('/sms', sms)
hono.route('/bing', bing)
hono.route('/kirby', kirby)
hono.route('/spotlight', spotlight)

Deno.serve({ port: 8000 }, hono.fetch)
console.log('Listening on port 8000')
