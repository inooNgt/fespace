webpackJsonp([6],{366:function(n,s,t){"use strict";function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function a(n,s){if(!(n instanceof s))throw new TypeError("Cannot call a class as a function")}function r(n,s){for(var t=0;t<s.length;t++){var e=s[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}function p(n,s,t){return s&&r(n.prototype,s),t&&r(n,t),n}function l(n,s){return!s||"object"!==e(s)&&"function"!=typeof s?o(n):s}function o(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function i(n){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function c(n,s){if("function"!=typeof s&&null!==s)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(s&&s.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),s&&u(n,s)}function u(n,s){return(u=Object.setPrototypeOf||function(n,s){return n.__proto__=s,n})(n,s)}Object.defineProperty(s,"__esModule",{value:!0});var h=t(6),f=t.n(h),j=function(n){function s(n){return a(this,s),l(this,i(s).call(this,n))}return c(s,n),p(s,[{key:"rawMarkup",value:function(){return{__html:'<h1 id="http-">Http 代理原理</h1>\n<h3 id="-http-">什么是 Http 代理？</h3>\n<p>Http 代理工作于服务器端和客户端之间，可以在 Http 请求发送至服务器前对 Http 协议进行逐行处理，再转发到后台服务器，反之亦可。</p>\n<div align="center"><img width="100%" height="auto" src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/web_proxy.png"/></div>\n\n<h3 id="http-">Http 代理的功能</h3>\n<p>Http 代理是一个中间程序，既可以担当客户端角色，也可以担当服务端角色。具体可以实现的功能有：</p>\n<ul>\n<li>修改 HTTP 请求：url、header、body</li>\n<li>过滤请求：根据一定的规则丢弃、过滤请求</li>\n<li>决定转发到哪个后端（可以是静态定义的，也可以是动态决定）</li>\n<li>修改应答：对应答做一些格式的转换，修改数据，甚至返回完全不一样的应答数据</li>\n<li>...</li>\n</ul>\n<h3 id="-">正向代理和反向代理</h3>\n<h4 id="-">正向代理</h4>\n<p>正向代理是一个位于客户端和原始服务器,为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。正向代理可以达到隐藏客户端 IP 的目的。</p>\n<h4 id="-">反向代理</h4>\n<p>反向代理（Reverse Proxy）方式是指以代理服务器来接受 internet 上的连接请求， 然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 internet 上请求连接的客户端， 此时代理服务器对外就表现为一个服务器，可以用来隐藏服务器的一些信息，比如 IP 及端口。</p>\n<p>其实，反向代理也就是通常所说的 WEB 服务器加速， 它是一种通过在繁忙的 WEB 服务器和 Internet 之间增加一个高速的 WEB 缓冲服务器（即：WEB 反向代理服务器） 来降低实际的 WEB 服务器的负载。</p>\n<h3 id="-">编程实践</h3>\n<p>以下</p>\n<pre><code className="lang-javascript"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);\n<span class="hljs-keyword">var</span> net = <span class="hljs-built_in">require</span>(<span class="hljs-string">"net"</span>);\n<span class="hljs-keyword">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">"url"</span>);\n\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">req, res</span>) </span>{\n    <span class="hljs-keyword">var</span> u = <span class="hljs-built_in">url</span>.parse(req.url);\n    <span class="hljs-keyword">var</span> options = {\n        <span class="hljs-attribute">hostname</span>: u.hostname,\n        <span class="hljs-attribute">port</span>: u.port || <span class="hljs-number">80</span>,\n        <span class="hljs-attribute">path</span>: u.path,\n        <span class="hljs-attribute">method</span>: req.method,\n        <span class="hljs-attribute">headers</span>: req.headers\n    };\n\n    <span class="hljs-comment">//新建到服务端的请求</span>\n    <span class="hljs-keyword">var</span> svrReq = http\n        .request(options, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">svrRes</span>) </span>{\n            res.writeHead(svrRes.statusCode, svrRes.headers);\n            svrRes.pipe(res);\n        })\n        .on(<span class="hljs-string">"error"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{\n            res.end();\n        });\n\n    <span class="hljs-comment">//把服务端响应返回给浏览器</span>\n    req.pipe(svrReq);\n}\n\nhttp.createServer()\n    .on(<span class="hljs-string">"request"</span>, request)\n    .listen(<span class="hljs-number">9090</span>, <span class="hljs-string">"0.0.0.0"</span>);\n</code></pre>\n'}}},{key:"render",value:function(){return f.a.createElement("div",{dangerouslySetInnerHTML:this.rawMarkup()})}}]),s}(h.Component);s.default=j}});