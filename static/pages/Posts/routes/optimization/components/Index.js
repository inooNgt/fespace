import React, { Component } from "react";

const article = `<h1 id="web-">web 性能优化</h1>
<h3 id="-">代码优化</h3>
<ol>
<li>css</li>
</ol>
<ul>
<li>css 合并，尽量减少 HTTP 请求（code splitting 除外）</li>
<li>css 压缩</li>
<li>将 css 文件放在页面最上面</li>
<li>选择器优化嵌套，尽量避免层级过深</li>
<li>充分利用 css 继承属性，减少代码量，如 font、color、line-height</li>
<li>抽象提取公共样式，区分公共 CSS 和 业务 CSS，减少代码量</li>
<li>使用伪元素，如::before，::after</li>
<li>css 雪碧图</li>
</ul>
<ol start="2">
<li>html</li>
</ol>
<ul>
<li>简化 html 结构，尽量避免层级过深</li>
<li>标签语义化，用正确的标签做正确的事情</li>
</ul>
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
