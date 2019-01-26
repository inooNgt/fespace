import React, { Component } from "react";

const article = `<h1 id="-react-reconciliation-">实现一个简单的 React-调和过程（Reconciliation）</h1>
<p>上一篇文章中的 render 方法直接使用虚拟 DOM 来生成真实 DOM 结构，每次组件更新时都会带来大量对真实 DOM 的操作，这就会带来性能问题。React 所采用的方法是通过比较新的虚拟 DOM 和旧的虚拟 DOM 找出其中的差异，更新到真实 DOM 上，从而提高程序执行效率。这一过程就是 React 的调和过程 （Reconciliation），也称为“Diff”算法。</p>
<h3 id="-dom-">如何记录虚拟 DOM？</h3>
<p>要完成同样的功能，我们首先要记录旧的虚拟 DOM。如何记录虚拟 DOM？我们要引入一个实例的概念，实例代表了已经渲染在 DOM 中的元素的信息，每一个真实 DOM 节点都有一个对应的实例。根据虚拟 DOM 生成实例，每次调用 render 方法后记录实例，就记录了虚拟 DOM。事实上，实例是一个 JS 对象，拥有 element, dom,和 childInstances 三个属性。childInstances 是由子节点的实例组合而成的数组。</p>
<h3 id="-render-">重构 render 函数</h3>
<p>现在我们来重构 render 函数，通过 instantiate 函数创建实例，添加变量 rootInstance 记录已渲染的实例。我们期望调和函数 reconcile 在新旧实例找出其中的差异，再更新到真实 DOM 上，但是这里先不比较，直接使用新实例更新并返回新实例以便在 render 函数中记录。</p>
<pre><code className="lang-javascript"><span class="hljs-keyword">let</span> rootInstance = <span class="hljs-literal">null</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">vnode, container</span>) </span>\{
    <span class="hljs-keyword">const</span> nextInstance = reconcile(container, rootInstance, vnode);
    rootInstance = nextInstance;
\}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reconcile</span>(<span class="hljs-params">parentDom, instance, vnode</span>) </span>\{
    <span class="hljs-keyword">if</span> (instance == <span class="hljs-literal">null</span>) \{
        <span class="hljs-keyword">const</span> newInstance = instantiate(vnode);
        parentDom.appendChild(newInstance.dom);
        <span class="hljs-keyword">return</span> newInstance;
    \} <span class="hljs-keyword">else</span> \{
        <span class="hljs-keyword">const</span> newInstance = instantiate(vnode);
        parentDom.replaceChild(newInstance.dom, instance.dom);
        <span class="hljs-keyword">return</span> newInstance;
    \}
\}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">instantiate</span>(<span class="hljs-params">vnode</span>) </span>\{
    <span class="hljs-comment">// 当vnode为字符串时，渲染结果是一段文本</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> vnode === <span class="hljs-string">"string"</span>) \{
        <span class="hljs-keyword">const</span> textNode = <span class="hljs-built_in">document</span>.createTextNode(vnode);
        <span class="hljs-keyword">return</span> \{ <span class="hljs-attr">dom</span>: textNode, vnode \};
    \}

    <span class="hljs-keyword">const</span> \{ type, props \} = vnode;
    <span class="hljs-comment">// 创建DOM节点</span>
    <span class="hljs-keyword">const</span> dom = <span class="hljs-built_in">document</span>.createElement(type);

    <span class="hljs-comment">// 添加事件句柄</span>
    <span class="hljs-keyword">const</span> isListener = <span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> name.startsWith(<span class="hljs-string">"on"</span>);
    <span class="hljs-built_in">Object</span>.keys(props)
        .filter(isListener)
        .forEach(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> \{
            <span class="hljs-keyword">const</span> eventType = name.toLowerCase().substring(<span class="hljs-number">2</span>);
            dom.addEventListener(eventType, props[name]);
        \});

    <span class="hljs-comment">// 设置节点属性</span>
    <span class="hljs-keyword">const</span> isAttribute = <span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> !isListener(name) &amp;&amp; name != <span class="hljs-string">"children"</span>;
    <span class="hljs-built_in">Object</span>.keys(props)
        .filter(isAttribute)
        .forEach(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> \{
            dom[name] = props[name];
        \});

    <span class="hljs-comment">// Render children</span>
    <span class="hljs-keyword">const</span> childElements =
        <span class="hljs-built_in">Object</span>.prototype.toString.call(props.children) === <span class="hljs-string">"[object Array]"</span>
            ? props.children
            : [props.children];
    <span class="hljs-keyword">const</span> childInstances = childElements.map(instantiate);
    <span class="hljs-keyword">const</span> childDoms = childInstances.map(<span class="hljs-function"><span class="hljs-params">childInstance</span> =&gt;</span> childInstance.dom);
    childDoms.forEach(<span class="hljs-function"><span class="hljs-params">childDom</span> =&gt;</span> dom.appendChild(childDom));

    <span class="hljs-keyword">const</span> instance = \{ dom, vnode, childInstances \};
    <span class="hljs-keyword">return</span> instance;
\}
</code></pre>
<p>现在的 instantiate 函数比较混乱，我们把设置元素属性的部分拆分为 updateDomProperties 方法以便重用：</p>
<pre><code class="lang-javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">instantiate</span>(<span class="hljs-params">vnode</span>) </span>\{
    <span class="hljs-comment">// 当vnode为字符串时，渲染结果是一段文本</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> vnode === <span class="hljs-string">"string"</span>) \{
        <span class="hljs-keyword">const</span> textNode = <span class="hljs-built_in">document</span>.createTextNode(vnode);
        <span class="hljs-keyword">return</span> \{ <span class="hljs-attr">dom</span>: textNode, vnode \};
    \}

    <span class="hljs-keyword">const</span> \{ type, props \} = vnode;
    <span class="hljs-comment">// 创建DOM节点</span>
    <span class="hljs-keyword">const</span> dom = <span class="hljs-built_in">document</span>.createElement(type);

    updateDomProperties(dom, [], props);

    <span class="hljs-comment">// Render children</span>
    <span class="hljs-keyword">const</span> childElements =
        <span class="hljs-built_in">Object</span>.prototype.toString.call(props.children) === <span class="hljs-string">"[object Array]"</span>
            ? props.children
            : [props.children];
    <span class="hljs-keyword">const</span> childInstances = childElements.map(instantiate);
    <span class="hljs-keyword">const</span> childDoms = childInstances.map(<span class="hljs-function"><span class="hljs-params">childInstance</span> =&gt;</span> childInstance.dom);
    childDoms.forEach(<span class="hljs-function"><span class="hljs-params">childDom</span> =&gt;</span> dom.appendChild(childDom));

    <span class="hljs-keyword">const</span> instance = \{ dom, vnode, childInstances \};
    <span class="hljs-keyword">return</span> instance;
\}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateDomProperties</span>(<span class="hljs-params">dom, prevProps, nextProps</span>) </span>\{
    <span class="hljs-comment">// 添加事件句柄</span>
    <span class="hljs-keyword">const</span> isListener = <span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> name.startsWith(<span class="hljs-string">"on"</span>);
    <span class="hljs-built_in">Object</span>.keys(props)
        .filter(isListener)
        .forEach(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> \{
            <span class="hljs-keyword">const</span> eventType = name.toLowerCase().substring(<span class="hljs-number">2</span>);
            dom.addEventListener(eventType, props[name]);
        \});

    <span class="hljs-comment">// 设置节点属性</span>
    <span class="hljs-keyword">const</span> isAttribute = <span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> !isListener(name) &amp;&amp; name != <span class="hljs-string">"children"</span>;
    <span class="hljs-built_in">Object</span>.keys(props)
        .filter(isAttribute)
        .forEach(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> \{
            dom[name] = props[name];
        \});
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
