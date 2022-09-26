<template>
  <div class="login-container">
    <div class="login-box">
      <transition 
        enter-active-class="animate__animated  animate__swing"
        leave-active-class="animate__animated  animate__backOutLeft"
      >
        <Button type="primary" @click="GotoList" v-if="global.token!=='empty'">待办</Button>
        <Button type="primary" @click="setToken" v-else>登录</Button>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, message } from 'ant-design-vue';
import { ref, reactive} from 'vue';
import { GlobalStore } from '../store/index';
import { defineComponent,watch,computed,toRefs} from "vue";
import {useRouter} from 'vue-router';
const global = GlobalStore();
const router=useRouter();
// const props=defineProps<{ 
//   msg: string,
//   title:string,
// }>();
//去待办页面
function GotoList(){
  if(global.token==='empty'){
    return message.info("token已经失效,请登录");
  }
  router.push({
    path:'/TodoList',
    query:{
      msg:'登录成功'
    }
  })
}
//登录 设置token
function setToken(){
  global.setToken('token');
}
</script>
  
<style scoped>
.login-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.login-box {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
  