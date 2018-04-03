# RequireJS

> require.js
>> version: 2.3.5

从 `package.json` 我们知道 `RequireJS` 没有使用其他依赖包，仅有两个帮助开发的包

* jscs
* jshint

这两个都是规范代码风格工具，其中 [`jscs`](https://www.npmjs.com/package/jscs) 两年未更新，整个项目已经和 [`eslint`](https://eslint.org/blog/2016/04/welcoming-jscs-to-eslint) 合并了……

`RequireJS` 初衷是为了给浏览器中使用 JS 带来异步模块化（AMD）的工具，并兼容到了 IE6，当然它也可以用于模块打包，甚至工作在 `Node.js` 环境下。

### 

[简易 AMD 模块加载的实现](https://github.com/icyzeroice/icy-amd)