import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/browser-cache",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
