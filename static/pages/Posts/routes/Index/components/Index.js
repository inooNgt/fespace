import React, { Component } from "react";
import { Link } from "react-router-dom";

const pages = [
    {
        path: "/posts/mina-app",
        name: "微信小程序原理"
    },
    {
        path: "/posts/promise",
        name: "Promise顺序与并行执行异步任务"
    },
    {
        path: "/posts/routing-partition",
        name: "React路由分拆"
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
            <Link className="posts-item" key={k} to={v.path}>
                {v.name}
            </Link>
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
