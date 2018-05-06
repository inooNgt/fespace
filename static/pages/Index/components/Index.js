import React, { Component } from "react";

import { Transition, Spring, animated } from "react-spring";

const defaultStyles = {
    cursor: "pointer",
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    flexDirection: "column",
    fontWeight: 800,
    fontSize: "1.2em"
};
const A = styles => (
    <animated.div
        style={{ ...defaultStyles, ...styles, backgroundColor: "#247BA0" }}
    >
        <p>"可可·香奈儿生命的前一天，她还在工作室检查裙边，</p>
        <p>前一年，她还在学吉他。"</p>
    </animated.div>
);
const B = styles => (
    <animated.div
        style={{ ...defaultStyles, ...styles, backgroundColor: "#B2DBBF" }}
    >
        现在,公元2018年......
    </animated.div>
);

class App extends React.PureComponent {
    state = { toggled: true };
    toggle = e => this.setState(state => ({ toggled: !state.toggled }));
    render() {
        return (
            <div onClick={this.toggle} className="animated">
                <Transition
                    native
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}
                    config={{ tension: 5, friction: 10 }}
                >
                    {this.state.toggled ? A : B}
                </Transition>
            </div>
        );
    }
}

class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="contnet-inner">
                <App />
            </div>
        );
    }
}

export default Index;
