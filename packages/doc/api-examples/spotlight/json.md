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

# /spotlight

## 概述

获取一个随机的 Windows Spotlight 图片，返回一个包含壁纸链接的 JSON 对象

## 终端点

- **Endpoint:** `/spotlight/json`
- **方法:** `GET`

## 参数

| 名称   | 类型     | 默认值  | 必须 | 说明                                                                |
| ------ | -------- | ------- | ---- | ------------------------------------------------------------------- |
| locale | `string` | `en-US` | 否   | 符合 [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) 标准 |

## 示例

```bash-vue
curl {{ baseUrl }}/spotlight/json
```

## 响应

```json
{
    "code": 200,
    "message": "Success",
    "data": {
        "large": "", // 这个是横屏 1920x1080
        "mini": "" // 这个是竖屏 1080x1920
    },
    "success": true
}
```

## 错误

### Invalid type

```json
{  
    "code": 400,
    "message": "Invalid type, must be one of large, mini",
    "data": null,
    "success": false
}
```

`type` 参数类型错误

### Invalid locale

```json
{
    "code": 400,
    "message": "Invalid language tag",
    "data": null,
    "success": false
}
```

请查看 [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) 传入正确的语言标签
