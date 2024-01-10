import { Hono } from '$hono/mod.ts'

const basic = new Hono()

basic.get('/ip', (c) => {
  return c.json({
    ip: c.req.header('x-forwarded-for'),
  })
})

export { basic }
