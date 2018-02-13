import asyncComponent from "../../../../components/AsyncComponent";

module.exports = [
    {
        path: "/posts/promise",
        component: asyncComponent(() => import("./components/Index"))
    }
];
