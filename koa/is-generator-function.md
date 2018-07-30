# is-generator-function

代码量同样很少

```js
'use strict';

// 是否支持 Symbol.toStringTag，这个可以用来定义自己的对象 toString 后显示的标签，如 Object.prototype.toString.call(1) 为 '[object Number]'
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var getGeneratorFunc = function () {

    // 不支持 Symbol.toStringTag 返回 false
	if (!hasToStringTag) {
		return false;
	}

    // 支持 `Symbol.toStingTag` 的话，试验下列 generator 的代码，成功就返回一个 generator 函数，失败无返回，为 `undefined`
	try {
		return Function('return function*() {}')();
	} catch (e) {}
};

var toStr = Object.prototype.toString;
var getProto = Object.getPrototypeOf;
var fnToStr = Function.prototype.toString;

// 匹配类似 ` function*`的文本，但不捕获 `function`
var isFnRegex = /^\s*(?:function)?\*/;

// false / [GeneratorFunction] / undefined
var generatorFunc = getGeneratorFunc();

// GeneratorFunction {} / {}
var GeneratorFunction = generatorFunc ? getProto(generatorFunc) : {};

module.exports = function isGeneratorFunction(fn) {

    // 优先使用 typeof 检验，过滤掉非 `Function` 和 `GeneratorFunction` 的 `fn`
	if (typeof fn !== 'function') {
		return false;
	}

	// 'function* name() { /* code here */ }'
    // OR
    // 'function name() { /* code here */ }'
    // 用 isFnRegex 来匹配 `function*`
    if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	

    // 如果没有 `Symbol.toString`，用 Object.prototype.toString 来判断是否是 generator，这可能是为了防止恶意代码？
    if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	

    return getProto(fn) === GeneratorFunction;
};

```




### 参考

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag