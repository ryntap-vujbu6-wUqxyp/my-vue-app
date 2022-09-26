<template>
    <div>
        <div class="mask"/>
        <div class="dislog" @click="btnclick" :style="{'width':props.data.width,'height':props.data.height}">
            <slot name="header"></slot>
            <slot></slot>
            <slot name="footer"></slot>
        </div>
    </div>  
</template>

<script setup lang="ts">
const props=defineProps<{
    data:{
        width:string,
        height:string
    }
}>()
const btnclick=()=>{
    console.log('===========')
}
</script>

<style lang="less" scoped>
.mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 1000;
}
.dislog{
    position: absolute;
    width:400px;
    height: 400px;
    background-color: #FFF;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 1001;
    border-radius: 15px;
}

</style>