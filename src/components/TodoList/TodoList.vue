<template>
    <div>状态:{{globalStore.token==='empty'?'离线':'在线'}}</div>
        <div class="mid-box">
            <header>
                <Input 
                    placeholder="请输入待办事项" 
                    v-model:value="TodoStore.newItem"
                    :allowClear="false"
                    @keyup.enter="addTodoList"
                />
                <Button 
                    type="primary" 
                    shape="round" 
                    @click="addTodoList"
                >增加</Button>
            </header>

            <div class="main-content">
                <ul v-for="item,index in TodoStore.Items.list" :key="item.id">
                    <li v-if="!item.isRead" @dblclick="changeReadonlyStatus(item)" @mouseenter="mouseEnter(item)">
                        <Checkbox v-model:checked="item.status" >
                        {{'待办'+(index+1)+'：'}}<span v-html="item.context"></span>
                        </Checkbox>
                        <i class="deelte-icon" @click="deleteTodoList(item)">×</i>
                    </li>
                    <Input v-model:value="(item.context as any)" v-if="item.isRead" @keyup.enter="changeReadonlyStatus(item)"/>
                </ul>
            </div>
            
            <footer class="footer">
                <span class="finish-font">
                    已完成{{TodoStore.isCompleteds}}/{{TodoStore.Items.list.length}}个任务
                </span>
                <div class="selectall-btn">
                    <Checkbox v-model:checked="TodoStore.allSelect">全选</Checkbox>
                </div>
                <Button 
                    @click="clearTodoList"
                >删除已完成</Button>
            </footer>
        </div>
</template>

<script lang="ts" setup>
import {ref, reactive,onMounted} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useTodoStore,Item } from '../../store/pinia';
import {Button,Input,message,Checkbox } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { GlobalStore } from '../../store/index';

const TodoStore=useTodoStore();
const globalStore=GlobalStore();
const router = useRouter(); 
const route=useRoute();
let tokenTimer:any;


onMounted(()=>{
    setClearToken();
});

//设置token定时清除定时器 10s没有操作将清除token 并且跳转登录页
const setClearToken=()=>{
    tokenTimer=setInterval(() => {
        globalStore.setToken('empty');
    }, 1000*10);
}

//判断有无token,token失效则推送登陆页面
function existToken():boolean{
    clearInterval(tokenTimer);
    if(globalStore.token==='empty'){
        message.info("登录已过期，请重新登录");
        router.push({path:"/Login"})
        return false
    }else{
        setClearToken();
        return true;
    }
}


//增加待办
const addTodoList=()=>{ 
    if(!existToken())return;
    TodoStore.addItem();
}

//删除待办
const deleteTodoList=(item:Item)=>{
    if(!existToken())return;
    TodoStore.deleteTodoList(item);
}

//修改待办记录
const changeReadonlyStatus=(item:Item)=>{
    if(!existToken())return;
    TodoStore.updateTodoList(item);
};

//模糊查询待办
const queryTodoList=()=>{};

//清除已完成
const clearTodoList=()=>{
    if(!existToken())return;
    TodoStore.clear();
};

const mouseEnter=(item:Item)=>{
    // console.log('========',item);
}

</script>
<style>
.mid-box{
    width: 400px;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin:auto;
    background-color: aliceblue;
    border-radius: 10px;
    box-shadow: 10px 10px 10px #ccc;
    padding: 20px;
    padding-bottom: 10px;
}
.main-content{
    height: 285px;
    overflow: auto;
    margin-bottom: 10px;
}
ul{
    margin-bottom: 0;
    padding-left: 0;
    margin: 0;
}
ul li{
    list-style: none;
    text-align: left;
    height: 40px;
    align-items: center;
    font-size: 18px;
    padding: 3px 3px 3px 10px;
    display: inline-block;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
}
ul li:hover{
    background-color: rgba(233, 233, 245, 0.749);
}
.footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 12px;
}
.bottom-btn{
    margin-top: 10px;
}
/* 滚动条样式修改 */
.main-content::-webkit-scrollbar {
  width: 4px;
}
.main-content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  opacity: 0.2;
  background: fade(blue, 60%);
}
.main-content::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: fade(blue, 30%);
}
.ant-input-affix-wrapper{
    width: 80%;
}
.deelte-icon{
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 22px;
    background-color: #FFF;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
}
.selectall-btn{
    width: 70px;
    border: 1px solid #ccc;
    padding: 4px;
    border-radius: 10px;
}

/* 过渡动画  transtion上 name="fade*/
/* //开始过度 */
.fade-enter-from{
   background:red;
   width:0px;
   height:0px;
   transform:rotate(360deg)
}
/* //开始过度了 */
.fade-enter-active{
  transition: all 2.5s linear;
}
/* //过度完成 */
.fade-enter-to{
   background:yellow;
   width:200px;
   height:200px;
}
/* //离开的过度 */
.fade-leave-from{
  width:200px;
  height:200px;
  transform:rotate(360deg)
}
/* //离开中过度 */
.fade-leave-active{
  transition: all 1s linear;
}
/* //离开完成 */
.fade-leave-to{
  width:0px;
   height:0px;
}
</style>
  