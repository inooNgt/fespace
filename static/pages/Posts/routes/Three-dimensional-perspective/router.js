import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/Three-dimensional-perspective",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
