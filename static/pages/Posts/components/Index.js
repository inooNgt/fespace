import React, { Component } from "react";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import indexRouter from "../routes/Index/router";
import promiseRouter from "../routes/promise/router";
import perspectiveRouter from "../routes/Three-dimensional-perspective/router";
import partitionRouter from "../routes/routing-partition/router";
import knowledgeRouter from "../routes/knowledge-point/router";
import prettierRouter from "../routes/eslint-prettier/router";
import proxyRouter from "../routes/http-proxy/router";

const routes = [
    ...indexRouter,
    ...proxyRouter,
    ...promiseRouter,
    ...perspectiveRouter,
    ...partitionRouter,
    ...knowledgeRouter,
    ...prettierRouter
];

console.log("routes", routes);

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{renderRoutes(routes)}</div>;
    }
}

export default Index;
