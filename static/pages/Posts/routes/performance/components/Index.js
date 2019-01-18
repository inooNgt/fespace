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
<ol start="3">
<li>javascript</li>
</ol>
<ul>
<li>将脚本放到页面底部</li>
<li>删除不必要的代码，如不必要的 console、注释等</li>
<li>减少 dom 访问，可以使用 innerHTML 代替</li>
<li>少用全局变量</li>
<li>压缩代码</li>
</ul>
<ol start="4">
<li>图片</li>
</ol>
<ul>
<li>CSS3 模拟图像，图标 base64</li>
<li>图片压缩，使用合理大小的图片</li>
</ul>
<h3 id="-">网络相关</h3>
<ol>
<li><p>dns 预解析</p>
<pre><code> &lt;link <span className="hljs-attribute">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attribute">href</span>=<span class="hljs-string">"xxx.com"</span>&gt;
</code></pre></li>
<li><p>HTTP 缓存</p>
<ul>
<li>Cache-control 强制缓存: [private\public\no-cache\max-age=xxx\no-store]<ul>
<li>控制缓存时间，http1.1</li>
</ul>
</li>
<li>Expires 强制缓存<ul>
<li>和 max-age=xxx 类似,http1.0</li>
</ul>
</li>
<li>Last-Modified / If-Modified-Since 协商缓存<ul>
<li>Last-Modified：服务器在响应请求时，告诉浏览器资源的最后修改时间</li>
<li>If-Modified-Since：再次请求服务器时，通过此字段通知服务器上次请求时，服务器收到请求后发现有头 If-Modified-Since 则与被请求资源的最后修改时间进行比对。</li>
</ul>
</li>
<li>ETag 协商缓存<ul>
<li>比较 Etag，级别比 Last-Modified 高</li>
</ul>
</li>
</ul>
</li>
<li><p>域名拆分
HTTP 客户端一般对同一个服务器的 HTTP 并发连接个数都是有限制的，chrome 4+为 6 个。
域名拆分主要是为了增加浏览器下载的并行度，让浏览器能同时发起更多的请求
域名拆分为 3 到 5 个比较合适，过多的域名会带来 DNS 解析时间的损耗，可能会降低性能</p>
</li>
<li><p>使用 CDN 加速（访问最近服务器）</p>
</li>
<li>开启 KeepAlive
开启 KeepAlive 能够减少浏览器与服务器建立连接的次数，从而节省建立连接时间。</li>
<li>localStorage 本地存储、</li>
<li><p>开启 Gzip
Gzip 是一种压缩技术，可以将资源在服务端进行压缩，然后发送给浏览器后再进行解压，这种方式会降低传输大小，提高网页加载性能。可以通过 Nginx 配置。</p>
</li>
<li><p>合并请求
合并请求的主要目的是减少浏览器对服务器发起的请求数，从而减少在发起请求过程中花费的时间。</p>
</li>
</ol>
<h3 id="-">最后</h3>
<p>终极优化清单：<a href="http://cdn.inoongt.tech/images/thinkin/optimization.png">http://cdn.inoongt.tech/images/thinkin/optimization.png</a></p>
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
