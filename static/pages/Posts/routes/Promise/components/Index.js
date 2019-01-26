import React, { Component } from "react";

const article = `<h1 id="promise">Promise</h1>
<h3 id="-">起源</h3>
<p>JavaScript 在处理异步任务时，经常用到的手段是回调函数。奈何，面对多个需要顺序执行的异步任务很容易造成回调地狱(Callback Hell):</p>
<pre><code className="lang-javascript">request(a, <span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span> \{
    request(b, <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> \{
        request(c, <span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> \{
            <span class="hljs-comment">//...</span>
        \});
    \});
\});
</code></pre>
<p>Promise 是 Callback Hell 的一种解决方案，并且得到了非常广泛的应用,比如 axios 就是利用 Promise 编写的 http 客户端。</p>
<h3 id="-">概念</h3>
<p>所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
Promise 的特点：</p>
<ol>
<li>对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。</li>
<li>一旦状态改变，不可逆转。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。</li>
</ol>
<h3 id="promise-">Promise 顺序执行异步任务</h3>
<p>将异步任务改写成 Promise 的形式，然后在上一个 promise 的状态变为 resolved 调用下一个 promise。
Promise 处理异步任务的优雅的实现方式应该是这样：</p>
<pre><code class="lang-javascript"><span class="hljs-keyword">const</span> A = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(a, resolve));

<span class="hljs-keyword">const</span> B = <span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(b, resolve));

<span class="hljs-keyword">const</span> C = <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(c, resolve));

A(a)
    .then(B)
    .then(C)
    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> \{
        <span class="hljs-built_in">console</span>.log(e);
    \});
</code></pre>
<p>基于以上结果我们可以进一步将其封装成进行顺序处理的函数,此函数接受异步任务数组作为参数，顺序执行后返回结果。顺序处理的函数的实现方式：</p>
<pre><code class="lang-javascript"><span class="hljs-comment">/**
 * @param \{*promise任务队列\} tasks
 */</span>
<span class="hljs-keyword">const</span> sequenceTasks = <span class="hljs-function"><span class="hljs-params">tasks</span> =&gt;</span> \{
    <span class="hljs-keyword">const</span> recordValue = <span class="hljs-function">(<span class="hljs-params">results, value</span>) =&gt;</span> \{
        results.push(value);
        <span class="hljs-keyword">return</span> results;
    \};
    <span class="hljs-keyword">const</span> pushValue = recordValue.bind(<span class="hljs-literal">null</span>, []);

    <span class="hljs-keyword">return</span> tasks.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promise, task</span>) </span>\{
        <span class="hljs-keyword">return</span> promise.then(task).then(pushValue);
    \}, <span class="hljs-built_in">Promise</span>.resolve());
\};

<span class="hljs-keyword">const</span> promise1 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> \{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> \{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise1 resolve"</span>);
            resolve(<span class="hljs-string">"promise1"</span>);
        \}, <span class="hljs-number">1000</span>);
    \});

<span class="hljs-keyword">const</span> promise2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> \{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> \{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise2 resolve"</span>);
            resolve(<span class="hljs-string">"promise2"</span>);
        \}, <span class="hljs-number">1</span>);
    \});

<span class="hljs-keyword">const</span> tasks = [promise1, promise2];
sequenceTasks(tasks)
    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> \{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"res"</span>, res);
    \})
    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> \{
        <span class="hljs-built_in">console</span>.log(e);
    \});
<span class="hljs-comment">/**
 * 输出结果：
 * promise1 resolve
 * promise2 resolve
 * res ["promise1", "promise2"]
 */</span>
</code></pre>
<p>在 reduce 中第一个参数中被 return 的值,利用 reduce 方法使下一个 promise 指向 promise.then(task).then(pushValue)，从而实现 promise 链。</p>
<h3 id="promise-">Promise 的实现</h3>
<p>Promise 和观察者模式十分接近，通过 new Promise 生成 观察者实例(observable)，resolve/reject 相当于 发布(publish )，then 相当于 订阅(subscribe )。</p>
<pre><code class="lang-javascript"><span class="hljs-comment">//  Promise 的三种状态</span>
<span class="hljs-keyword">const</span> PENDING = <span class="hljs-number">0</span>;
<span class="hljs-keyword">const</span> FULFILLED = <span class="hljs-number">1</span>;
<span class="hljs-keyword">const</span> REJECTED = <span class="hljs-number">2</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>) </span>\{
    <span class="hljs-comment">// 存储该 Promise 的状态信息</span>
    <span class="hljs-keyword">let</span> state = PENDING;

    <span class="hljs-comment">// 存储 FULFILLED 或 REJECTED 时带来的数据</span>
    <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span>;

    <span class="hljs-comment">// 存储 then 或 done 时调用的成功或失败回调</span>
    <span class="hljs-keyword">let</span> handlers = [];

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fulfill</span>(<span class="hljs-params">result</span>) </span>\{
        state = FULFILLED;
        handlers.forEach(handle);
        handlers = <span class="hljs-literal">null</span>;
    \}

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">error</span>) </span>\{
        state = REJECTED;
        value = error;
        handlers.forEach(handle);
        handlers = <span class="hljs-literal">null</span>;
    \}

    <span class="hljs-comment">// resolve函数实现一种更高级的状态改变方式，作为对外开放的接口</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">result</span>) </span>\{
        <span class="hljs-keyword">try</span> \{
            <span class="hljs-keyword">let</span> then = getThen(result);
            <span class="hljs-keyword">if</span> (then) \{
                <span class="hljs-comment">// 递归 resolve 待解析的 Promise</span>
                doResolve(then.bind(result), resolve, reject);
                <span class="hljs-keyword">return</span>;
            \}
            fulfill(result);
        \} <span class="hljs-keyword">catch</span> (e) \{
            reject(e);
        \}
    \}

    <span class="hljs-comment">// 保证 done 中回调的执行</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params">handler</span>) </span>\{
        <span class="hljs-keyword">if</span> (state === PENDING) \{
            handlers.push(handler);
        \} <span class="hljs-keyword">else</span> \{
            <span class="hljs-keyword">if</span> (
                state === FULFILLED &amp;&amp;
                <span class="hljs-keyword">typeof</span> handler.onFulfilled === <span class="hljs-string">"function"</span>
            ) \{
                handler.onFulfilled(value);
            \}
            <span class="hljs-keyword">if</span> (
                state === REJECTED &amp;&amp;
                <span class="hljs-keyword">typeof</span> handler.onRejected === <span class="hljs-string">"function"</span>
            ) \{
                handler.onRejected(value);
            \}
        \}
    \}

    <span class="hljs-comment">// done 保证onFulfilled 与 onRejected 二者只有一个被调用</span>
    <span class="hljs-keyword">this</span>.done = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onFulfilled, onRejected</span>) </span>\{
        <span class="hljs-comment">// 保证 done 总是异步执行</span>
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>\{
            handle(\{
                <span class="hljs-attr">onFulfilled</span>: onFulfilled,
                <span class="hljs-attr">onRejected</span>: onRejected
            \});
        \}, <span class="hljs-number">0</span>);
    \};

    <span class="hljs-comment">// then 能够返回一个新的 Promise</span>
    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onFulfilled, onRejected</span>) </span>\{
        <span class="hljs-keyword">const</span> _this = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>\{
            <span class="hljs-keyword">return</span> _this.done(
                <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>\{
                    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> onFulfilled === <span class="hljs-string">"function"</span>) \{
                        <span class="hljs-keyword">try</span> \{
                            <span class="hljs-keyword">return</span> resolve(onFulfilled(result));
                        \} <span class="hljs-keyword">catch</span> (ex) \{
                            <span class="hljs-keyword">return</span> reject(ex);
                        \}
                    \} <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> resolve(result);
                \},
                <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>\{
                    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> onRejected === <span class="hljs-string">"function"</span>) \{
                        <span class="hljs-keyword">try</span> \{
                            <span class="hljs-keyword">return</span> resolve(onRejected(error));
                        \} <span class="hljs-keyword">catch</span> (ex) \{
                            <span class="hljs-keyword">return</span> reject(ex);
                        \}
                    \} <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> reject(error);
                \}
            );
        \});
    \};

    <span class="hljs-comment">// todo</span>
    <span class="hljs-keyword">this</span>.catch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">erroe</span>) </span>\{\};

    doResolve(fn, resolve, reject);
\}
<span class="hljs-comment">/**
 * 检查一个值是否为 Promise
 * 若为 Promise 则返回该 Promise 的 then 方法
 *
 * @param \{Promise|Any\} value
 * @return \{Function|Null\}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getThen</span>(<span class="hljs-params">value</span>) </span>\{
    <span class="hljs-keyword">let</span> t = <span class="hljs-keyword">typeof</span> value;
    <span class="hljs-keyword">if</span> (value &amp;&amp; (t === <span class="hljs-string">"object"</span> || t === <span class="hljs-string">"function"</span>)) \{
        <span class="hljs-keyword">const</span> then = value.then;
        <span class="hljs-comment">// 可能需要更复杂的 thenable 判断</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> then === <span class="hljs-string">"function"</span>) <span class="hljs-keyword">return</span> then;
    \}
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
\}

<span class="hljs-comment">/**
 * 传入一个需被 resolve 的函数，该函数可能存在不确定行为
 * 确保 onFulfilled 与 onRejected 只会被调用一次
 * 在此不保证该函数一定会被异步执行
 *
 * @param \{Function\} fn 不能信任的回调函数
 * @param \{Function\} onFulfilled
 * @param \{Function\} onRejected
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doResolve</span>(<span class="hljs-params">fn, onFulfilled, onRejected</span>) </span>\{
    <span class="hljs-keyword">let</span> done = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">try</span> \{
        fn(
            <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>\{
                <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>;
                done = <span class="hljs-literal">true</span>;
                <span class="hljs-comment">// 执行由 resolve 传入的 resolve 回调</span>
                onFulfilled(value);
            \},
            <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>) </span>\{
                <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>;
                done = <span class="hljs-literal">true</span>;
                onRejected(reason);
            \}
        );
    \} <span class="hljs-keyword">catch</span> (ex) \{
        <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>;
        done = <span class="hljs-literal">true</span>;
        onRejected(ex);
    \}
\}
</code></pre>
`;

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

export default Index;
