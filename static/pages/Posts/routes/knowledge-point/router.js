import asyncComponent from "../../../../components/AsyncComponent";

module.exports = [
    {
        path: "/posts/knowledge-point",
        component: asyncComponent(() => import("./components/Index"))
    }
];
