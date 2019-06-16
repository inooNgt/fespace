import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/routing-partition",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
