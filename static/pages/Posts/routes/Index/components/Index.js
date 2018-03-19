import React, { Component } from "react";
import { Link } from "react-router-dom";

const pages = [
    {
        path: "/posts/mina",
        name: "mina"
    },
    {
        path: "/posts/promise",
        name: "promise"
	},
	{
        path: "/posts/Three-dimensional-perspective",
        name: "perspective"
    }
];

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let items = pages.map((v, k) => (
            <Link className="posts-item" key={k} to={v.path}>
                {v.name}
            </Link>
        ));
        return <div>{items}</div>;
    }
}

export default Index;
