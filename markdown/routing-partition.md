# react-router4 路由分拆

React Router 4 就是一个普通的 component

###

定义异步加载组件

```
import React, { Component } from 'react'

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props)

            this.state = {
                component: null
            }
        }

        async componentDidMount() {
            const { default: component } = await importComponent()

            this.setState({
                component: component
            })
        }

        render() {
            const C = this.state.component

            return C ? <C {...this.props} /> : null
        }
    }

    return AsyncComponent
}
```

在路由中使用异步加载组件

```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import asyncComponent from "components/AsyncComponent";

let routes = [
    {
        path: "/",
        exact: true,
        component: asyncComponent(() => import("./components/Index"))
    }
];

const App = (props, context) => (
  <Router>
    <Route
      render={() => {
        return (
          <Switch>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        );
      }}
    />
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));
```
