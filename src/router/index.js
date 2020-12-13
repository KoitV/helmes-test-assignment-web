import Vue from "vue";
import VueRouter from "vue-router";
import User from "../views/User";

Vue.use(VueRouter);

const routes = [
    {
        path: '/edit-user/:id',
        component: User,
        props: route => ({id: Number.parseInt(route.params.id)})
    },
    {
        path: '/create-user',
        component: User,
        props: route => ({id: Number.parseInt(route.params.id)})
    }
];

export default new VueRouter({
    mode: 'history',
    routes
});