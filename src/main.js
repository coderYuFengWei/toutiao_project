import Vue from 'vue';
import App from './App.vue';
import login from '@/pages/login.vue'
import Router from 'vue-router';
import axios from "axios";
import vant from "vant";
import register from '@/pages/register.vue';
import personal from '@/pages/personal.vue';
import {Toast} from "vant"
import editProfile from '@/pages/editProfile.vue';
import myFollow from '@/pages/myFollow.vue';
import myComments from '@/pages/myComments.vue';
import index from '@/pages/index.vue';
import postDetail from '@/pages/postDetail.vue';
import comments from '@/pages/comments.vue';
import search from '@/pages/search.vue';





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
    },
    {
        path: '/edit_profile',
        component: editProfile
    },
    {
        path: '/my_follow',
        component: myFollow
    },
    {
        path: '/my_comments',
        component: myComments
    },
    {
        path: '/',
        component: index
    },
    {
        path: '/postDetail/:id',
        component: postDetail
    },
    {
        path: '/post_comments/:id',
        component: comments
    },
    {
        path: '/search',
        component: search
    },
]

let router = new Router({
    routes
})

//路由卫士
router.beforeEach((to, from, next) => {
    let hasToken = localStorage.getItem('token')

    if (to.path === "/personal" || to.path === "/edit_profile" || to.path==="/my_follow") {
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