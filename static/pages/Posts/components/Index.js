import React, { Component } from "react";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Minaapp from "../../../articles/mina-app";
import post_promise from "../../../articles/promise";

const routes = [
    ...require("../routes/mina/router"),
    ...require("../routes/promise/router")
];

const pages = [
    {
        path: "/posts/mina",
        name: "mina"
    },
    {
        path: "/posts/promise",
        name: "promise"
    }
];

class Index extends Component {
    constructor(props) {
        super(props);
    }
    rawMarkup() {
        return { __html: post_promise };
    }
    render() {
        let items = pages.map((v, k) => (
            <Link className="posts-item" key={k} to={v.path}>
                {v.name}
            </Link>
        ));
        return (
            <div>
                {items}
                {renderRoutes(routes)}
            </div>
        );
    }
}

export default Index;
