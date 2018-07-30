# Koa is Json

```js
module.exports = isJSON;

/**
 * Check if `body` should be interpreted as json.
 */

function isJSON(body) {

  // 过滤 undefined、null、0、'' 等
  if (!body) return false;

  // 过滤 String
  if ('string' == typeof body) return false;

  // 过滤 Readable Stream
  if ('function' == typeof body.pipe) return false;

  // 过滤 Buffer
  if (Buffer.isBuffer(body)) return false;

  return true;
}
```

因为这里所需要的功能是检查 body 是否需要被解析成 JSON，为之后决定是否多加工一道 JSON.parse(body) 做准备，因为 JSON.parse(数值) 还是数值，所以这里没做过滤。
