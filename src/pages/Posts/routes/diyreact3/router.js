import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/diyreact3",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
