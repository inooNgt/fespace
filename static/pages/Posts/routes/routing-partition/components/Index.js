import React, { Component } from "react";

const article=`<h1 id="react-router4-">react-router4 路由分拆</h1>
<p>React Router 4 就是一个普通的 component</p>
<p>### </p>
<p>static not bad,but it is not the way react do</p>
<p>onEnter === componentDitMounted</p>
`


class Index extends Component {
    constructor(props) {
        super(props);
    }
    rawMarkup() {
        return { __html: article };
    }
    render() {
        return <div dangerouslySetInnerHTML={this.rawMarkup()} />;
    }
}

export default Index 