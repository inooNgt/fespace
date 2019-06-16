import React, { Component } from "react";

const article = `<h1 id="react-router4-">react-router4 路由分拆</h1>
<p>React Router 4 就是一个普通的 component</p>
<p>###</p>
<p>定义异步加载组件</p>
<pre><code><span className="hljs-keyword">import</span> <span class="hljs-type">React</span>, \{ <span class="hljs-type">Component</span> \} from <span class="hljs-symbol">'reac</span>t'

export <span class="hljs-keyword">default</span> function asyncComponent(importComponent) \{
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>\{
        constructor(props) \{
            <span class="hljs-keyword">super</span>(props)

            <span class="hljs-keyword">this</span>.state = \{
                component: <span class="hljs-literal">null</span>
            \}
        \}

        async componentDidMount() \{
            const \{ <span class="hljs-keyword">default</span>: component \} = await importComponent()

            <span class="hljs-keyword">this</span>.setState(\{
                component: component
            \})
        \}

        render() \{
            const <span class="hljs-type">C</span> = <span class="hljs-keyword">this</span>.state.component

            <span class="hljs-keyword">return</span> <span class="hljs-type">C</span> ? &lt;<span class="hljs-type">C</span> \{...<span class="hljs-keyword">this</span>.props\} /&gt; : <span class="hljs-literal">null</span>
        \}
    \}

    <span class="hljs-keyword">return</span> <span class="hljs-type">AsyncComponent</span>
\}
</code></pre><p>在路由中使用异步加载组件</p>
<pre><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> \{ BrowserRouter <span class="hljs-keyword">as</span> Router, Switch, Route \} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="hljs-keyword">import</span> asyncComponent <span class="hljs-keyword">from</span> <span class="hljs-string">"components/AsyncComponent"</span>;

let routes = [
    \{
        path: <span class="hljs-string">"/"</span>,
        exact: <span class="hljs-literal">true</span>,
        component: asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">"./components/Index"</span>))
    \}
];

const App = <span class="hljs-function"><span class="hljs-params">(props, context)</span> =&gt;</span> (
  &lt;Router&gt;
    &lt;Route
      render=\{() =&gt; \{
        <span class="hljs-keyword">return</span> (
          &lt;Switch&gt;
            \{routes.map(route =&gt; (
              &lt;Route
                key=\{route.path\}
                path=\{route.path\}
                exact=\{route.exact\}
                component=\{route.component\}
              /&gt;
            ))\}
          &lt;/Switch&gt;
        );
      \}\}
    /&gt;
  &lt;/Router&gt;
);

ReactDOM.render(&lt;App /&gt;, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>));
</code></pre>`;

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
