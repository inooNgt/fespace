import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/linux",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
