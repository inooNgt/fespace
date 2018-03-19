import asyncComponent from "../../../../components/AsyncComponent";

module.exports = [
    {
        path: "/posts/routing-partition",
        component: asyncComponent(() => import("./components/Index"))
    }
];
