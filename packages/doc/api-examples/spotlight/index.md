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

获取一个随机的 Windows Spotlight 图片

## 终端点

- **Endpoint:** `/spotlight`
- **方法:** `GET`

## 参数

| 名称   | 类型                | 默认值  | 必须 | 说明                                                                |
| ------ | ------------------- | ------- | ---- | ------------------------------------------------------------------- |
| type   | `'large' \| 'mini'` | `large` | 否   | 返回的图片尺寸，`'large'` 代表 1920x1080，`'mini'` 代表 1080x1920   |
| locale | `string`            | `en-US` | 否   | 符合 [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) 标准 |

## 示例

### 获取标准壁纸

```bash-vue
curl {{ baseUrl }}/spotlight -O image.jpg
```

### 获取竖屏壁纸

```bash-vue
curl {{ baseUrl }}/spotlight?type=mini -O image-mini.jpg
```

## 响应

### 标准尺寸

<img :src="`${baseUrl}/spotlight`"/>

### 小尺寸

<img :src="`${baseUrl}/spotlight?type=mini`"/>

## 错误

### Invalid type

```json
{  
    "code": 5001,
    "message": "Invalid type, must be one of large, mini",
    "data": null,
    "success": false
}
```

`type` 参数类型错误

### Invalid locale

```json
{
    "code": 5001,
    "message": "Invalid language tag",
    "data": null,
    "success": false
}
```

请查看 [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) 传入正确的语言标签
