import React, { Component } from "react";

const article=`<h1 id="promise-">Promise 顺序执行</h1>
<h3 id="-">起源</h3>
<p>JavaScript 在处理异步任务时，经常用到的手段是回调函数。奈何，面对多个需要顺序执行的异步任务很容易造成回调地狱(Callback Hell):</p>
<pre><code className="lang-javascript">request(a, <span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span> {
    request(b, <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {
        request(c, <span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> {
            <span class="hljs-comment">//...</span>
        });
    });
});
</code></pre>
<p>Promise 是 Callback Hell 的一种解决方案，并且得到了非常广泛的应用,比如 axios 就是利用 Promise 编写的 http 客户端。</p>
<h3 id="promise-">Promise 顺序执行异步任务</h3>
<p>将异步任务改写成 Promise 的形式，然后在上一个 promise 的状态变为 resolved 调用下一个 promise。
Promise 处理异步任务的优雅的实现方式应该是这样：</p>
<pre><code class="lang-javascript"><span class="hljs-keyword">const</span> A = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(a, resolve));

<span class="hljs-keyword">const</span> B = <span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(b, resolve));

<span class="hljs-keyword">const</span> C = <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(c, resolve));

A(a)
    .then(B)
    .then(C)
    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(e);
    });
</code></pre>
<p>基于以上结果我们可以进一步将其封装成进行顺序处理的函数,此函数接受异步任务数组作为参数，顺序执行后返回结果。顺序处理的函数的实现方式：</p>
<pre><code class="lang-javascript"><span class="hljs-comment">/**
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
sequenceTasks(tasks)
    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"res"</span>, res);
    })
    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(e);
    });
<span class="hljs-comment">/**
 * 输出结果：
 * promise1 resolve
 * promise2 resolve
 * res ["promise1", "promise2"]
 */</span>
</code></pre>
<p>在 reduce 中第一个参数中被 return 的值,利用 reduce 方法使下一个 promise 指向 promise.then(task).then(pushValue)，从而实现 promise 链。</p>
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