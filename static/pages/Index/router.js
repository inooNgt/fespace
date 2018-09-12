import asyncComponent from "../../components/AsyncComponent";

let route = [
    {
        path: "/",
        exact: true,
        component: asyncComponent(() => import("./components/Index"))
    }
];

export default route;
