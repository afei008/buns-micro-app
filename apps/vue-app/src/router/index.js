import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import RootApp from '@/RootApp';

const routes = [
    {
        path: window.__MICRO_APP_BASE_ROUTE__ || '/',
        component: RootApp,
        children: [
            // 其他的路由都写到这里
            {
                path: '/',
                name: 'Home',
                component: Home,
            },
            {
                path: '/about',
                name: 'About',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ '../views/About.vue'
                    ),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
