

const routes = [
    {
        path: '/',
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [
            {
                path: '',
                component: resolve => require(['../components/Home/Home.vue'], resolve),
            },
            {
                path: '/users',
                component: resolve => require(['../components/Home/Users.vue'], resolve),
            },
            {
                path: '/user-detail/:id',
                component: resolve => require(['../components/Home/UserDetail.vue'], resolve),
            },
        ]
    },
]

export default routes
