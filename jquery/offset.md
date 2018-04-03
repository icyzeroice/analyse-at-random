# .offset()

在 `jQuery` 中有个 `.offset()` 方法，返回元素在整个页面中的位置。

这是通过：

* elem.getBoundingClientRect() 方法获取到这个元素相对于窗口左上角（窗口左上角为(0, 0)）的位置

* 再通过 `pageYOffset` 和 `pageXOffset` 获取窗口左上角在整个页面（整个页面左上角为(0, 0)）中的位置

对应相加计算而来的。