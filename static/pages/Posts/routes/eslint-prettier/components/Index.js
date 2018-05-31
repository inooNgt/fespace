import React, { Component } from "react";

const article = `<p>Eslint 和 Prettier 配置自动格式化代码</p>
<p>Eslint 可以提供代码检查，而 Prettier 能够统一团队代码风格，两者结合在一起会事半功倍。</p>
<h4 id="-">安装依赖</h4>
<ul>
<li>eslint-config-prettier 可以取消 eslint 和 prettier 冲突的配置项，采用 prettier 风格</li>
<li>eslint-plugin-prettier 可以将 prettier 的格式化规则作为 eslint 的检查规则</li>
</ul>
<pre><code><span className="hljs-symbol">yarn</span> <span class="hljs-keyword">add </span>prettier <span class="hljs-keyword">babel-eslint </span>eslint eslint-config-prettier eslint-plugin-flowtype eslint-plugin-prettier eslint-plugin-<span class="hljs-meta">import</span>  --dev
</code></pre><h4 id="-">相关配置文件</h4>
<p>新建 Eslint 和 Prettier 的配置件：</p>
<pre><code>touch <span class="hljs-selector-class">.eslintrc</span><span class="hljs-selector-class">.json</span>
touch <span class="hljs-selector-class">.prettierrc</span><span class="hljs-selector-class">.json</span>
</code></pre><p>在.eslintrc.json 写入一下内容:</p>
<pre><code>\{
    <span class="hljs-attr">"parser"</span>: <span class="hljs-string">"babel-eslint"</span>,
    <span class="hljs-attr">"extends"</span>: [
        <span class="hljs-string">"prettier"</span>,
        <span class="hljs-string">"prettier/flowtype"</span> // if you are using flow
    ],
    <span class="hljs-attr">"rules"</span>: \{
        <span class="hljs-attr">"indent"</span>: [<span class="hljs-string">"error"</span>, <span class="hljs-number">4</span>],
        <span class="hljs-attr">"prettier/prettier"</span>: <span class="hljs-string">"error"</span>
    \},
    <span class="hljs-attr">"plugins"</span>: [
        /* Flow type linting rules for ESLint. */
        <span class="hljs-string">"flowtype"</span>,
        <span class="hljs-string">"prettier"</span>
    ]
\}
</code></pre><p>在.prettierrc.json 写入一下内容:</p>
<pre><code>\{
    <span class="hljs-attr">"tabWidth"</span>: <span class="hljs-number">4</span>
\}
</code></pre><h4 id="-">开发工具的配置</h4>
<p>例如，将以下配置加入配置文件：</p>
<pre><code>    \{
        <span class="hljs-attr">"editor.formatOnSave"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"prettier.disableLanguages"</span>: [<span class="hljs-string">"js"</span>],
        <span class="hljs-attr">"eslint.autoFixOnSave"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"eslint.alwaysShowStatus"</span>: <span class="hljs-literal">true</span>
    \}
</code></pre><h4 id="-husky-lint-staged-">使用 Husky + Lint-Staged 在代码提交前自定检查并修正代码</h4>
<ul>
<li>由于 husky 在 .git/hooks 中写入了 pre-commit 钩子，该钩子在 git commit 执行时被触发</li>
<li>lint-staged 利用配置的文件过滤路径，对暂存区文件一个个进行匹配，匹配成功时，运行 eslint –fix 并自动将修改添加到暂存区</li>
</ul>
<pre><code>yarn <span class="hljs-keyword">add</span><span class="bash">  precommit husky --dev</span>
</code></pre><p>在 package.json 添加配置</p>
<pre><code>    <span class="hljs-string">"scripts"</span>: \{
        <span class="hljs-string">"precommit"</span>: <span class="hljs-string">"lint-staged"</span> <span class="hljs-string">//husky</span> 在 <span class="hljs-string">.git/hooks</span> 中写入了 钩子
    \},
    <span class="hljs-string">"lint-staged"</span>: \{
        <span class="hljs-string">"src/**/*.js"</span>: [
            <span class="hljs-string">"prettier --write"</span>,
            <span class="hljs-string">"git add"</span>
        ]
    \},
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
