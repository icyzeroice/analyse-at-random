# 项目结构

> [warning] For warning
>
> 未完成

### require.js

```js
var requirejs, require, define;
(function (global, setTimeout) {

  /* Coding here */

}(this, (typeof setTimeout === 'undefined' ? undefined : setTimeout)));
```

整体使用一个立即执行的函数表达式（IIFE），传入了全局作用域下的 `this`（`window`（browser） / `global`（node） / `self`（web worker）），同时判断 `setTimeout` 是否可以使用。

将 `requirejs`、`require`、`define` 三个变量暴露在全局作用域中，其实也是为了方便引入 `require.js` 后，可以直接在之后加载的 JS 文件中使用这三个函数。

在这个 IIFE 的一开始就声明了一些变量，其中 `globalDefQueue` 和 `context.defQueue` 是用来缓存已加载的模块的。


因为 `require.js` 是 AMD 型模块加载器，即异步模块加载，所以在浏览器环境下（`isBrowser = true`）会通过创建 `<script>` 标签引入 JS 文件当做模块，同时设置 `<script>` 标签的 `async` 属性为 `true`，即异步加载 JS 文件。

然后给创建的 `<script>` 标签附上事件，来判断脚本是否加载完成，或是出错。（这里有很多兼容写法）

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
