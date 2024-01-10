import { Hono } from '$hono/hono.ts'
import { isValidLanguageTag } from '@/utils/language.ts'
import { fail, success } from '@/response/base-result.ts'
import { BaseResultCode } from '@/response/code.ts'

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

const spotlight = new Hono()

const getImageUrl = async (
  locale: string,
) => {
  const reqUrl = `${url}&pl=${locale}&lc=${locale}&ctry=${locale}&time=${
    new Date().toISOString()
  }`

  const res: FirstResponse = await fetch(reqUrl).then(async (res) => {
    return await res.json()
  })

  return {
    large: JSON.parse(res.batchrsp.items[0].item)
      .ad['image_fullscreen_001_landscape'].u,
    mini: JSON.parse(res.batchrsp.items[0].item)
      .ad['image_fullscreen_001_portrait'].u,
  }
}

spotlight.get('/', async (c) => {
  const locale = c.req.query('locale') || 'en-US'
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

  if (!isValidLanguageTag(locale)) {
    return c.json(
      fail(null, BaseResultCode.INVALID_PARAMS, `Invalid language tag`),
    )
  }

  const { large, mini } = await getImageUrl(locale)

  const image = await fetch(type === 'mini' ? mini : large)

  c.header('Content-Type', image.headers.get('Content-Type') ?? 'image/JPEG')
  return c.body(image.body)
})

spotlight.get('/json', async (c) => {
  const locale = c.req.query('locale') || 'en-US'
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

  if (!isValidLanguageTag(locale)) {
    return c.json(
      fail(null, BaseResultCode.INVALID_PARAMS, `Invalid language tag`),
      400,
    )
  }

  const url = await getImageUrl(locale)

  return c.json(success<{ large: string; mini: string }>(url))
})

export { spotlight }
