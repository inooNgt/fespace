import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/dns",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
