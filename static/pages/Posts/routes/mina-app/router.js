import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/mina-app",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
