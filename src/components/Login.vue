<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { ref } from 'vue'
import {GlobalStore} from '../store/index'
const global = GlobalStore();
defineProps<{ msg: string }>();
const count = ref(0);
// btnClick(){
//     console.log('123')
// }
</script>

<template>
  <div class="login-container">
    <div class="login-box">
        <Button type="primary" @click="btnClick">{{global.token}}</Button>
        <DatePicker/>
    </div>
  </div>
</template>

<style scoped>
.login-container{
    height: 100vh;
    overflow: hidden;
    position: relative;
}
.login-box{
    width: 300px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
