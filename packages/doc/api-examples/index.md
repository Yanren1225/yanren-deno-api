<script setup>
import { baseUrl } from './baseurl'
</script>

# API 说明

baseUrl 是 `{{ baseUrl }}`，部署在 [Deno Deploy](https://deno.com/deploy)

基本的返回值类型是

```json
{
    "code": 200,
    "message": "Success",
    "data": {}, // 也可能是 [] 或者直接是 string 之类的
    "success": true
}
```

如果有出错的话里面部分信息会改变，但是基本结构不会变
