---
outline: deep
---

<script setup>
import { baseUrl } from '../baseurl'
</script>

<style>
th {
  white-space: nowrap;
}
</style>

# 短信转发接口

## 概述

::: info
本接口本身是配合 [SmsForwarder - 短信转发器](https://github.com/pppscn/SmsForwarder) 使用的，具体怎么配合请查看 [这里](#更多)
:::

转发短信到 telegram 上

## 终端点

- **Endpoint:** `/sms`
- **方法:** `GET`

## 参数

| 名称    | 类型     | 默认值 | 必须 | 说明                                   |
| ------- | -------- | ------ | ---- | -------------------------------------- |
| token   | `string` | `null` | 是   | telegram bot token [如何获取？](#更多) |
| user    | `string` | `null` | 是   | telegram 用户 id [如何获取？](#更多)   |
| from    | `string` | `null` | 否   | 短信来源                               |
| content | `string` | `null` | 否   | 短信内容                               |
| device  | `string` | `null` | 否   | 设备名称                               |
| time    | `string` | `null` | 否   | 发送时间                               |

## 示例

```curl-vue
curl {{ baseUrl }}/sms?token=xxx&user=xxx&from=10086&content=你话费没了&device=MI6&time=1145年1月4日
```

## 响应

204 No Content

## 错误

### token is required

```json
{
  "code": 5001,
  "message": "token is required",
  "data": null,
  "success": false
}
```

在参数中中添加 `token`

### user is required

```json
{
  "code": 5001,
  "message": "user is required",
  "data": null,
  "success": false
}
```

在参数中中添加 `user`

## 更多

### 如何获取 telegram bot token

请查看 [如何通过 Python 创建一个 Telegram 机器人](https://www.freecodecamp.org/chinese/news/how-to-create-a-telegram-bot-using-python/) 拿到一个新的 token 并且保存好

### 如何获取 telegram 用户 id

打开 [@useridgetbot](https://t.me/useridgetbot) 发送 `/get_me` 即可获得

### 如何配合 SmsForwarder - 短信转发器

> 本文已经假定你可以使用该 APP 的基础功能并且明白怎么使用，否则请先去查看对应文档

- 新建一个发送通道，类型选择 Webhook，名字随便起一个，请求类型选择 `GET`
- Webhook Server 填写 `{{ baseUrl }}/sms?token=[获取到的 token]&user=[获取到的 user]`，记得替换一下里面的内容
- 消息模板使用 `from=[from]&content=[org_content]&device=[device_mark]&time=[receive_time]`
- 点击测试按钮，如果一切正常的话你的 telegram 就会收到来自你之前创建的 bot 的消息，如果失败了请检查上面的配置
