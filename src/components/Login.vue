<template>
  <div class="login-container">
    <div class="login-box">
      <Button type="primary" @click="btnClick">{{global.token}}</Button>
      <DatePicker />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button,DatePicker } from 'ant-design-vue';
import { ref, reactive } from 'vue';
import { GlobalStore } from '../store/index';
import { defineComponent,watch,computed,toRefs} from "vue";
import {useRouter} from 'vue-router';
const global = GlobalStore();
const props=defineProps<{ 
  msg: string,
  title:string,
}>();
function btnClick(){
  console.log(props.title,global.token);
}
const count = ref(0);

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
  background-color: aliceblue;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
  