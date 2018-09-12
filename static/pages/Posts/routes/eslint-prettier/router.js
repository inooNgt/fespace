import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/eslint-prettier",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
