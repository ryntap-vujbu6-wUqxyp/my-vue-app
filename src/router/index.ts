import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Login = () => import("../components/Login.vue");

const routes: Array<RouteRecordRaw> = [
  {
   path: "/",
   name: "index",
   meta: {
    title: "首页",
   },
   component: Login,
  },
  {
   path: "/Login",
   name: "Login",
   meta: {
    title: "Login",
   },
   component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;