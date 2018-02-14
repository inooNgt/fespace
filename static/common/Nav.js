import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../redux/actions/index";

const pages = [
    {
        path: "/",
        name: "Index"
    },
    {
        path: "/posts",
        name: "Post"
    }
];

class Nav extends React.Component {
    constructor() {
        super();
    }

    handleClick = e => {
        //...
        this.props.dispatch(actions.changeLocation(location.pathname));
    };

    componentWillMount() {
        console.log("Willdispatch:", location.pathname);
        this.props.dispatch(actions.changeLocation(location.pathname));
    }

    render() {
        // console.log("render------", this.props.location);

        let selectedKey = [];
        pages.forEach((v, k) => {
            if (location.pathname === v.path) {
                selectedKey.push(k.toString());
            }
        });
        let Items = pages.map((v, k) => {
            return (
                <Link className="nav-item" key={k} to={v.path}>
                    {v.name}
                </Link>
            );
        });
        return (
            <div onClick={this.handleClick} className="nav">
                {Items}
            </div>
        );
    }
}

const mapStateToProps = (state /*, props*/) => {
    return {
        reduxState: state,
        location: state.location
    };
};

const ConnectedNav = connect(mapStateToProps)(Nav);

export default ConnectedNav;
