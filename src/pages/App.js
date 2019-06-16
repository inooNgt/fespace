import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Header from "../components/Header";

import "../scss/main.scss";

/**
 * react router
 */

import indexRouter from "./Index/router";
import postsRouter from "./Posts/router";

const routes = [...indexRouter, ...postsRouter];

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("this.props.children", this.props.children);
        React.Children.map(this.props.children, child => {
            console.log("child", child);
        });

        return (
            <Router>
                <div className="app-wrap">
                    <Header />
                    <div className="content">{renderRoutes(routes)}</div>
                </div>
            </Router>
        );
    }
}
