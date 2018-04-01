# 项目结构

### require.js

```js
var requirejs, require, define;
(function (global, setTimeout) {

  /* Coding here */

}(this, (typeof setTimeout === 'undefined' ? undefined : setTimeout)));
```

整体使用一个立即执行的函数表达式（IIFE），传入了全局作用域下的 `this`（`window` / `global`），同时判断 `setTimeout` 是否可以使用。

将 `requirejs`、`require`、`define` 三个变量暴露在全局作用域中，其实也是为了方便引入 `require.js` 后，可以直接在之后加载的 JS 文件中使用这三个函数。


### requirejs


### require


### define



<!--

### requirejs()

```js
requirejs = function (deps, callback, errback, optional) { /* Main */ }
```

主要入口函数，首先会判断 `deps`，如果不是数组、也不是字符串，就会当做配置对象赋给 `config`，如果...

> **[warning] For warning**
>
> 我突然觉得事无巨细地写下来没啥用……以后主要梳理结构吧……

-->
