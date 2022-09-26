<template>
<div>B:{{isCollapse}}</div>
</template>

<script setup lang="ts">
import { 
 reactive, 
  ref ,onMounted 
} from 'vue';
import Bus from "./bus";

    const isCollapse = ref(false);
    onMounted(()=>{
        console.log('========')
      Bus.on("change-menu", () => {
        isCollapse.value = !isCollapse.value;
      });
    })

    function handleOpen(key: string, keyPath: string) {
      console.log(key, keyPath);
    }

    function handleClose(key: string, keyPath: string) {
      console.log(key, keyPath);
    }

</script>

<style lang="less" scoped></style>