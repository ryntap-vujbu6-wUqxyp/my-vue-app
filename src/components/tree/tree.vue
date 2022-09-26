<template>
    <myTree :data="data" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import myTree from './index.vue'
import {TreeList} from '../../utils/type';

const data = reactive<TreeList[]>([
    {
        name: "no.1",
        status: false,
        children: [
            {
                name: "no.1-1",
                status: false,
                children: [
                    {
                        name: "no.1-1-1",
                        status: false,

                        children: [
                            {
                                name: "no.1-1-1-1",
                                status: false,
                            },
                        ],

                    },
                ],
            },
        ],
    },
    {
        name: "no.2",
        status: false,
        children: [
            {
                name: "no.2-1",
                status: false,
            },
        ],
    },
    {
        name: "no.3",
        status: false,
    },
]);

</script>

<style lang="less" scoped>

</style>