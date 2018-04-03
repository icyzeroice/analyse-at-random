# jQuery 全屏滚动插件——scrollify

> version:  1.0.19
>> [https://github.com/lukehaas/Scrollify](https://github.com/lukehaas/Scrollify)

这个插件挂载在 jQuery 上，主要用 `currentIndex` 表示当前 slide 的索引，如果要滚动就将 `index` 所表示的目标索引改变，然后 `animateScroll()` 会用动画将 slide 从索引 `currentIndex` 滚动到索引 `index`。

而这里所使用的动画，会先判断 `velocity` 动画库是否存在，存在就使用。如果没有引入 `velocity` 就使用 `jQuery` 自带的 `animate()` 方法。

这里还会使用一个 `heights` 数组来保存 slide 每个索引下的元素相对于整个页面的 `top` 值。每次改变都会用 `calculatePositions()` 重新计算一遍各索引 `heights` 下的值。同时改变 `history API`，和 `location.hash`。