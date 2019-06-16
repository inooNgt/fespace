import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/knowledge-point",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
