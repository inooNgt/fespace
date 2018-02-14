import React, { Component } from "react";
import mina from "../../../../../articles/mina-app";

class Index extends Component {
    constructor(props) {
        super(props);
    }
    rawMarkup() {
        return { __html: mina };
    }
    render() {
        return <div dangerouslySetInnerHTML={this.rawMarkup()} />;
    }
}

export default Index;
