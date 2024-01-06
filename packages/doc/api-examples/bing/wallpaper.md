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

# /bing/wallpaper

## 概述

获取当日 bing 壁纸

## 终端点

- **Endpoint:** `/bing/wallpaper`
- **方法:** `GET`

## 参数

| 名称 | 类型                | 默认值  | 必须 | 说明                                                             |
| ---- | ------------------- | ------- | ---- | ---------------------------------------------------------------- |
| type | `'large' \| 'mini'` | `large` | 否   | 返回的图片尺寸，`'large'` 代表 1920x1080，`'mini'` 代表 768x1366 |

<!-- - **名称**: type
  - **类型**: `'large' | 'mini'`
  - **默认值**: `large`
  - **必须**: 否
  - **说明**: 返回的图片尺寸，`'large'` 代表 1920x1080，`'mini'` 代表 768x1366 -->

## 示例

### 获取标准大小壁纸

```bash-vue
curl {{ baseUrl }}/bing/wallpaper -O image.jpg
```

### 获取小尺寸竖屏壁纸

```bash-vue
curl {{ baseUrl }}/bing/wallpaper?type=mini -O image-mini.jpg
```

## 响应

### 标准尺寸

<img :src="`${baseUrl}/bing/wallpaper`"/>

### 小尺寸

<img :src="`${baseUrl}/bing/wallpaper?type=mini`"/>

## 错误

### Invalid type

`type` 参数类型错误

```json
{  
    "code": 400,
    "message": "Invalid type, must be one of large, mini",
    "data": null,
    "success": false
}
```
