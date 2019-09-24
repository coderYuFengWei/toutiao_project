import Vue from 'vue';
import App from './App.vue';
import login from '@/pages/login.vue'
import Router from 'vue-router';
import axios from "axios";
import vant from "vant";



//注册路由
Vue.use(Router)
Vue.use(vant)

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:3000";


let routes = [{
    path: '/login',
    component: login
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