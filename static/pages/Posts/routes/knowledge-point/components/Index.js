import React, { Component } from "react";

const article=`<h1 id="javascript-knowledge-point">Javascript Knowledge Point</h1>
<h3 id="1-undefined-and-null">1、undefined and null</h3>
<p>JavaScript 的最初版本是这样区分的：<b>null 是一个表示&quot;无&quot;的对象，转为数值时为 0；undefined 是一个表示&quot;无&quot;的原始值，转为数值时为 NaN</b>。</p>
<p>目前的用法：
<b>null 表示&quot;没有对象&quot;，即该处不应该有值</b>。典型用法是：</p>
<ol>
<li>作为函数的参数，表示该函数的参数不是对象。</li>
<li>作为原型链的终点。</li>
</ol>
<pre><code><span className="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Object</span>.prototype)
<span class="hljs-comment">// null</span>
</code></pre><p><b>undefined 表示&quot;缺少值&quot;，就是此处应该有一个值，但是还没有定义</b>。典型用法是：</p>
<ol>
<li>变量被声明，但没有被赋值，其值就是 undefined。</li>
<li>调用函数时，没有提供对应的参数，该参数就等于 undefined。</li>
<li>对象没有赋值的属性，其值就是 undefined。</li>
<li>函数没有返回值时，默认返回 undefined。</li>
</ol>
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