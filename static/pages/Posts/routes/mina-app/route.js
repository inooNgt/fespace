import asyncComponent from "../../../../components/AsyncComponent";

module.exports = [
    {
        path: "/posts/mina-app",
        component: asyncComponent(() => import("./components/Index"))
    }
];
