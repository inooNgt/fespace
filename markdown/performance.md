# web 性能优化

### 代码优化

1. css

-   css 合并，尽量减少 HTTP 请求（code splitting 除外）
-   css 压缩
-   将 css 文件放在页面最上面
-   选择器优化嵌套，尽量避免层级过深
-   充分利用 css 继承属性，减少代码量，如 font、color、line-height
-   抽象提取公共样式，区分公共 CSS 和 业务 CSS，减少代码量
-   使用伪元素，如::before，::after
-   css 雪碧图

2. html

-   简化 html 结构，尽量避免层级过深
-   标签语义化，用正确的标签做正确的事情

3. javascript

-   将脚本放到页面底部
-   删除不必要的代码，如不必要的 console、注释等
-   减少 dom 访问，可以使用 innerHTML 代替
-   少用全局变量
-   压缩代码

4. 图片

-   CSS3 模拟图像，图标 base64
-   图片压缩，使用合理大小的图片

### 网络相关

1. dns 预解析

    ```
    <link rel="dns-prefetch" href="xxx.com">
    ```

2. HTTP 缓存

    - Cache-control 强制缓存: [private\public\no-cache\max-age=xxx\no-store]
        - 控制缓存时间，http1.1
    - Expires 强制缓存
        - 和 max-age=xxx 类似,http1.0
    - Last-Modified / If-Modified-Since 协商缓存
        - Last-Modified：服务器在响应请求时，告诉浏览器资源的最后修改时间
        - If-Modified-Since：再次请求服务器时，通过此字段通知服务器上次请求时，服务器收到请求后发现有头 If-Modified-Since 则与被请求资源的最后修改时间进行比对。
    - ETag 协商缓存
        - 比较 Etag，级别比 Last-Modified 高

3. 域名拆分
   HTTP 客户端一般对同一个服务器的 HTTP 并发连接个数都是有限制的，chrome 4+为 6 个。
   域名拆分主要是为了增加浏览器下载的并行度，让浏览器能同时发起更多的请求
   域名拆分为 3 到 5 个比较合适，过多的域名会带来 DNS 解析时间的损耗，可能会降低性能

4. 使用 CDN 加速（访问最近服务器）
5. 开启 KeepAlive
   开启 KeepAlive 能够减少浏览器与服务器建立连接的次数，从而节省建立连接时间。
6. localStorage 本地存储、
7. 开启 Gzip
   Gzip 是一种压缩技术，可以将资源在服务端进行压缩，然后发送给浏览器后再进行解压，这种方式会降低传输大小，提高网页加载性能。可以通过 Nginx 配置。

8. 合并请求
   合并请求的主要目的是减少浏览器对服务器发起的请求数，从而减少在发起请求过程中花费的时间。

### 最后

终极优化清单：http://cdn.inoongt.tech/images/thinkin/optimization.png
