import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/diyreact1",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
