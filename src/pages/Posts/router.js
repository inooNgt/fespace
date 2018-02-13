import asyncComponent from '../../components/AsyncComponent'

module.exports = [
    { 
        path: '/posts',
        component: asyncComponent(() => import('./components/Index'))
    },
]
