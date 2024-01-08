import { Hono } from '$hono/mod.ts'

const basic = (Hono: Hono) => {
  Hono.get('/ip', (c) => {
    return c.json({
      ip: c.req.header('x-forwarded-for'),
    })
  })
}

export { basic }
