# 手写 Javascript 代码

### 目录

[防抖(debounce)](<防抖(debounce)>)

### 防抖(debounce)

功能：

-   this 绑定
-   参数传递
-   immediate 立即执行
    -   返回值
-   取消执行

```js
/**
 * 防抖
 * @param {Function} func 需要进行防抖的函数
 * @param {Number} wait 等待wait 毫秒后执行
 * @param {Boolean} immediate 是否立即执行，若为true则立刻执行函数，等到停止触发 n 秒后，才可以重新触发执行。
 */
function debounce(func, wait, immediate) {
    var timeout, result;

    var debounced = function() {
        var context = this;
        var args = arguments;
        // 如果存在定时器则清空，之后会重新设置定时器
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            // 重新设置定时器，wait ms后清空timeout
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(context, args);
        } else {
            // 重新设置定时器
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
        // 若immediate为true时存在返回值
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}
```

underscore 的实现

```js
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
_.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
        timeout = null;
        if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(this, args);
        } else {
            timeout = _.delay(later, wait, this, args);
        }

        return result;
    });

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
_.delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
        return func.apply(null, args);
    }, wait);
});
```
