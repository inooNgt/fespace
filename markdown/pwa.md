# PWA Demo

### Native 的缺点

-   需要打包发布
-   体积大

### Web 的缺点

-   无法离线渲染
-   无一级入口
-   无法推送通知
-   体验

### PWA

PWA 试图结合 Native 和 Web 的优势，并且避开其缺点，提供类似 App 体验。 让 Web App 从标签页跳出来，同时保持 Web 的灵魂。它是多种技术的集合，主要包含：

-   Service worker
-   Cache API
-   Push API
-   Fetch API API
-   Web App Manifest
-   Notification
-   Web Push Protocol

这些功能给 PWA 带来的特性：

-   渐进式 - 适用于所有浏览器，因为它是以渐进式增强作为宗旨开发的
-   连接无关性 - 能够借助 Service Worker 在离线或者网络较差的情况下正常访问
-   类似应用 - 由于是在 App Shell 模型基础上开发，因为应具有 Native App 的交互和导航，给用户 Native App 的体验
-   持续更新 - 始终是最新的，无版本和更新问题
-   安全 - 通过 HTTPS 协议提供服务，防止窥探和确保内容不被篡改
-   可索引 - 应用清单文件和 Service Worker 可以让搜索引擎索引到，从而将其识别为『应用』
-   粘性 - 通过推送离线通知等，可以让用户回流
-   可安装 - 用户可以添加常用的 webapp 到桌面，免去去应用商店下载的麻烦
-   可链接 - 通过链接即可分享内容，无需下载安装

### [Service Worker](https://www.w3.org/TR/service-workers/)

Service Worker 是独立于主线程的 worker 线程， 在 Web Worker 的基础上加上了持久离线缓存能力。其核心是事件驱动的 Web Worker，可以响应来自文档或其它来源的事件。

-   一个独立的 worker 线程，独立于当前网页进程，有自己独立的 worker context。

-   一旦被 install，就永远存在，除非被手动 unregister

-   用到的时候可以直接唤醒，不用的时候自动睡眠

-   可编程拦截代理请求和返回，缓存文件，缓存的文件可以被网页进程取到（包括网络离线状态）

-   离线内容开发者可控

-   能向客户端推送消息

-   不能直接操作 DOM

-   必须在 HTTPS 环境下才能工作

-   异步实现，内部大都是通过 Promise 实现

#### 如何工作

-   首先需要注册 Service Worker

-   注册成功后，后台开始安装步骤， 通常在安装的过程中需要缓存一些静态资源。

-   激活 Service Worker

-   激活成功后 Service Worker 可以控制页面

#### 生命周期

Service Worker 的工作原理是基于注册、安装、激活等步骤在浏览器 js 主线程中独立分担缓存任务,
其生命周期允许我们在各个阶段进行有目的性的回调。

Service Worker 的生命周期有：

-   安装( installing )：这个状态发生在 Service Worker 注册之后，表示开始安装，触发 install 事件回调指定一些静态资源进行离线缓存。
-   安装后( installed )：Service Worker 已经完成了安装，并且等待其他的 Service Worker 线程被关闭。

-   激活( activating )：在这个状态下没有被其他的 Service Worker 控制的客户端，允许当前的 worker 完成安装，并且清除了其他的 worker 以及关联缓存的旧缓存资源，等待新的 Service Worker 线程被激活。

-   激活后( activated )：在这个状态会处理 activate 事件回调 (提供了更新缓存策略的机会)。并可以处理功能性的事件 fetch (请求)、sync (后台同步)、push (推送)。

-   废弃状态 ( redundant )：这个状态表示一个 Service Worker 的生命周期结束。
