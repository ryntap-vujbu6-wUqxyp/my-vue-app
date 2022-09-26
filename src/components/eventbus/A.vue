<template>
<div>A:{{isCollapse}}</div>
<button @click="changeMenu">changeMenu</button>
</template>

<script setup lang="ts">
import { 
 reactive, 
  ref ,onBeforeUnmount 
} from 'vue';
import Bus from "./bus";

import {useRouter} from 'vue-router';
const router=useRouter();

const isCollapse = ref(false);

function changeMenu() {
  isCollapse.value = !isCollapse.value;
  Bus.emit("change-menu");
  
  setTimeout(() => {
    router.push({
        path:'/eventbusB',
    });
  }, 1000);
  
}
// onBeforeUnmount(() => {
//   Bus.$off("change-menu");
// });
</script>

<style lang="less" scoped></style>