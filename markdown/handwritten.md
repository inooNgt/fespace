# 手写 Javascript 代码

### 目录

[防抖(debounce)](<防抖(debounce)>)
[节流(throttle)](<节流(throttle)>)

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

### 节流(throttle)

实现一：

```js
function throttle(fn, wait) {
    var previous = 0;
    var context, arts;
    var timeout = null;

    var throttled = function() {
        var now = +new Date();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // remaining > wait 表示系统时间被修改
        if (remaining <= 0 || remaining > wait) {
            previous = now;
            fn.apply(context, args);
        }
    };

    return throttled;
}
```

实现二：

```js
function throttle(func, wait) {
    var timeout;
    var previous = 0;

    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    };
}
```

实现一中，事件会立刻执行，触发后没有办法再执行事件；
实现二中，事件会在 n 秒后第一次执行，停止触发后依然会再执行一次事件；

实现一和实现二各有优缺点，综合两者得到实现三：

```js
function throttle(func, wait) {
    var timeout, result;
    var previous = 0;

    var later = function(context, ...args) {
        previous = +new Date();
        timeout = null;
        func.apply(context, args);
    };

    var throttled = function() {
        var now = +new Date();
        var remaining = wait - (now - previous);
        var context = this;
        var args = arguments;
        // wait 毫秒内首次触发或者系统时间被修改
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later.bind(null, context, ...args), remaining);
        }
    };
    return throttled;
}
```

实现三首次触发时会立即执行，停止触发时会再执行一次；
若要控制首次触发和停止触发后的行为，需增加 options 参数控制：

-   leading：false 表示禁用第一次执行
-   trailing: false 表示禁用停止触发的回调

最终实现：

```js
/**
 * options.leading：false 表示禁用第一次执行
 * options.trailing: false 表示禁用停止触发的回调
 */
function throttle(func, wait, options) {
    var timeout, result;
    var previous = 0;
    if (!options) options = {};

    var later = function(context, ...args) {
        // 若options.leading表示禁用，previous置为空
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        // previous为空且options.leading表示禁用，则首次不执行
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        var context = this;
        var args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            // options.trailing 非fals才执行
            timeout = setTimeout(later.bind(null, context, ...args), remaining);
        }
    };
    return throttled;
}
```
