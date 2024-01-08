import { Hono } from '$hono/hono.ts'
import { isValidLanguageTag } from '@/utils/language.ts'

const url =
  'https://arc.msn.com/v3/Delivery/Placement?pid=209567&fmt=json&rafb=0&ua=WindowsShellClient%2F0&cdm=1&disphorzres=9999&dispvertres=9999&lo=80217'

interface FirstResponse {
  batchrsp: {
    var: string
    items: { item: string }[]
    refreshtime: string
  }
}

const typeList = [
  'large',
  'mini',
]

export const spotlight = (_hono: Hono) => {
  const hono = _hono.basePath('/spotlight')

  hono.get('/', async (c) => {
    const locale = c.req.query('locale') || 'en-US'
    const type = c.req.query('type') || 'large'

    if (!typeList.includes(type)) {
      return c.json<BaseResponse<null>>({
        code: 400,
        message: `Invalid type, must be one of ${typeList.join(', ')}`,
        data: null,
        success: false,
      }, 400)
    }

    if (!isValidLanguageTag(locale)) {
      return c.json<BaseResponse<null>>({
        code: 400,
        message: `Invalid language tag`,
        data: null,
        success: false,
      }, 400)
    }

    const reqUrl = `${url}&pl=${locale}&lc=${locale}&ctry=${locale}&time=${
      new Date().toISOString()
    }`

    console.log(reqUrl)

    const res: FirstResponse = await fetch(reqUrl).then(async (res) => {
      return await res.json()
    })

    const imageUrl = JSON.parse(res.batchrsp.items[0].item)
      .ad[
        type === 'large'
          ? 'image_fullscreen_001_landscape'
          : 'image_fullscreen_001_portrait'
      ].u
    const image = await fetch(imageUrl)

    c.header('Content-Type', image.headers.get('Content-Type') ?? 'image/JPEG')
    return c.body(image.body)
  })
}
