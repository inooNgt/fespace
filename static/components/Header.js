import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as actions from "../redux/actions/index";

import {
    observer,
    observable,
    autorun,
    extendObservable,
    computed
} from "mobx-react";

const pages = [
    {
        path: "/",
        name: "Index"
    },
    {
        path: "/posts/index",
        name: "Post"
    }
];

class Header extends React.Component {
    constructor() {
        super();
    }

    handleClick(e) {}

    componentWillMount() {}

    render() {
        console.log("location.pathname", location.pathname);

        let Items = pages.map((v, k) => {
            return (
                <NavLink
                    className="nav-item"
                    exact
                    activeClassName="nav-active"
                    key={k}
                    to={v.path}
                >
                    {v.name}
                </NavLink>
            );
        });
        return (
            <div onClick={this.handleClick} className="header">
                <div className="nav">
                    <div className="logo">inoongt</div>
                    <div>{Items}</div>
                </div>
            </div>
        );
    }
}

export default Header;
