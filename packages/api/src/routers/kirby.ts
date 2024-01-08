import { Hono } from '$hono/mod.ts'

const kirby = (hono: Hono) => {
  hono.get('/kirby', (c) => {
    return c.json({
      message: 'Kirby!',
    })
  })
}

export { kirby }
