import asyncComponent from '../../components/AsyncComponent'

module.exports = [
    { 
        path: '/my',
        component: asyncComponent(() => import('./components/Index'))
    },
]
