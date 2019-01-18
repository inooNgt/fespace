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
import minaRouter from "../routes/mina-app/router";
import BrowserCache from "../routes/browser-cache/router";
import Dns from "../routes/dns/router";
import DnsPrefetch from "../routes/dns-prefetch/router";
import TCP from "../routes/tcp/router";
import Linux from "../routes/linux/router";
import Performance from "../routes/performance/router";

const routes = [
    ...indexRouter,
    ...proxyRouter,
    ...minaRouter,
    ...promiseRouter,
    ...perspectiveRouter,
    ...partitionRouter,
    ...knowledgeRouter,
    ...prettierRouter,
    ...BrowserCache,
    ...Dns,
    ...DnsPrefetch,
    ...TCP,
    ...Performance,
    ...Linux
];

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{renderRoutes(routes)}</div>;
    }
}

export default Index;
