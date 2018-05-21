# ee-first

> Version: 1.1.1
> https://github.com/jonathanong/ee-first 

### 用途

这个包暴露 `first()` 方法，主要用于一种 **竞争事件** 的场景，你可以用它给多个 [`EventEmitter`](https://nodejs.org/dist/latest-v8.x/docs/api/events.html) 实例注册很多事件，并提供一个回调函数，然后在首先“发布”其中一个事件时，`first` 会清除其内部的事件队列，执行这唯一一次回调函数，后面的执行无效。


### 结构及说明

```ts
function first(

  // [[ee, ], [ee, ...], ...]
  stuff: Array,

  // 将作为 `ee` 的回调函数
  done: Function

) {

  /** 用 `Array.isArray()` 方法先判断 stuff 是否是数组
   * 然后遍历其元素，看看元素是否为满足 [ee, events...]
   * 格式的数组，所以说 `stuff` 是个二维数组
   * 其中，ee 应该继承自 `EventEmitter` 类
   */

  /** 存放事件队列
   *
   * @typedef cleanOne
   * @property {EventEmitter} ee
   * @property {string} event
   * @property {Function} fn 
   */
  cleanups: Array<cleanOne>

  callback() {

    // 清除事件队列 `cleanups`
    cleanup()

    // 然后执行这唯一一次回调函数
  }

  // 遍历 `cleanups`, 使用 `removeListener` 移除
  // cleanups[n].ee 上绑定的事件
  cleanup()


  // thunk 是一种函数式编程技巧，详见 https://github.com/tj/node-thunkify/blob/master/index.js
  thunk(

    fn

  )

  return thunk

}

listener(

  // 注册事件
  event,

  // callback
  done

) {

  return onevent(arg1) {
    done(

      // error message
      err,

      // EventEmitter
      ee,

      // event name (string)
      event,

      // a duplicate from ...arg1
      args
    )
  }

}
```
