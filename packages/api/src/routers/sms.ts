import { Hono } from '$hono/mod.ts'
import { Bot } from '$tg/mod.ts'
import dayjs from '$dayjs/'

const sms = new Hono()

const digitPattern = /\b\d{4,6}\b/g

const parseConetnt = (origin: string) => {
  return origin.replace(/\_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\~/g, '\\~')
    .replace(/\`/g, '\\`')
    .replace(/\>/g, '\\>')
    .replace(/\#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/\-/g, '\\-')
    .replace(/\=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/\!/g, '\\!')
    .replace(digitPattern, '`\$1`')
}

sms.get('/', async (c) => {
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

  try {
    await bot.api.sendMessage(
      user,
      `
来自： ||${from}||
内容： ${parseConetnt(content)}
设备： ${device}
时间： ${dayjs(time).format('YYYY/MM/DD HH:mm:ss')}
      `.trim(),
      {
        parse_mode: 'MarkdownV2',
      },
    ).then(() => {
      return bot.stop()
    })
  } catch (err) {
    return c.body(err, 400)
  }

  return c.body(null, 204)
})

export { sms }
