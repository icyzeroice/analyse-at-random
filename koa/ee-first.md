# ee-first

> Version: 1.1.1

### 用途

这个包暴露 `first()` 方法，主要用于


### 结构及说明

```js
function first(

    // [[ee, ], [ee, ...], ...]
    stuff: Array,

    // 将作为 `ee` 的回调函数
    done: Function

) {

    // 用 `Array.isArray()` 方法先判断 stuff 是否是数组
    // 然后遍历其元素，看看是否都满足 [ee, events, ...] 的格式，
    // 再给

    // 存放事件队列
    cleanups: Array

    callback()

    // 遍历 `cleanups`, 使用 `removeListener` 移除
    // cleanups[n].ee 上绑定的事件
    cleanup()


    thunk(

        // 
        fn

    )

    return thunk

}

listener(

    // 注册事件
    event,
    
    // 
    done

) {
    
    return onevent(arg1)

}
```