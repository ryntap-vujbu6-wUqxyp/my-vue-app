<template>
    <Dialog :data="{width:'400px',height:'200px'}">
        <template v-slot:header style="height:40px">
            <div>标题</div>
        </template>
        <template v-slot>
            <div>内容</div>
        </template>
        <template v-slot:footer>
            <div>尾巴</div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from './dialog.vue';
</script>

<style lang="less" scoped></style>