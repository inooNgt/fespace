竞赛小程序
=============

## 页面构成

小程序包含一个描述整体程序的 app 和多个描述各自页面的 page。

* JSON配置
* WXML 模板
* WXSS 样式
* JS 逻辑交互

## 逻辑层
逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈，由 JavaScript 编写。

* 每个页面有独立的作用域，并提供模块化能力。
* 由于框架并非运行在浏览器中，所以 JavaScript 在 web 中一些能力都无法使用，如 document，window 等。
* 开发者写的所有代码最终将会打包成一份 JavaScript，并在小程序启动的时候运行，直到小程序销毁。

## 视图层

视图层负责UI显示，由 WXML 与 WXSS 构成。
将逻辑层的数据反应成视图，同时将视图层的事件发送给逻辑层。

## 运行环境

在开发工具上， 小程序的 javascript 代码是运行在 nwjs 中，是由 Chrome Webview 来渲染的。

NW.js 基于Chromium内核与Node.js。
NW.js让您在编写应用时可以使用Node.js及其modules与web开发技术。而且，您可以非常容易的将一个WEB应用打包成一个原生应用。

Html5 的界面是由浏览器内核渲染出来的，小程序代码经过微信 App内的引擎处理，最终会把界面翻译成系统原生的控件，体验比HTML5好。

## 内部构架

小程序自身分为两个主要部分独立运行：view 模块和 service 模块。

view 模块负责 UI 显示，它由开发者编写的 wxml 和 wxss 转换后代码以及微信提供相关辅助模块组成。 一个 view 模块对应一个 webview 组件。

service 模块负责应用的后台逻辑，它由小程序的 js 代码以及微信提供的相关辅助模块组成。 一个应用只有一个 service 进程，它在程序生命周期内后台运行。


<div align=center><img width="400" height="400" src="https://pic3.zhimg.com/80/v2-d746f9d7068ac43aa43cec85bcf57ae1_hd.jpg"/></div>

一个典型的交互流程：
1. 用户点击界面触发事件
2. 对应 view 模块接收事件后将事件封装成所需格式后发送到nwjs
3.  nwjs运行环境将数据处理后发送给 service 模块
4.  service 模块依据传来数据找到对应 view模块后执行对应的事件处理函数
5.  事件处理函数调用 this.setData({}) 改变 data，serivce 层计算该页面 data 后向WX后台发送
6.  WX后台再将数据进行简单封装， 最后转发给到 view 层
7.  view 层接收到数据，将 data 与现有页面 data 合并， 然后virtual dom 模块进行 diff计算改变视图

## 异步操作

## 

## 待优化
