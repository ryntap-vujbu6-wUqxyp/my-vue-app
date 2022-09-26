<template>
    <div style="margin-left:10px;" class="tree">
        <div :key="index" v-for="(item,index) in data">
            <div @click='clickItem(item)'>{{item.name}}</div>
            <TreeItem @on-click='clickItem' v-if='item?.children?.length' :data="item.children" v-show="item.status"></TreeItem>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "TreeItem"
}
</script>
<script setup lang="ts">
import {
    reactive,
    ref
} from 'vue';
import {TreeList} from '../../utils/type';

type Props<T> = {
    data?: T[] | [];
};

const props=defineProps<Props<TreeList>>();


const clickItem = (item: TreeList): void => {
    console.log(item)
    item.children&&(item.status=!item.status);
}

</script>

<style lang="less" scoped>
.tree{
    text-align: left;
    cursor: pointer;
}
</style>