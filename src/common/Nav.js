import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

import * as actions from '../redux/actions/index'

const pages = [
	{
		path: '/',
		name: 'Index'
	},
	{
		path: '/my',
		name: 'My'
	}
]

class Nav extends React.Component {
	constructor() {
		super()
	}

	handleClick = (e) => {
		//...
		this.props.dispatch(actions.changeLocation(location.pathname))

	}

	componentWillMount() {
		console.log("Willdispatch:", location.pathname)
		this.props.dispatch(actions.changeLocation(location.pathname))
	}

	render() {
		console.log("render------", this.props.location)

		let selectedKey = []
		pages.forEach((v, k) => {
			if (location.pathname === v.path) {
				selectedKey.push(k.toString())
			}
		})
		let Items = pages.map((v, k) => {
			return <Menu.Item key={k}><Link to={v.path}>{v.name}</Link></Menu.Item>
		})
		return (
			<Menu
				onClick={this.handleClick}
				style={{ width: 256 }}
				defaultSelectedKeys={selectedKey}
				defaultOpenKeys={['sub1']}
				mode="inline"
				className="nav"
				theme="dark"
			>
				<SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
					{Items}
				</SubMenu>
			</Menu>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		reduxState: state,
		location: state.location
	}
}


const ConnectedNav = connect(mapStateToProps)(Nav)

export default ConnectedNav