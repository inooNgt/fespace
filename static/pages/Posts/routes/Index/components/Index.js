import React, { Component } from "react";
import { Link } from "react-router-dom";

const pages = [
    {
        path: "/posts/Performance",
        name: "Web 性能优化"
    },
    {
        path: "/posts/dns",
        name: "DNS 域名解析"
    },
    {
        path: "/posts/dns-prefetch",
        name: "DNS 预解析"
    },
    {
        path: "/posts/linux",
        name: "Some Operations on Linux"
    },
    {
        path: "/posts/tcp",
        name: "TCP连接的建立和释放"
    },
    {
        path: "/posts/browser-cache",
        name: "Webkit 缓存加载机制"
    },
    {
        path: "/posts/http-proxy",
        name: "http代理原理"
    },
    {
        path: "/posts/eslint-prettier",
        name: "Eslint 和 Prettier 配置自动格式化代码"
    },
    {
        path: "/posts/knowledge-point",
        name: "零散的笔记"
    },
    {
        path: "/posts/mina-app",
        name: "微信小程序原理"
    },
    {
        path: "/posts/promise",
        name: "Promise"
    },
    {
        path: "/posts/routing-partition",
        name: "React路由异步加载"
    },
    {
        path: "/posts/Three-dimensional-perspective",
        name: "利用透视原理实现 canvas 第三维度"
    }
];

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let items = pages.map((v, k) => (
            <div key={k} className="posts-item">
                <Link to={v.path}>{v.name}</Link>
            </div>
        ));
        return (
            <div>
                <h3 className="posts-head">文章列表</h3>
                {items}
            </div>
        );
    }
}

export default Index;
