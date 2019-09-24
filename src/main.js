import Vue from 'vue';
import App from './App.vue';
import login from '@/pages/login.vue'
import Router from 'vue-router';
import axios from "axios";
import vant from "vant";
import register from '@/pages/register.vue';
import personal from '@/pages/personal.vue';
import {Toast} from "vant"





//注册路由
Vue.use(Router)
Vue.use(vant)

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:3000";


let routes = [{
        path: '/login',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/personal',
        component: personal
    }
]

let router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    let hasToken = localStorage.getItem('token')

    if (to.path === "/personal") {
        if (hasToken) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

// axios拦截器
axios.interceptors.response.use(res => {
    const {
        message,
        statusCode
    } = res.data;

    if (statusCode === 401) {
        Toast.fail(message);
    }

    // token过期了，或者token无效，一般引起的原因可能token被清空，密码修改了
    if (message === "用户信息验证失败") {
        // 跳转到登录
        router.push('/login')
    }
    // 必须要返回res
    return res;
})


new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    },
    router
})