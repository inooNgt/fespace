import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Nav from '../common/Nav'

import 'antd/dist/antd.css';
import '../scss/main.scss';

/**
 * react router 
 */
const routes = [
	...require('./Index/router'),
	...require('./My/router')
]


export default class App extends Component {
	constructor(props) {
		super(props)

	}

	render() {
		return (
			<Router>
				<div>
					<Nav />
					<div className="content-inner">
						{renderRoutes(routes)}
					</div>
				</div>
			</Router>
		)
	}
}

