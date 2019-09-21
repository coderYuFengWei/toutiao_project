import Vue from 'vue';
import App from './App.vue';
import login from './pages/login.vue'
import Router from 'vue-router';


//注册路由
Vue.use(Router)

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