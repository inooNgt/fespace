import asyncComponent from '../../components/AsyncComponent'

module.exports = [
    { 
		path: '/',
		exact: true,
        component: asyncComponent(() => import('./components/Index'))
    },
]
