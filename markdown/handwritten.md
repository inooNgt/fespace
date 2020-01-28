# 手写 Javascript 代码

### Table of contents

-   [防抖-debounce](#防抖-debounce)
-   [节流-throttle](#节流-throttle)
-   [迭代器](#迭代器)
-   [for...of](#for...of)
-   [深拷贝](#深拷贝)

### 防抖-debounce

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

### 节流-throttle

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

### 迭代器

JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了 Map 和 Set。
遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费。

Iterator 的遍历过程是这样的。

-   创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
-   第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。
-   第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。
-   不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对象。

模拟实现：

```js
function makeIterator(array) {
    var nextIndex = 0;
    return {
        next: function() {
            return nextIndex < array.length
                ? { value: array[nextIndex++], done: false }
                : { value: undefined, done: true };
        }
    };
}

var it = makeIterator(["a", "b"]);

it.next(); // { value: "a", done: false }
it.next(); // { value: "b", done: false }
it.next(); // { value: undefined, done: true }
```

### for...of

一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 iterator 接口，就可以用 for...of 循环遍历它的成员。也就是说，for...of 循环内部调用的是数据结构的 Symbol.iterator 方法。

for...of 循环可以使用的范围包括:

-   Array
-   Set
-   Map
-   类数组的对象（比如 arguments 对象、DOM NodeList 对象）
-   Generator 对象
-   String

```js
function forOf(obj, cb) {
    let iterable, result;

    if (typeof obj[Symbol.iterator] !== "function")
        throw new TypeError(result + " is not iterable");
    if (typeof cb !== "function") throw new TypeError("cb must be callable");

    iterable = obj[Symbol.iterator]();

    result = iterable.next();
    while (!result.done) {
        cb(result.value);
        result = iterable.next();
    }
}

forOf([1, 2, 3], item => {
    console.log(item);
});
```

### 深拷贝

#### 简单版

-   判断是否是对象，若否则直接返回原始值
-   判断对象是否是数组,初始化返回值数据结构
-   遍历对象,递归拷贝直到属性为原始类型

```js
function deepClone(obj) {
    // 非对象，返回原值
    if (typeof obj !== "object" || typeof obj === null) {
        return obj;
    }
    let result = Array.isArray(obj) ? [] : {};
    Object.keys(obj).forEach(key => (result[key] = deepClone(obj[key])));
    return result;
}
obj1 = { a: 1, b: { b1: 2 }, c: [1, 3, { c3: 3 }] };
obj2 = deepClone(obj1);
```

#### 避免循环引用

为避免出现循环引用，拷贝对象时先判断存储空间中是否存在当前对象，如果有就直接返回

```js
function deepClone(obj, cache = new WeakMap()) {
    if (typeof obj !== "object" || typeof obj === null) {
        return obj;
    }
    if (cache.get(obj)) {
        return obj;
    }
    let result = Array.isArray(obj) ? [] : {};
    cache.set(obj, result);
    Object.keys(obj).forEach(key => (result[key] = deepClone(obj[key], cache)));
    return result;
}

obj1 = { a: 1, b: { b1: 2 }, c: [1, 3, { c3: 3 }] };
obj0 = { d: 11, e: obj1 };
obj1.d = obj0;
obj2 = deepClone(obj1);
```

缺点：无法处理 Date、Set、Map 等数据结构

#### 考虑 Date、Set、Map 等数据结构

```js
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function isObject(target) {
    const type = typeof target;
    return target !== null && (type === "object" || type === "function");
}

function getType(target) {
    return Object.prototype.toString.call(target);
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(",");
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}

function clone(target, map = new WeakMap()) {
    // 克隆原始类型
    if (!isObject(target)) {
        return target;
    }

    // 初始化
    const type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type);
    } else {
        return cloneOtherType(target, type);
    }

    // 防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
}
```

测试

```js
obj1 = {
    a: new Date(),
    b: new RegExp(/abc/i),
    c: new Set([1, 2, 3]),
    d: (m = new Map().set(1, 2)),
    e: Symbol({}),
    f: function() {
        console.log();
    }
};

obj2 = deepClone(obj1);
```
