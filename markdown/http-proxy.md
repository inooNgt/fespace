# Http 代理原理

### 什么是 Http 代理？

Http 代理工作于服务器端和客户端之间，可以在 Http 请求发送至服务器前对 Http 协议进行逐行处理，再转发到后台服务器，反之亦可。

<div align="center"><img width="100%" height="auto" src="http://cdn.inoongt.tech/images/thinkin/web_proxy.png"/></div>

### Http 代理的功能

Http 代理是一个中间程序，既可以担当客户端角色，也可以担当服务端角色。具体可以实现的功能有：

-   修改 HTTP 请求：url、header、body
-   过滤请求：根据一定的规则丢弃、过滤请求
-   决定转发到哪个后端（可以是静态定义的，也可以是动态决定）
-   修改应答：对应答做一些格式的转换，修改数据，甚至返回完全不一样的应答数据
-   ...

### 正向代理和反向代理

#### 正向代理

正向代理是一个位于客户端和原始服务器,为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。正向代理可以达到隐藏客户端 IP 的目的。

#### 反向代理

反向代理（Reverse Proxy）方式是指以代理服务器来接受 internet 上的连接请求， 然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 internet 上请求连接的客户端， 此时代理服务器对外就表现为一个服务器，可以用来隐藏服务器的一些信息，比如 IP 及端口。

其实，反向代理也就是通常所说的 WEB 服务器加速， 它是一种通过在繁忙的 WEB 服务器和 Internet 之间增加一个高速的 WEB 缓冲服务器（即：WEB 反向代理服务器） 来降低实际的 WEB 服务器的负载。

### 编程实践

以下

```javascript
var http = require("http");
var net = require("net");
var url = require("url");

function request(req, res) {
    var u = url.parse(req.url);
    var options = {
        hostname: u.hostname,
        port: u.port || 80,
        path: u.path,
        method: req.method,
        headers: req.headers
    };

    //新建到服务端的请求
    var svrReq = http
        .request(options, function(svrRes) {
            res.writeHead(svrRes.statusCode, svrRes.headers);
            svrRes.pipe(res);
        })
        .on("error", function(e) {
            res.end();
        });

    //把服务端响应返回给浏览器
    req.pipe(svrReq);
}

http.createServer()
    .on("request", request)
    .listen(9090, "0.0.0.0");
```
