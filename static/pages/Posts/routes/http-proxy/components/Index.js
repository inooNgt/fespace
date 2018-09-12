import React, { Component } from "react";

const article = `<h1 id="http-">Http 代理原理</h1>
<h3 id="-http-">什么是 Http 代理？</h3>
<p>Http 代理工作于服务器端和客户端之间，可以在 Http 请求发送至服务器前对 Http 协议进行逐行处理，再转发到后台服务器，反之亦可。</p>
<div align="center"><img width="100%" height="auto" src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/web_proxy.png"/></div>

<h3 id="http-">Http 代理的功能</h3>
<p>Http 代理是一个中间程序，既可以担当客户端角色，也可以担当服务端角色。具体可以实现的功能有：</p>
<ul>
<li>修改 HTTP 请求：url、header、body</li>
<li>过滤请求：根据一定的规则丢弃、过滤请求</li>
<li>决定转发到哪个后端（可以是静态定义的，也可以是动态决定）</li>
<li>修改应答：对应答做一些格式的转换，修改数据，甚至返回完全不一样的应答数据</li>
<li>...</li>
</ul>
<h3 id="-">正向代理和反向代理</h3>
<h4 id="-">正向代理</h4>
<p>正向代理是一个位于客户端和原始服务器,为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。正向代理可以达到隐藏客户端 IP 的目的。</p>
<h4 id="-">反向代理</h4>
<p>反向代理（Reverse Proxy）方式是指以代理服务器来接受 internet 上的连接请求， 然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 internet 上请求连接的客户端， 此时代理服务器对外就表现为一个服务器，可以用来隐藏服务器的一些信息，比如 IP 及端口。</p>
<p>其实，反向代理也就是通常所说的 WEB 服务器加速， 它是一种通过在繁忙的 WEB 服务器和 Internet 之间增加一个高速的 WEB 缓冲服务器（即：WEB 反向代理服务器） 来降低实际的 WEB 服务器的负载。</p>
<h3 id="-">编程实践</h3>
<p>以下</p>
<pre><code className="lang-javascript"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);
<span class="hljs-keyword">var</span> net = <span class="hljs-built_in">require</span>(<span class="hljs-string">"net"</span>);
<span class="hljs-keyword">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">"url"</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">req, res</span>) </span>\{
    <span class="hljs-keyword">var</span> u = <span class="hljs-built_in">url</span>.parse(req.url);
    <span class="hljs-keyword">var</span> options = \{
        <span class="hljs-attribute">hostname</span>: u.hostname,
        <span class="hljs-attribute">port</span>: u.port || <span class="hljs-number">80</span>,
        <span class="hljs-attribute">path</span>: u.path,
        <span class="hljs-attribute">method</span>: req.method,
        <span class="hljs-attribute">headers</span>: req.headers
    \};

    <span class="hljs-comment">//新建到服务端的请求</span>
    <span class="hljs-keyword">var</span> svrReq = http
        .request(options, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">svrRes</span>) </span>\{
            res.writeHead(svrRes.statusCode, svrRes.headers);
            svrRes.pipe(res);
        \})
        .on(<span class="hljs-string">"error"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>\{
            res.end();
        \});

    <span class="hljs-comment">//把服务端响应返回给浏览器</span>
    req.pipe(svrReq);
\}

http.createServer()
    .on(<span class="hljs-string">"request"</span>, request)
    .listen(<span class="hljs-number">9090</span>, <span class="hljs-string">"0.0.0.0"</span>);
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
