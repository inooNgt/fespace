# Node 高并发负载均衡策略

在高并发场景中，并发量、系统流量不断的扩大，系统性能达到瓶颈，如何应对？

## 扩展方向

### 垂直扩展

通过升级单机硬件配置提高服务器性能，比如升级 cpu、内存、网卡、硬盘等。

摩尔定律：当价格不变时，集成电路上可容纳的元器件的数目，约每隔 18-24 个月便会增加一倍，性能也会增加一倍。

但是单机扩展性能提高是有限的，且因为摩尔定律已经放缓其成本会越来越高。

### 水平扩展

目前在高并发系统架构中，最优的方案是水平扩展。

通过增加服务器的数量、部署更多的机器集群扩展性能,理论上能过带来无限性能的提升。

## 无限水平扩展的实现

### Nginx 负载均衡

核心概念：用户请求先到 Nginx，再由 Nginx 转发请求到后面的应用服务器。

Nginx 工作在网络的 7 层(应用层)，可以针对 http 应用本身来做分流策略。支持七层 HTTP、HTTPS 协议的负载均衡。对四层（传输层）协议的支持需要第三方插件-yaoweibin 的 ngx_tcp_proxy_module 实现了 tcp upstream。

Nginx 负载均衡策的内置策略包含加权轮询和 ip hash，在默认情况下这两种策略会编译进 Nginx 内核，只需在 Nginx 配置中指明参数即可。

#### 加权轮询

HttpIndex 模块提供一个简单方法来实现在轮询和客户端 IP 之间的后端服务器负荷平衡。每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器 down 掉，能自动剔除。

weight 指定轮询几率，weight 和访问比率成正比，用于后端服务器性能不均的情况。

```
upstream backend  {
  server backend1.example.com weight=5;
  server backend2.example.com:8080;
  server unix:/tmp/backend3;
}

server {
  location / {
    proxy_pass  http://backend;
  }
}
```

轮询原理：
首先将请求都分给高权重的机器，直到该机器的权值降到了比其他机器低，才开始将请求分给下一个高权重的机器；当所有后端机器都 down 掉时，nginx 会立即将所有机器的标志位清成初始状态。

<div align="center"><img width="400"src="http://cdn.inoongt.tech/images/thinkin/nginx_upstream.png"/></div>

#### ip_hash

尽可能地让同一 IP 每次都请求到相同的服务器。如果命中的服务器无效，则转发到另一台服务器。ip_hash 可以解决不同服务器之间 session 丢失的问题。

This directive causes requests to be distributed between upstreams based on the IP-address of the client. The key for the hash is the class-C network address of the client. This method guarantees that the client request will always be transferred to the same server. But if this server is considered inoperative, then the request of this client will be transferred to another server. This gives a high probability clients will always connect to the same server.

```
upstream backend {
  ip_hash;
  server   backend1.example.com;
  server   backend2.example.com;
  server   backend3.example.com  down;
  server   backend4.example.com;
}
```

单台 Nginx 一般做到 10 万并发，常用优化手法：
Nginx 参数：worker_cpu_affinity、并发连接数、缓存区、超时时间、gzip
操作系统网络参数：tcp 缓存区、nte.ipv4.tcp_keepalive_time、tcp_mem

高于 10 万并发怎么做？
Nginx 集群

### LVS 10W-50W 并发

LVS 是 Linux Virtual Server 的简写，是一个虚拟的服务器集群系统，实现基于传输层的软件负载均衡方案。

原理：原本是请求 LVS 服务器的数据包，被 LVS 软件篡改了数据包的目的地，将流量转移到了 Nginx 所在 的机器 IP，从而实现负载均衡。

#### LVS 的工作模型

##### LVS-NAT

<div align="center"><img width="600"src="http://cdn.inoongt.tech/images/thinkin/lvs-nat.png"/></div>

LVS 集群的设备地址命名:

-   VIP：Virtual IP，LVS 面向用户请求的 IP 地址
-   RIP：Real server IP，后端服务器用于和 LVS 通信的 IP 地址
-   DIP：Director IP，LVS 用户和后端服务器通信的 IP 地址
-   CIP：Client IP，客户端 IP 地址

当客户端请求的是集群服务时，LVS 修改请求报文的目标地址为 RIP，转发至后端的 RealServer，并修改后端响应报文的源地址为 VIP，响应至客户端。

在 LVS-NAT 模型下，Director 进出请求报文都经过 Director，因此 Director 的压力是比较大的。

##### LVS-DR

<div align="center"><img width="600"src="http://cdn.inoongt.tech/images/thinkin/lvs-dr.png"/></div>

DR 值 Direct Routing，直接路由，DR 模型中，Director 和 Realserver 处在同一网络中，对于 Director，VIP 用于接受客户端请求，DIP 用于和 Realserver 通信。对于 Realserver，每个 Realserver 都配有和 Director 相同的 VIP（此 VIP 隐藏，关闭对 ARP 请求的响应），仅用户响应客户端的请求，RIP 用于和 Director 通信。

当客户端请求集群服务时，请求报文发送至 Director 的 VIP（Realserver 的 VIP 不会响应 ARP 请求），Director 将客户端报文的源和目标 MAC 地址进行重新封装，将报文转发至 Realserver，Realserver 接收转发的报文。此时报文的源 IP 和目标 IP 都没有被修改，因此 Realserver 接受到的请求报文的目标 IP 地址为本机配置的 VIP，它将使用自己的 VIP 直接响应客户端。

LVS-DR 模型中，客户端的响应报文不会经过 Director，因此 Director 的并发能力有很大提升。

##### LVS-TUN

<div align="center"><img width="600"src="http://cdn.inoongt.tech/images/thinkin/lvs-tun.png"/></div>

和 DR 模型类似，Realserver 都配有不可见的 VIP，Realserver 的 RIP 是公网地址，且可能和 DIP 不再同一网络中。当请求到达 Director 后，Director 不修改请求报文的源 IP 和目标 IP 地址，而是使用 IP 隧道技术，使用 DIP 作为源 IP，RIP 作为目标 IP 再次封装此请求报文，转发至 RIP 的 Realserver 上，Realserver 解析报文后仍然使用 VIP 作为源地址响应客户端。

#### LVS 集群算法

##### rr

轮循调度（Round-Robin）,它将请求依次分配不同的 RS(RealServer) 节点，也就是在 RS 节点中均摊请求。这种算法很简单，但是只适合于 RS 节点处理性能相差不大的情况。

##### wrr

加权轮循调度（Weighted Round-Robin）,它将依据不同的 RS 节点的权值分配任务。权值较高的 RS 将优先获得任务，并且分配到的连接数将比权值较低的 RS 节点更多。相同权值的 RS 得到相同数目的连接数。

##### wlc

加权最小连接数调度（Weighted Least-Connection）假设各台 RS 的权值依次为 Wi（I=1..n），当前的 TCP 连接次数依次为 Ti（I=1..n），依次选取 Ti/Wi 为最小的 RS 作为下一个分配的 RS。

##### dh

目的地址哈希调度，以目的地址为关键字查找一个静态 hash 表来获得需要的 RS。

##### sh

源地址哈希调度，以源地址为关键字查找一个静态 hash 表来获得需要的 RS。

#### 为什么说 LVS 比 Nginx 快？

传输层协议比应用层的 http 协议简单，解析和组装所消耗的 CPU、内存等资源比 Nginx 要低。

### F5 硬件设备 200W-1000W 并发

F5 指处理负载均衡的硬件，流程：

1. 客户发出服务请求到 VIP

2. BIGIP 接收到请求，将数据包中目的 IP 地址改为选中的后台服务器 IP 地址，然后将数据包发出到后台选定的服务器

3. 后台服务器收到后，将应答包按照其路由发回到 BIGIP

4. BIGIP 收到应答包后将其中的源地址改回成 VIP 的地址，发回客户端

<div align="center"><img width="400"src="http://cdn.inoongt.tech/images/thinkin/f5.png"/></div>

#### 服务端性能终点

Nginx 1W-10W 并发
LVS 10W-50W 并发
F5 200W-1000W 并发

### DNS - 无限水平扩展

DNS 负责提供域名解析服务，当访问某个站点时，实际上首先需要通过该站点域名的 DNS 服务器来获取域名指向的 IP 地址，在这一过程中，DNS 服务器完成了域名到 IP 地址的映射，同样，这样映射也可以是一对多的，这时候，DNS 服务器便充当了负载均衡调度器。

#### 多个 A 记录

在 DNS 的各种记录类型中，A 记录你负责实现 DNS 的基本功能，用来指定域名对应的 IP 地址。常见的比较 成熟的 DNS 系统如 Linux 的 bind，以及 Windows 的 DNS 服务等，都支持为一个域名指定多个 IP 地址，并且可以选择使用各 种调度策略。
使用 dig 命令来查看 baidu.com 的 A 记录设置，可以看到 baidu.com 拥有 2 个 A 记录，指向 2 个不同的 IP。这意味着 DNS 服务器可以根据具体的负载均衡策略决定返回的 IP 地址。

<div align="center"><img width="500"src="http://cdn.inoongt.tech/images/thinkin/digbaidu.png"/></div>

参考文献：

http://liaoph.com/lvs/
https://www.vxzsk.com/1082.html
