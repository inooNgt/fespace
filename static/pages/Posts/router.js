import asyncComponent from "../../components/AsyncComponent";

let route = [
    {
        path: "/posts",
        component: asyncComponent(() => import("./components/Index"))
    }
];

export default route;
