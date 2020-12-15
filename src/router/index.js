import Vue from "vue";
import VueRouter from "vue-router";
import User from "../views/User";

Vue.use(VueRouter);

const routes = [
    {
        path: "/edit-user/:id",
        name: "user.edit",
        component: User,
        props: true
    },
    {
        path: "/create-user",
        name: "user.create",
        component: User,
        props: true
    }
];

export default new VueRouter({
    mode: "history",
    routes
});