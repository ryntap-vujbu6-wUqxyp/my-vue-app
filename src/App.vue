
<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'

//入门ref、reactive
import reactive from './components/reactive/reactive.vue'

//父子组件传值
import Parents from './components/parent/parents.vue'

//计算属性和watch
import Computed from './components/computed/computed.vue'

//生命周期
import LifeParents from './components/lifeCycle/parents.vue'

//hooks 类似vue2的混入,利用hook代码复用
import Hooks from './components/hooks/hooks.vue';
//利用hook和泛型，强化类型检查
import Hooks2 from './components/hooks2/hooks2.vue';

//将reactive的响应式数据全部变成响应式的ref数据
import ToRefs from './components/toRefs/toRefs.vue';

//将reactive的响应式数据其中一个对象变成响应式的ref数据
import ToRef from './components/toRef/toRef.vue';

//浅响应式
import ShallowReactiveAndShallowRef from './components/shallowReactiveAndShallowRef/shallowReactiveAndShallowRef.vue'

//Teleport(瞬移)
import Test from './components/Teleport/test.vue'

//todolist案例
import TodoList from './components/TodoList/TodoList.vue'

//slot弹窗案例
import Dialog from './components/dialog/dialog.vue';
</script>

<template>
  <!-- <Login msg="Vite + Vue3 + Ts + pinia + vuerouter + antd" title="title"/> -->
  <!-- <reactive/> -->
  <!-- <Parents/> -->
  <!-- <computed/> -->
  <!-- <LifeParents/> -->
  <!-- <Hooks/> -->
  <!-- <Hooks2/> -->
  <!-- <ToRefs/> -->
  <!-- <ToRef/> -->
  <!-- <ShallowReactiveAndShallowRef/> -->
  <!-- <Test/> -->
  <!-- <TodoList/> -->
  <router-view></router-view> 
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
