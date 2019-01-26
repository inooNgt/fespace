import React, { Component } from "react";

const article = `<h1 id="-react-">实现一个简单的 React-组件</h1>
<p>上一篇文章我们已经实现了使用 JSX 渲染 DOM,接下来要做的事渲染组件。</p>
<p>React 的组件继承自 React.Component,我们首先要实现 React.Component 类。Component 的构造函数中提供 state 和 props 属性，Component 还需要提供一个 setState 方法用来更新组件的 state。为了优化性能 React 的 setState 是异步的，并且可以接收一个回调函数，这里先不考虑这点。</p>
<pre><code className="lang-javascript">class Component \{
    constructor(props) \{
        this.props = props;
        this.<span class="hljs-keyword">state</span> = this.<span class="hljs-keyword">state</span> || \{\};
    \}

    <span class="hljs-built_in">set</span>State(partialState) \{
        this.<span class="hljs-keyword">state</span> = Object.assign(\{\}, this.<span class="hljs-keyword">state</span>, partialState);
        // todo
        renderComponent(this);
    \}
\}
</code></pre>
<p>组件的使用方式和一般的标签节点并无二致，比如<MyComponent/>，这样就不需要 createElement 函数了。现在需要的是一个可以创建组件实例的函数。</p>
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
