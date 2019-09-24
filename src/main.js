import Vue from 'vue';
import App from './App.vue';
import login from '@/pages/login.vue'
import Router from 'vue-router';
import axios from "axios";
import vant from "vant";
import register from '@/pages/register.vue'




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
}]

let router = new Router({
    routes
})


new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    },
    router
})