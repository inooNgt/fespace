import asyncComponent from "../../../../components/AsyncComponent";

let route = [
    {
        path: "/posts/{{route}}",
        component: asyncComponent(() => import("./components/Index"))
    }
];
export default route;
