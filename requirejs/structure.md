# 项目结构

> require.js
>> version: 2.3.5

从 `package.json` 我们知道 `RequireJS` 没有使用其他依赖包，仅有两个帮助开发的包

* jscs
* jshint

这两个都是规范代码风格工具，其中 [`jscs`](https://www.npmjs.com/package/jscs) 两年未更新，整个项目已经和 [`eslint`](https://eslint.org/blog/2016/04/welcoming-jscs-to-eslint) 合并了……

`RequireJS` 初衷是为了给浏览器中使用 JS 带来异步模块化（AMD）的工具，并兼容到了 IE6，当然它也可以用于模块打包，甚至工作在 `Node.js` 环境下。

### require.js

```js
var requirejs, require, define;
(function (global, setTimeout) {

  /* Coding here */

}(this, (typeof setTimeout === 'undefined' ? undefined : setTimeout)));
```

整体使用一个立即执行的函数表达式（IIFE），传入了全局作用域下的 `this`（`window` / `global`），同时判断 `setTimeout` 是否可以使用。

将 `requirejs`、`require`、`define` 三个变量暴露在全局作用域中，其实也是为了方便引入 `require.js` 后，可以直接在之后加载的 JS 文件中使用这三个函数。

### 内部函数

```js
function commentReplace(match, singlePrefix) {
  return singlePrefix || '';
}
```
> **[warning] For warning**
>
> ??????????????

---

```js
function isFunction(it) {
  return Object.toString.call(it) === '[object Function]';
}

function isArray(it) {
  return Object.toString.call(it) === '[object Array]';
}

// 获取当前文档的 `<script>` 节点元素数组
function scripts() {
  return document.getElementsByTagName('script');
}

// 就是抛错啦
function defaultOnError(err) {
  throw err;
}
```

这很明显是用来判断输入的参数 `it` 是否为 `Function` 的实例、或 `Array` 的实例……但 `require.js` 中实际一开始声明了 `var op = Object.prototype, ostring = op.toString`，来替换上面的 `Object.toString`。

> **[warning] For warning**
>
> 这里仅表达个人看法，希望高人指点……
> 很多源码都喜欢使用自定义的变量来引用一些 JS 核心的方法，不知道是为了后面复用方便，或是更接近函数式编程，还是为了在以后标准改变时方便修改（如 `Object.toString` 改为 `Reflect.toString`）……

---

```js
// 从索引 0 遍历到 ary.length - 1
function each(ary, func) {
  if (ary) {
    var i;
    for (i = 0; i < ary.length; i += 1) {

      // 如果 `func` 返回 `true`，提前终止遍历循环
      if (ary[i] && func(ary[i], i, ary)) {
        break;
      }
    }
  }
}

// 从索引 ary.length 遍历到 0
function eachReverse(ary, func) {
  if (ary) {
    var i;
    for (i = ary.length - 1; i > -1; i -= 1) {

      // 如果 `func` 返回 `true`，提前终止遍历循环
      if (ary[i] && func(ary[i], i, ary)) {
        break;
      }
    }
  }
}
```

这两个函数非常好懂，就是用来遍历 `ary` 数组，并将每次遍历的 `ary` 中的值传入函数 `func`，直到遍历结束，或者 `func` 中 `return true`，能立刻终止遍历。

---

```js
// `hasProp` 用来检测 `obj` 对象（不包含原型链）上有没有 `prop` 这个属性或方法。
function hasProp(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// `getOwn` 先用 `hasProp` 检测，如果有就返回这个属性或方法。
function getOwn(obj, prop) {
  return hasProp(obj, prop) && obj[prop];
}
```

```js
function eachProp(obj, func) {
  var prop;

  // for ... in 用来遍历 **可枚举** 属性
  for (prop in obj) {
    if (hasProp(obj, prop)) {

      // func 执行，并传入拥有的相应属性或方法，和对应属性名
      if (func(obj[prop], prop)) {
        break;
      }
    }
  }
}
```

---

```js
function mixin(target, source, force, deepStringMixin) {
  if (source) {

    // 遍历 `source` 对象
    eachProp(source, function (value, prop) {

      // `force = true` 时，表示如果 `target` 有 `source` 中同名的属性或方法，
      // 直接覆盖重写成 `source` 中相应的属性或方法。
      if (force || !hasProp(target, prop)) {

        // `deepStringMixin = true`，且 `value` 为特定对象时，表示需要递归进行深拷贝。
        if (deepStringMixin && typeof value === 'object' && value &&
          !isArray(value) && !isFunction(value) &&
          !(value instanceof RegExp)) {

          if (!target[prop]) {
            target[prop] = {};
          }

          // 递归下去，可以复制子对象的属性和方法
          mixin(target[prop], value, force, deepStringMixin);
        } else {

          // 否则复制数值或引用方法、对象
          target[prop] = value;
        }
      }
    });
  }
  return target;
}
```

`mixin` 函数其实是将 `source` 对象上的属性和方法 **复制** 到 `target` 上的函数。

---

```js
// 因为 `bind` 是 ES5 新加入的方法，自己实现是为了兼容 IE8 及以下版本。
function bind(obj, fn) {

  // 执行 `bind` 返回一个 `this` 指向 `obj` 的函数 `fn`。
  return function () {
    return fn.apply(obj, arguments);
  };
}
```

---

```js
function getGlobal(value) {
  if (!value) {
      return value;
  }
  var g = global;
  each(value.split('.'), function (part) {
    g = g[part];
  });
  return g;
}
```
> **[warning] For warning**
> 
> ?????

---

```js
if (typeof define !== 'undefined') {
  return;
}

if (typeof requirejs !== 'undefined') {
  if (isFunction(requirejs)) {
      return;
  }
  cfg = requirejs;
  requirejs = undefined;
}

// ，Allow for a require config object
if (typeof require !== 'undefined' && !isFunction(require)) {
  //assume it is a config object.
  cfg = require;
  require = undefined;
}
```

如果 `requirejs`、`require`、`define` 已经声明，就不作操作。

---

```js
function newContext(contextName) {

  function trimDots(ary) {
    /**
     * 将经过 `.split('/')` 处理的路径所形成的字符串数组 `ary` 传入，
     * 并进行清理 `.` 和 `..` 的处理，如果有 `.` 就直接 `splice` 删掉，
     * 如果出现：
     *
     *   1. `ary[0]` 为 `..`
     *   2. `ary[1]` 和 `ary[2]` 为 `..`
     *   3. 当前遍历到的字符串和前一个都为 `..`
     * 
     * 这三种情况，就先不进行删除操作，否则将 `..` 和前一个非 `..` 元素一起删除。
     */
  }

  function normalize(name, baseName, applyMap) {
    /**
     * 
     *
     */
  }
}
```