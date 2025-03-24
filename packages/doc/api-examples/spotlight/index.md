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

获取一个 Windows Spotlight 图片

## 终端点

- **Endpoint:** `/spotlight`
- **方法:** `GET`

## 参数

| 名称       | 类型                                                 | 默认值  | 必须 | 说明                                                  |
| ---------- | ---------------------------------------------------- | ------- | ---- | ----------------------------------------------------- |
| resolution | `'100' \| '240' \| '720'\| '1080'\| '1440'\| '2160'` | `1080`  | 否   | 图片分辨率                                            |
| random     | `boolean`                                            | `false` | 否   | 随机返回一张图片                                      |
| format     | `'image' \| 'url'`                                   | `image` | 否   | 有时候你只想要一个图片地址的话可以传入一个 `url` 进来 |
