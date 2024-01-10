import { Hono } from '$hono/hono.ts'
import { fail } from '@/response/base-result.ts'
import { BaseResultCode } from '@/response/code.ts'

const typeList = [
  'large',
  'mini',
]

const bing = new Hono()

bing.get('/wallpaper', async (c) => {
  const type = c.req.query('type') || 'large'

  if (!typeList.includes(type)) {
    return c.json(
      fail(
        null,
        BaseResultCode.INVALID_PARAMS,
        `Invalid type, must be one of ${typeList.join(', ')}`,
      ),
      400,
    )
  }

  const res = await fetch(
    'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US',
  )
  const data = await res.json()
  const url = data.images[0].url.replace(
    '1920x1080',
    type === 'large' ? '1920x1080' : '768x1366',
  )
  const imageUrl = `https://www.bing.com${url}`
  const image = await fetch(imageUrl)

  c.header('Content-Type', image.headers.get('Content-Type') ?? 'image/JPEG')
  return c.body(image.body)
})

export { bing }
