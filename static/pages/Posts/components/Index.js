import React, { Component } from "react";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";

const routes = [
    ...require("../routes/Index/router"),
    ...require("../routes/mina-app/router"),
    ...require("../routes/routing-partition/router"),
    ...require("../routes/Three-dimensional-perspective/router"),
    ...require("../routes/promise/router")
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
