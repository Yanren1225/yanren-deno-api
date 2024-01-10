import { Hono } from '$hono/mod.ts'

const kirby = new Hono()

kirby.get('/', (c) => {
  return c.json({
    message: 'Kirby!',
  })
})

export { kirby }
