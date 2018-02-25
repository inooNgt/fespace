import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Nav from "../common/Nav";

import "../scss/main.scss";

/**
 * react router
 */

const routes = [...require("./Index/router"), ...require("./Posts/router")];

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("renderRoutes(routes):", renderRoutes(routes));
        return (
            <Router>
                <div>
                    <Nav />
                    <div className="content-inner">
                    5555555555555
                    {renderRoutes(routes)}
                    </div>
                </div>
            </Router>
        );
    }
}
