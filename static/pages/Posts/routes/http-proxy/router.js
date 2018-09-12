import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/http-proxy",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
