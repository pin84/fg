import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/index',
        name: 'Index',
        component: () =>
            import ('../views/index.vue')
    },


]

const router = new VueRouter({
    mode: 'hash', // "hash" (浏览器环境) | "abstract" (Node.js 环境) ｜ "history"
    base: process.env.BASE_URL,
    routes
})

export default router