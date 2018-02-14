import asyncComponent from "../../../../components/AsyncComponent";

module.exports = [
    {
        path: "/posts/index",
        component: asyncComponent(() => import("./components/Index"))
    }
];
