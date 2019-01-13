import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/optimization",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
