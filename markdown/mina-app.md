微信小程序分享
=============

## 模块构成

小程序包含一个描述整体程序的 app 和多个描述各自页面的 page。

#### JSON配置
#### WXML 模板
#### WXSS 样式
WXSS 具有 CSS 大部分特性
#### JS 逻辑交互

## 运行环境

* 在iOS 上，小程序的 javascript 代码是运行在 JavaScriptCore 中，是由 WKWebView 来渲染的，环境有 iOS8、iOS9、iOS10
* 在Android 上，小程序的 javascript 代码是通过 X5 JSCore来解析，是由 X5 基于 Mobile Chrome 53/57 内核来渲染的
* 在开发工具上， 小程序的 javascript 代码是运行在 nwjs 中，是由 Chrome Webview 来渲染的

NW.js 基于Chromium内核与Node.js。
NW.js让您在编写应用时可以使用Node.js及其modules与web开发技术。而且，您可以非常容易的将一个WEB应用打包成一个原生应用。

Html5 的界面是由浏览器内核渲染出来的，小程序代码经过微信 App内的引擎处理，最终会把界面翻译成系统原生的控件，体验比HTML5好。

## 视图层
小程序开发框架的逻辑层由 JavaScript 编写。
逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈。

* 每个页面有独立的作用域，并提供模块化能力。
* 由于框架并非运行在浏览器中，所以 JavaScript 在 web 中一些能力都无法使用，如 document，window 等。
* 开发者写的所有代码最终将会打包成一份 JavaScript，并在小程序启动的时候运行，直到小程序销毁。

## 逻辑层

架的视图层由 WXML 与 WXSS 编写，由组件来进行展示。
将逻辑层的数据反应成视图，同时将视图层的事件发送给逻辑层。

