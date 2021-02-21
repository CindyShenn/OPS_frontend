import { createRouter, createWebHistory } from 'vue-router'
import Login from './login/Login.vue'
import LoginByCode from './login/LoginByCode.vue'
import Register from './login/Register.vue'
import UserCenter from './user/UserCenter.vue'

const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path:'/login',
            component: Login,
        },
        {
            path:'/login_by_code',
            component: LoginByCode,
        },
        {
            path:'/register',
            component: Register,
        },
        {
            path:'/user_center',
            component: UserCenter,
        },
    ]
})

export default router