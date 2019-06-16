import React, { Component } from "react";

const article = `<h1 id="-react-jsx-dom-dom">实现一个简单的 React-JSX、虚拟 DOM 和渲染 DOM</h1>
<h3 id="-">前言</h3>
<p>一种更深刻理解 React 的方法是动手实现它，如果忽略一些细节，只关注 React 的主要结构和特性，实现一个 React 还是比较简单的。</p>
<p>实现一个简单的 React，这就是我们接下来要做的事情，可以把即将要实现的库称为 SimpleReact。</p>
<p>先来看一下目标，我们要用 SimpleReact 写的代码：</p>
<pre><code className="lang-javascript">const posts = [
    \{ name: <span class="hljs-string">"Post1"</span> \},
    \{ name: <span class="hljs-string">"Post2"</span> \},
    \{ name: <span class="hljs-string">"Post3"</span> \},
    \{ name: <span class="hljs-string">"Post4"</span> \}
];

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">SimpleReact</span>.<span class="hljs-title">Component</span> </span>\{
    render() \{
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;h1&gt;<span class="hljs-type">SimpleReact</span> <span class="hljs-type">Posts</span>&lt;/h1&gt;
                &lt;ul&gt;
                    \{<span class="hljs-keyword">this</span>.props.posts.map(story =&gt; \{
                        <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Story</span> name=\{story.name\} /&gt;;
                    \})\}
                &lt;/ul&gt;
            &lt;/div&gt;
        );
    \}
\}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Story</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">SimpleReact</span>.<span class="hljs-title">Component</span> </span>\{
    constructor(props) \{
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = \{ likesCount: <span class="hljs-type">Math</span>.ceil(<span class="hljs-type">Math</span>.random() * <span class="hljs-number">100</span>) \};
    \}
    like() \{
        <span class="hljs-keyword">this</span>.setState(\{
            likesCount: <span class="hljs-keyword">this</span>.state.likesCount + <span class="hljs-number">1</span>
        \});
    \}
    render() \{
        const \{ name \} = <span class="hljs-keyword">this</span>.props;
        const \{ likesCount \} = <span class="hljs-keyword">this</span>.state;
        <span class="hljs-keyword">return</span> (
            &lt;li&gt;
                &lt;button onClick=\{e =&gt; <span class="hljs-keyword">this</span>.like()\}&gt;
                    \{likesCount\}
                    &lt;b&gt;❤️&lt;/b&gt;
                &lt;/button&gt;
                &lt;span&gt;\{name\}&lt;/span&gt;
            &lt;/li&gt;
        );
    \}
\}

<span class="hljs-type">SimpleReact</span>.render(&lt;<span class="hljs-type">App</span> posts=\{posts\} /&gt;, document.getElementById(<span class="hljs-string">"root"</span>));
</code></pre>
<p>SimpleReact 要实现的功能有：</p>
<ol>
<li>用 JSX 创建 DOM 元素</li>
<li>渲染 DOM 元素</li>
<li>virtual DOM</li>
<li>组件</li>
<li>Fiber</li>
</ol>
<h3 id="jsx-dom">JSX 和虚拟 DOM</h3>
<p>JSX 是提供了创建元素的语法糖，看一下这段代码：</p>
<pre><code class="lang-javascript"><span class="hljs-keyword">const</span> element = (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);
</code></pre>
<p>通过 Babel 的编译，它将变成：</p>
<pre><code><span class="hljs-meta">"use strict"</span>;

<span class="hljs-keyword">var</span> element = React.createElement(
  <span class="hljs-string">"div"</span>,
  \{ <span class="hljs-attr">id</span>: <span class="hljs-string">"container"</span> \},
  React.createElement(
    <span class="hljs-string">"h1"</span>,
    <span class="hljs-literal">null</span>,
    <span class="hljs-string">"Hello, world!"</span>
  )
);
</code></pre><p>你可以查看<a href="https://babeljs.io/repl/#?babili=false&amp;browsers=&amp;build=&amp;builtIns=false&amp;spec=false&amp;loose=false&amp;code_lz=MYewdgzgLgBApgGzgWzmWBeGAKAUDGAHgBMBLANxlOIwCJR0BDUsOAJ1oD58CiALAIycAEogQgANDADuINgmIBCQgHpB3AqrLluASgDcQA&amp;debug=false&amp;forceAllTransforms=false&amp;shippedProposals=false&amp;circleciRepo=&amp;evaluate=false&amp;fileSize=false&amp;timeTravel=false&amp;sourceType=module&amp;lineWrap=true&amp;presets=es2015%2Creact%2Cstage-0&amp;prettier=false&amp;targets=&amp;version=6.26.0&amp;envVersion=">Babel 在线编译</a>。</p>
<p>React.createElement 将会返回以下结果：</p>
<pre><code class="lang-javascript">\{
    <span class="hljs-attribute">type</span>:<span class="hljs-string">'div'</span>,
    <span class="hljs-attribute">props</span>:\{
        <span class="hljs-attribute">id</span>:<span class="hljs-string">'container'</span>,
        <span class="hljs-attribute">children</span>:\{
            <span class="hljs-attribute">type</span>:<span class="hljs-string">'h1'</span>,
            <span class="hljs-attribute">props</span>:\{
                <span class="hljs-attribute">children</span>:<span class="hljs-string">'Hello,world!'</span>
            \}
        \}
    \}
\}
</code></pre>
<p>这是一个用来描述 DOM 元素的普通对象， 称之为虚拟 DOM。React 使用虚拟 DOM 以提高自身的性能，因为每一次对真是 DOM 的修改都会引起浏览器的重新渲染。</p>
<p>我们现在首先做的是实现 createElement 方法，创建虚拟 DOM，至于 JSX 的编译则交给 Babel 完成。createElement 方法的第一个参数是节点类型 type，第二个参数是节点属性 props 对象，剩下的其他参数是子节点 children。</p>
<pre><code class="lang-javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElement</span><span class="hljs-params">(type, attrs, <span class="hljs-rest_arg">...rest</span>)</span> </span>\{
    <span class="hljs-keyword">const</span> props = Object.assign(\{\}, attrs);

    <span class="hljs-keyword">if</span> (!type &amp;&amp; <span class="hljs-keyword">typeof</span> type !== <span class="hljs-string">"string"</span>) \{
        <span class="hljs-keyword">throw</span> Error(<span class="hljs-string">"element type is invalid"</span>);
    \}

    <span class="hljs-keyword">if</span> (rest.length &gt; <span class="hljs-number">0</span>) \{
        props.children = rest.length &gt; <span class="hljs-number">1</span> ? [].concat(...rest) : rest[<span class="hljs-number">0</span>];
    \}
    <span class="hljs-keyword">return</span> \{ type, props \};
\}
</code></pre>
<p>我们的 createElement 会返回由 typp 和 props 组合的对象，若有子节点，将会在 props 节点上添加 children 属性。如果只有一个子节点，则将子节点对象直接赋值给 children ；否则, children 是由所有子节点组成的数组。
这样，我们的 createElement 方法就返回了一个记录 DOM 节点所有的信息的对象，即虚拟 DOM。</p>
<h3 id="-dom-">渲染 DOM 元素</h3>
<p>有了虚拟 DOM 后，接下来要做的就是将虚拟 DOM 渲染成真实 DOM 的 render 函数。</p>
<p>render 函数的任务是接收虚拟 DOM 元素和父容器元素，根据虚拟 DOM 创建 DOM 子树，并把子树添加到父容器中。
对于 props 中的事件属性，需要为其添加事件句柄；children 需要递归处理；对于文本节点，它只是一个字符串，使用 document.createTextNode 处理。</p>
<pre><code class="lang-javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">vnode, parentDom</span>) </span>\{
    <span class="hljs-comment">// 当vnode为字符串时，渲染结果是一段文本</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> vnode === <span class="hljs-string">"string"</span>) \{
        <span class="hljs-keyword">const</span> textNode = <span class="hljs-built_in">document</span>.createTextNode(vnode);
        <span class="hljs-keyword">return</span> parentDom.appendChild(textNode);
    \}

    <span class="hljs-keyword">const</span> \{ <span class="hljs-keyword">type</span>, props \} = vnode;
    <span class="hljs-comment">// 创建DOM节点</span>
    <span class="hljs-keyword">const</span> dom = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-keyword">type</span>);

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
    childElements.forEach(<span class="hljs-function"><span class="hljs-params">childElement</span> =&gt;</span> render(childElement, dom));

    <span class="hljs-comment">// 子树添加到父容器</span>
    <span class="hljs-keyword">if</span> (!parentDom.lastChild) \{
        parentDom.appendChild(dom);
    \} <span class="hljs-keyword">else</span> \{
        parentDom.replaceChild(dom, parentDom.lastChild);
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
