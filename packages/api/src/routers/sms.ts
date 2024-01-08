import { Hono } from '$hono/mod.ts'
import { Bot } from '$tg/mod.ts'

const sms = (hono: Hono) => {
  hono.get('/sms', async (c) => {
    const { user, token, from, content, device, time } = c.req.query()

    if (!token) {
      return c.json<BaseResponse<null>>({
        code: 400,
        message: '缺少 token 参数',
        data: null,
        success: false,
      }, 400)
    }

    if (!user) {
      return c.json<BaseResponse<null>>({
        code: 400,
        message: '缺少 user 参数',
        data: null,
        success: false,
      }, 400)
    }

    const bot = new Bot(token)

    bot.start()

    await bot.api.sendMessage(
      user,
      `
来自： ${from}
内容： ${content}
设备： ${device}
时间： ${time}
      `.trim(),
      {
        parse_mode: 'Markdown',
      },
    )

    await bot.stop()

    return c.status(204)
  })
}

export { sms }
