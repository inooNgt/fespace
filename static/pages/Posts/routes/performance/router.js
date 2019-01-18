import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/performance",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
