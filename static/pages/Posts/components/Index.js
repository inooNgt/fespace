import React, { Component } from "react";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";

const routes = [
    ...require("../routes/Index/router"),
    ...require("../routes/Mina/router"),
    ...require("../routes/Promise/router")
];

class Index extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                {renderRoutes(routes)}
            </div>
        );
    }
}

export default Index;
