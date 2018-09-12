# 小程序实践总结

## 页面构成

小程序包含一个描述整体程序的 app 和多个描述各自页面的 page。

-   JSON 配置
-   WXML 模板
-   WXSS 样式
-   JS 逻辑交互

## 逻辑层

逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈，由 JavaScript 编写。

-   每个页面有独立的作用域，并提供模块化能力。
-   由于框架并非运行在浏览器中，所以 JavaScript 在 web 中一些能力都无法使用，如 document，window 等。
-   开发者写的所有代码最终将会打包成一份 JavaScript，并在小程序启动的时候运行，直到小程序销毁。

## 视图层

视图层负责 UI 显示，由 WXML 与 WXSS 构成。将逻辑层的数据反应成视图，同时将视图层的事件发送给逻辑层。

## 运行环境

在开发工具上， 小程序的 javascript 代码是运行在 nwjs 中，是由 Chrome Webview 来渲染的。

NW.js 基于 Chromium 内核与 Node.js。
NW.js 让您在编写应用时可以使用 Node.js 及其 modules 与 web 开发技术。而且，您可以非常容易的将一个 WEB 应用打包成一个原生应用

## 内部构架

小程序自身分为两个主要部分独立运行：view 模块和 service 模块。

view 模块负责 UI 显示，它由开发者编写的 wxml 和 wxss 转换后代码以及微信提供相关辅助模块组成。 一个 view 模块对应一个 webview 组件。

service 模块负责应用的后台逻辑，它由小程序的 js 代码以及微信提供的相关辅助模块组成。 一个应用只有一个 service 进程，它在程序生命周期内后台运行。

<div align="center"><img width="400" height="400" src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/app1.jpg"/></div>

一个典型的交互流程：

1.  用户点击界面触发事件
2.  对应 view 模块接收事件后将事件封装成所需格式后发送到 nwjs
3.  nwjs 运行环境将数据处理后发送给 service 模块
4.  service 模块依据传来数据找到对应 view 模块后执行对应的事件处理函数
5.  事件处理函数调用 this.setData({}) 改变 data，serivce 层计算该页面 data 后向 WX 后台发送
6.  WX 后台再将数据进行简单封装， 最后转发给到 view 层
7.  view 层接收到数据，将 data 与现有页面 data 合并， 然后 virtual dom 模块进行 diff 计算改变视图

## 异步任务的顺序执行（sequence）

模拟 async/await 实现异步任务的顺序执行

```javascript
const sleep = time => {
    return new Promise(resolve =>
        setTimeout(() => {
            console.log("resolve", time);
            resolve(time);
        }, time)
    );
};

const tasks = async function() {
    await sleep(1000);
    await sleep(2000);
};

tasks();
```

### Promise

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
    //array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    return tasks.reduce(function(promise, task) {
        return promise.then(task).then(pushValue);
    }, Promise.resolve());
};

const tasks = [sleep(1000), sleep(2000)];
sequenceTasks(tasks).then(res => {
    console.log("res", res);
});
```

### Generator

Generator 函数是一个状态机，封装了多个内部状态,执行 Generator 函数会返回一个遍历器对象。每次调用遍历器对象的 next 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个 yield 表达式（或 return 语句）为止。
next 方法返回一个对象，它的 value 属性就是当前 yield 表达式的值，done 属性表示遍历是否结束。

```javascript
function* gen() {
    yield sleep(1000);
    yield sleep(2000);
    return "end";
}

const g = gen();

g.next()
    .value.then(res => {
        console.log("1", res);
        return res;
    })
    .then(res1 => {
        g.next().value.then(res => {
            console.log("2", res);
        });
    });
```

以上代码

### co 模块

Generator 需要手动调用 next 方法，

co 模块可以让你不用编写 Generator 函数的执行器，它会自动执行 Generator 函数。

### 观察者模式(发布者-订阅者模式)

观察者模式又叫做发布订阅模式，它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生改变时就会通知所有观察着对象。它是由两类对象组成，主题和观察者，主题负责发布事件，同时观察者通过订阅这些事件来观察该主体，发布者和订阅者是完全解耦的，彼此不知道对方的存在，两者仅仅共享一个自定义事件的名称。
在 Nodejs 中通过 EventEmitter 实现了原生的对于这一模式的支持。在 JavaScript 中事件监听机制就可以理解为一种观察者模式。
