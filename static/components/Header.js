import React from "react";
import { Link } from "react-router-dom";
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

    handleClick(e) {
		
	}

    componentWillMount() {}

    render() {
        console.log("location.pathname", location.pathname);

        let Items = pages.map((v, k) => {
            return (
                <Link
                    className={
                        location.pathname === v.path
                            ? "nav-item  nav-active"
                            : "nav-item "
                    }
                    key={k}
                    to={v.path}
                >
                    {v.name}
                </Link>
            );
        });
        return (
            <div onClick={this.handleClick} className="nav">
                <div className="nav-inner">{Items}</div>
            </div>
        );
    }
}

export default Header;
