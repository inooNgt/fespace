import asyncComponent from "../../../../components/AsyncComponent";

module.exports = [
    {
        path: "/posts/eslint-prettier",
        component: asyncComponent(() => import("./components/Index"))
    }
];
