import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/diyreact2",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
