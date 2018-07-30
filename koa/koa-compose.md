# koa-compose

```js
'use strict'

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array<Function>} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {

  // 判断是不是数组
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  
  // 判断是数组内是否全是函数
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  // middleware 会存在内存中，等待以下函数执行完，并释放引用后，由 GC 回收
  return function (context, next) {
    
    // last called middleware #
    let index = -1
    
    return dispatch(0)
    
    function dispatch (i) {
    
      if (i <= index)
        return Promise.reject(new Error('next() called multiple times'))
    
      index = i
      
      let fn = middleware[i]
      
      // 如果已经遍历完 `middleware`，那么下一次执行 next 
      if (i === middleware.length)
        fn = next
      
      if (!fn)
        return Promise.resolve()
      
      try {
        
        // 执行 fn 并传入同一个 context 和下一个要执行的 middleware 的序号（用 bind 可以生成一个新的函数，这里类似反柯里化，保留到下一轮 fn 执行）
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

```

我们可以看到使用 compose 函数，首先会存在一个共享的内存，里面存有所谓的中间件（middleware）的数组（表），然后其 return 的函数可传入上下文 context 和下一个中间件 next，并在此函数调用后，dispatch 函数从中间件数组的第 0 序位开始遍历，一个个地执行，最后再调用 next