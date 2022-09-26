<template>
<div>
  {{data}}
</div>
</template>

<script setup lang="ts">
import {getCurrentInstance,onMounted,ref} from 'vue';
const instance =getCurrentInstance();
const data=ref('');
onMounted(()=>{
  //调用mian.ts内挂载的全局函数
  data.value=instance?.appContext.config.globalProperties.$filters.format('');
});
</script>

<style lang="less" scoped></style>