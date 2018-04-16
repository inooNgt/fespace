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
    fontWeight: 800,
    fontSize: "16em"
};
const A = styles => (
    <animated.div
        style={{ ...defaultStyles, ...styles, backgroundColor: "#247BA0" }}
    >
        A
    </animated.div>
);
const B = styles => (
    <animated.div
        style={{ ...defaultStyles, ...styles, backgroundColor: "#B2DBBF" }}
    >
        B
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
