# Promise

### 起源

JavaScript 在处理异步任务时，经常用到的手段是回调函数。奈何，面对多个需要顺序执行的异步任务很容易造成回调地狱(Callback Hell):

```javascript
request(a, b => {
    request(b, c => {
        request(c, d => {
            //...
        });
    });
});
```

Promise 是 Callback Hell 的一种解决方案，并且得到了非常广泛的应用,比如 axios 就是利用 Promise 编写的 http 客户端。

### 概念

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
Promise 的特点：

1. 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
2. 一旦状态改变，不可逆转。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。

### Promise 顺序执行异步任务

将异步任务改写成 Promise 的形式，然后在上一个 promise 的状态变为 resolved 调用下一个 promise。
Promise 处理异步任务的优雅的实现方式应该是这样：

```javascript
const A = a => new Promise((resolve, reject) => request(a, resolve));

const B = b => new Promise((resolve, reject) => request(b, resolve));

const C = c => new Promise((resolve, reject) => request(c, resolve));

A(a)
    .then(B)
    .then(C)
    .catch(e => {
        console.log(e);
    });
```

基于以上结果我们可以进一步将其封装成进行顺序处理的函数,此函数接受异步任务数组作为参数，顺序执行后返回结果。顺序处理的函数的实现方式：

```javascript
/**
 * @param {*promise任务队列} tasks
 */
const sequenceTasks = tasks => {
    const recordValue = (results, value) => {
        results.push(value);
        return results;
    };
    const pushValue = recordValue.bind(null, []);

    return tasks.reduce(function(promise, task) {
        return promise.then(task).then(pushValue);
    }, Promise.resolve());
};

const promise1 = () =>
    new Promise((resolve, rejecrt) => {
        setTimeout(() => {
            console.log("promise1 resolve");
            resolve("promise1");
        }, 1000);
    });

const promise2 = () =>
    new Promise((resolve, rejecrt) => {
        setTimeout(() => {
            console.log("promise2 resolve");
            resolve("promise2");
        }, 1);
    });

const tasks = [promise1, promise2];
sequenceTasks(tasks)
    .then(res => {
        console.log("res", res);
    })
    .catch(e => {
        console.log(e);
    });
/**
 * 输出结果：
 * promise1 resolve
 * promise2 resolve
 * res ["promise1", "promise2"]
 */
```

在 reduce 中第一个参数中被 return 的值,利用 reduce 方法使下一个 promise 指向 promise.then(task).then(pushValue)，从而实现 promise 链。

### Promise 的实现

Promise 和观察者模式十分接近，通过 new Promise 生成 观察者实例(observable)，resolve/reject 相当于 发布(publish )，then 相当于 订阅(subscribe )。

```javascript
//  Promise 的三种状态
const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function Promise(fn) {
    // 存储该 Promise 的状态信息
    let state = PENDING;

    // 存储 FULFILLED 或 REJECTED 时带来的数据
    let value = null;

    // 存储 then 或 done 时调用的成功或失败回调
    let handlers = [];

    function fulfill(result) {
        state = FULFILLED;
        handlers.forEach(handle);
        handlers = null;
    }

    function reject(error) {
        state = REJECTED;
        value = error;
        handlers.forEach(handle);
        handlers = null;
    }

    // resolve函数实现一种更高级的状态改变方式，作为对外开放的接口
    function resolve(result) {
        try {
            let then = getThen(result);
            if (then) {
                // 递归 resolve 待解析的 Promise
                doResolve(then.bind(result), resolve, reject);
                return;
            }
            fulfill(result);
        } catch (e) {
            reject(e);
        }
    }

    // 保证 done 中回调的执行
    function handle(handler) {
        if (state === PENDING) {
            handlers.push(handler);
        } else {
            if (
                state === FULFILLED &&
                typeof handler.onFulfilled === "function"
            ) {
                handler.onFulfilled(value);
            }
            if (
                state === REJECTED &&
                typeof handler.onRejected === "function"
            ) {
                handler.onRejected(value);
            }
        }
    }

    // done 保证onFulfilled 与 onRejected 二者只有一个被调用
    this.done = function(onFulfilled, onRejected) {
        // 保证 done 总是异步执行
        setTimeout(function() {
            handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected
            });
        }, 0);
    };

    // then 能够返回一个新的 Promise
    this.then = function(onFulfilled, onRejected) {
        const _this = this;
        return new Promise(function(resolve, reject) {
            return _this.done(
                function(result) {
                    if (typeof onFulfilled === "function") {
                        try {
                            return resolve(onFulfilled(result));
                        } catch (ex) {
                            return reject(ex);
                        }
                    } else return resolve(result);
                },
                function(error) {
                    if (typeof onRejected === "function") {
                        try {
                            return resolve(onRejected(error));
                        } catch (ex) {
                            return reject(ex);
                        }
                    } else return reject(error);
                }
            );
        });
    };

    // todo
    this.catch = function(erroe) {};

    doResolve(fn, resolve, reject);
}
/**
 * 检查一个值是否为 Promise
 * 若为 Promise 则返回该 Promise 的 then 方法
 *
 * @param {Promise|Any} value
 * @return {Function|Null}
 */
function getThen(value) {
    let t = typeof value;
    if (value && (t === "object" || t === "function")) {
        const then = value.then;
        // 可能需要更复杂的 thenable 判断
        if (typeof then === "function") return then;
    }
    return null;
}

/**
 * 传入一个需被 resolve 的函数，该函数可能存在不确定行为
 * 确保 onFulfilled 与 onRejected 只会被调用一次
 * 在此不保证该函数一定会被异步执行
 *
 * @param {Function} fn 不能信任的回调函数
 * @param {Function} onFulfilled
 * @param {Function} onRejected
 */
function doResolve(fn, onFulfilled, onRejected) {
    let done = false;
    try {
        fn(
            function(value) {
                if (done) return;
                done = true;
                // 执行由 resolve 传入的 resolve 回调
                onFulfilled(value);
            },
            function(reason) {
                if (done) return;
                done = true;
                onRejected(reason);
            }
        );
    } catch (ex) {
        if (done) return;
        done = true;
        onRejected(ex);
    }
}
```
