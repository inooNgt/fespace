import React, { Component } from "react";
import post_promise from "../../../../../articles/promise";

class Index extends Component {
    constructor(props) {
        super(props);
    }
    rawMarkup() {
        return { __html: post_promise };
    }
    render() {
        return <div dangerouslySetInnerHTML={this.rawMarkup()} />;
    }
}

export default Index;
