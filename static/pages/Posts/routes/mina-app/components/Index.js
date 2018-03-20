import React, { Component } from "react";

const article=`<h1 id="-">竞赛小程序</h1>
<h2 id="-">页面构成</h2>
<p>小程序包含一个描述整体程序的 app 和多个描述各自页面的 page。</p>
<ul>
<li>JSON 配置</li>
<li>WXML 模板</li>
<li>WXSS 样式</li>
<li>JS 逻辑交互</li>
</ul>
<h2 id="-">逻辑层</h2>
<p>逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈，由 JavaScript 编写。</p>
<ul>
<li>每个页面有独立的作用域，并提供模块化能力。</li>
<li>由于框架并非运行在浏览器中，所以 JavaScript 在 web 中一些能力都无法使用，如 document，window 等。</li>
<li>开发者写的所有代码最终将会打包成一份 JavaScript，并在小程序启动的时候运行，直到小程序销毁。</li>
</ul>
<h2 id="-">视图层</h2>
<p>视图层负责 UI 显示，由 WXML 与 WXSS 构成。将逻辑层的数据反应成视图，同时将视图层的事件发送给逻辑层。</p>
<h2 id="-">运行环境</h2>
<p>在开发工具上， 小程序的 javascript 代码是运行在 nwjs 中，是由 Chrome Webview 来渲染的。</p>
<p>NW.js 基于 Chromium 内核与 Node.js。
NW.js 让您在编写应用时可以使用 Node.js 及其 modules 与 web 开发技术。而且，您可以非常容易的将一个 WEB 应用打包成一个原生应用。</p>
<p>Html5 的界面是由浏览器内核渲染出来的，小程序代码经过微信 App 内的引擎处理，最终会把界面翻译成系统原生的控件，体验比 HTML5 好。</p>
<h2 id="-">内部构架</h2>
<p>小程序自身分为两个主要部分独立运行：view 模块和 service 模块。</p>
<p>view 模块负责 UI 显示，它由开发者编写的 wxml 和 wxss 转换后代码以及微信提供相关辅助模块组成。 一个 view 模块对应一个 webview 组件。</p>
<p>service 模块负责应用的后台逻辑，它由小程序的 js 代码以及微信提供的相关辅助模块组成。 一个应用只有一个 service 进程，它在程序生命周期内后台运行。</p>
<div align="center"><img width="400" height="400" src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/app1.jpg"/></div>

<p>一个典型的交互流程：</p>
<ol>
<li>用户点击界面触发事件</li>
<li>对应 view 模块接收事件后将事件封装成所需格式后发送到 nwjs</li>
<li>nwjs 运行环境将数据处理后发送给 service 模块</li>
<li>service 模块依据传来数据找到对应 view 模块后执行对应的事件处理函数</li>
<li>事件处理函数调用 this.setData({}) 改变 data，serivce 层计算该页面 data 后向 WX 后台发送</li>
<li>WX 后台再将数据进行简单封装， 最后转发给到 view 层</li>
<li>view 层接收到数据，将 data 与现有页面 data 合并， 然后 virtual dom 模块进行 diff 计算改变视图</li>
</ol>
<h2 id="promise-sequence-">Promise 的顺序执行（sequence）</h2>
<pre><code className="lang-javascript"><span class="hljs-comment">/**
 * @param {*promise任务队列} tasks
 */</span>
<span class="hljs-keyword">const</span> sequenceTasks = <span class="hljs-function"><span class="hljs-params">tasks</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> recordValue = <span class="hljs-function">(<span class="hljs-params">results, value</span>) =&gt;</span> {
        results.push(value);
        <span class="hljs-keyword">return</span> results;
    };
    <span class="hljs-keyword">const</span> pushValue = recordValue.bind(<span class="hljs-literal">null</span>, []);

    <span class="hljs-keyword">return</span> tasks.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promise, task</span>) </span>{
        <span class="hljs-keyword">return</span> promise.then(task).then(pushValue);
    }, <span class="hljs-built_in">Promise</span>.resolve());

    <span class="hljs-comment">//task 返回值是promise，每次循环会新建一个promise对象</span>
    <span class="hljs-comment">// let promise = Promise.resolve();</span>
    <span class="hljs-comment">// for (let i = 0; i &lt; tasks.length; i++) {</span>
    <span class="hljs-comment">//     let task = tasks[i];</span>
    <span class="hljs-comment">//     promise = promise.then(task).then(pushValue);</span>
    <span class="hljs-comment">// }</span>
    <span class="hljs-comment">// return promise;</span>
};

<span class="hljs-keyword">const</span> promise1 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise1 resolve"</span>);
            resolve(<span class="hljs-string">"promise1"</span>);
        }, <span class="hljs-number">1000</span>);
    });

<span class="hljs-keyword">const</span> promise2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise2 resolve"</span>);
            resolve(<span class="hljs-string">"promise2"</span>);
        }, <span class="hljs-number">1</span>);
    });

<span class="hljs-keyword">const</span> tasks = [promise1, promise2];
sequenceTasks(tasks).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"res"</span>, res);
});

<span class="hljs-comment">//promise1 resolve</span>
<span class="hljs-comment">//promise2 resolve</span>
<span class="hljs-comment">//res ["promise1", "promise2"]</span>
</code></pre>
<p>##</p>
<h2 id="-">待优化</h2>
`


class Index extends Component {
    constructor(props) {
        super(props);
    }
    rawMarkup() {
        return { __html: article };
    }
    render() {
        return <div dangerouslySetInnerHTML={this.rawMarkup()} />;
    }
}

export default Index 