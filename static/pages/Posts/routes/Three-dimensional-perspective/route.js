import asyncComponent from "../../../../components/AsyncComponent";

module.exports = [
    {
        path: "/posts/Three-dimensional-perspective",
        component: asyncComponent(() => import("./components/Index"))
    }
];
