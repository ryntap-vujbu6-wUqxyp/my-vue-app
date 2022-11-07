import { createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {defineAsyncComponent} from "vue";
import { GlobalStore } from '../store/index'
import {message} from 'ant-design-vue'

const Login = () => import("../components/Login.vue");
const TodoList = () => import("../components/TodoList/TodoList.vue");
const Tree = () => import("../components/tree/tree.vue");

const Dialog = defineAsyncComponent(() => import('../components/Dialog/index.vue'))

const Directive = defineAsyncComponent(() => import('../components/directive/directive.vue'))

const eventbusA = () => import('../components/eventbus/A.vue');

const eventbusB =() => import('../components/eventbus/B.vue');

const Globle =() => import('../components/globalProperties/globalProperties.vue');

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
    // title: "登录页面",
    transition:"animate__fadeInUp",
   },
   component: Login,
  },
  {
    path: "/TodoList",
    name: "TodoList",
    meta: {
     title: "TodoList",
    },
    component: TodoList,
   },
   {
    path: "/Tree",
    name: "Tree",
    meta: {
     title: "Tree",
    },
    component: Tree,
   },
   {
    path: "/Dialog",
    name: "Dialog",
    meta: {
     title: "Dialog",
    },
    component: Dialog,
   },
   {
    path: "/Directive",
    name: "Directive",
    meta: {
     title: "Directive",
    },
    component: Directive,
   },
   {
    path: "/eventbusA",
    name: "eventbusA",
    meta: {
     title: "eventbusA",
    },
    component: eventbusA,
   },
   {
    path: "/eventbusB",
    name: "eventbusB",
    meta: {
     title: "eventbusB",
    },
    component: eventbusB,
   },
   {
    path: "/Globle",
    name: "Globle",
    meta: {
     title: "Globle",
    },
    component: Globle,
   },
];

const router = createRouter({
  history: createWebHistory(),
  //滚动条滚动 可以让页面在顶部也可以滚动在指定位置
  // scrollBehavior: (to, from, savePosition) => {
  //   console.log(to, '==============>', savePosition);
  //   return new Promise((r) => {
  //     setTimeout(() => {
  //       r({
  //         top: 10000
  //       })
  //     }, 2000);
  //   })
  // },
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path == '/Login') {
    return next();
  } else {
    // if (GlobalStore().token==='empty') {
    //   message.info("没有token,自动跳转登录页")
    //   return next('/Login');
    // }
    next();
  }
})

export default router;