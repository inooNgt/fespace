import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Nav from "../common/Nav";

import "../scss/main.scss";

/** 
* todo, BrowserRouter bug
*/

/**
 * react router
 */
const routes = [
	...require("./Index/router"),
	...require("./Posts/router")
];

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <div className="content-inner">{renderRoutes(routes)}</div>
                </div>
            </Router>
        );
    }
}
