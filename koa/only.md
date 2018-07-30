# only

这个包源码极短：

```js
module.exports = function(obj, keys){

  obj = obj || {};

  if ('string' == typeof keys) keys = keys.split(/ +/);

  return keys.reduce(function(ret, key){
      
    if (null == obj[key]) return ret;

    ret[key] = obj[key];

    return ret;

  }, {});

};
```

从一个对象 `obj` 中取出部分属性和值，需要取出的属性通过按空格分割（`split`）参数 `keys` 传入的字符串得到，然后用 `reduce` 组成新的对象返回。