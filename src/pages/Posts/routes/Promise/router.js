import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/promise",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
