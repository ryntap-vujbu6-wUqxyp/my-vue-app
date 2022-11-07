<template>
  <div class="login-container">
    <!-- <Button type="primary" @click="LoginEwelink">登录</Button>
      <Button type="primary" @click="getDevices">获取设备</Button>
      <Button type="primary" @click="getConnectInfo">获取连接信息</Button>
      <Button type="primary" @click="getConnection">建立常连接</Button>
      <div class="device-box">
        <span>灯104</span>
        <Switch checked-children="开" un-checked-children="关" v-model:checked="status" @change="handlerDevices"/>
      </div> -->
      <!-- <div class="device-box">
        <span>{{name}}2</span>
        <Switch checked-children="开" un-checked-children="关" v-model:checked="status" @change="handlerDevices"/>
      </div> -->

      <!-- <a-table :dataSource="dataSource.list" :columns="columns" style="width:600px"/> -->
    <div class="login-box" >

      <!-- <transition enter-active-class="animate__animated  animate__swing"
        leave-active-class="animate__animated  animate__backOutLeft">
      <Button type="primary" @click="GotoList" v-if="global.token!=='empty'">待办</Button>
        <Button type="primary" @click="setToken" v-else>登录</Button>
      </transition> -->

      <!-- <Button type="primary" @click="LoginEwelink">登录</Button>
      <Button type="primary" @click="getDevices">获取设备</Button>
      <Button type="primary" @click="getConnectInfo">获取连接信息</Button>
      <Button type="primary" @click="getConnection">建立常连接</Button>
      <Switch checked-children="开" un-checked-children="关" v-model:checked="status" @change="handlerDevices"/> -->

      <p style="margin:10px;text-align: center;font-weight: 600;">登录</p>
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" style="margin-top:50px">
        <a-form-item label="用户名：">
          <a-input v-model:value="formState.userName" />
        </a-form-item>
        <a-form-item label="密码：" >
          <a-input v-model:value="formState.password" />
        </a-form-item>
      </a-form>
       <a-button type="primary" block @click="onSubmit" style="width:85%;margin-top:10px">Login</a-button>

      
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, message,Switch } from 'ant-design-vue';
import { ref, reactive } from 'vue';
import { GlobalStore } from '../store/index';
import { defineComponent, watch, computed, toRefs, onMounted } from "vue";
import { useRouter } from 'vue-router';
import axios from 'axios'
import http from '../http/http'
const global = GlobalStore();
const router = useRouter();
let status=ref(true);

const wrapperCol={ span: 16 };
const labelCol={ span: 6 };
const formState=reactive({userName:'',password:''});

//请求基准地址
const baseUrl = 'http://127.0.0.1:3000';
let port: string = ''; //	长连接服务器外网端口
let domain: string = '';//长连接服务器域名
let IP: string = '';    //长连接服务器外网 IP
//拼接 wss 地址：wss:// {domain 或 IP}:{port}/api/ws
let wss: string = '1';
let appId: string = '2';
let at: string = '';
let apikey: string = '';
let webSocket: any

const dataSource=reactive<{list:[]}>({list:[]});
const columns=[
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
]

// const props=defineProps<{ 
//   msg: string,
//   title:string,
// }>();
//去待办页面

onMounted(() => {
  // getConnection();
  let websocket = new WebSocket(wss)
})


function GotoList() {
  if (global.token === 'empty') {
    return message.info("token已经失效,请登录");
  }
  router.push({
    path: '/TodoList',
    query: {
      msg: '登录成功'
    }
  })
}
//登录 设置token
function setToken() {
  global.setToken('token');
}

//登录
const LoginEwelink = () => {
  const config = {
    'Authorization': '',
    'X-CK-Appid': '',
  };
  const baseUrl2 = 'http://192.168.2.105:3000';
  const url = baseUrl + '/v2/user/login';
  const data = {
    "countryCode": "+86",
    "password": "",
    "phoneNumber": ""
  }
  http.postData(url, data, true, config).then((res: any) => {
    console.log(res);
    localStorage.setItem('accessToken', res.data.at);
    const token = localStorage.getItem('accessToken');
    apikey = res.data.user.apikey;
    at = res.data.at;
    console.log('apikey================at', apikey, at);
  }).catch((err: any) => {

  })
}


const name=ref('');
//获取设备
const getDevices = () => {
  let url = baseUrl + "/v2/device/thing"
  const data = {};
  http.getData(url, data).then((res: any) => {
    let thingList = res.data.thingList;//设备列表
    console.log(thingList);
    status.value=thingList[0].itemData.params.switch!=='off';
     name.value=thingList[0].itemData.name;
  }).catch((err: any) => { })
}

//获取进行长连接时服务器分配的ip等信息
const getConnectInfo = () => {
  let url = baseUrl + "/dispatch/app";
  let data = {};
  http.getData(url, data).then((res: any) => {
    console.log(res);
    port = res.port;
    domain = res.domain;
    IP = res.IP;
    console.log(port, domain, IP);
    // wss = 'wss://' + IP + ':'+port+'/api/ws';
    wss = 'wss://' + domain + ':' + port + '/api/ws';
  }).catch((err: any) => { })
}

const getConnection = () => {
  // console.log(wss, 'wss');
  webSocket = new WebSocket(wss);
  //建立连接
  webSocket.onopen = function () {
    console.log('通讯开始')

    let submitCode = JSON.stringify({
      action: 'userOnline',
      at: at,
      apikey: apikey,
      appid: appId,
      nonce: '2plz69ax',
      ts: 1571141259,
      userAgent: 'app',
      sequence: (new Date().getTime()),
      version: 8
    });
    webSocket.send(submitCode);

    // 发送心跳防止ws协议自动断联
    setInterval(() => {
      webSocket.send(submitCode);
    }, 1000 * 10)
  }
  //接收服务端消息
  webSocket.onmessage = function (e: any) {
    console.log('收到的数据：', JSON.parse(e.data))
    // 如果数据对象为字符串，可转换为对象格式
    let data = JSON.parse(e.data)
    if(data.action){
      status.value=data.params.switch==='on';
    }
    // console.log(data)
  }
  webSocket.onerror = function () {
    console.log('通讯异常')
  }
  webSocket.close = function () {
    console.log('连接已断开')
  }
}

const handlerDevices = () => {
  let params = {
    "action": "update",
    "apikey": apikey+"",
    "deviceid": "1000a2fcd4",
    "params": {
      "switch":status.value?"on":'off',
    },
    "sequence": (new Date().getTime())+"",
    "userAgent": "app"
  }
  webSocket.send(JSON.stringify(params));
  console.log('===============');
}

const NodeBaseUrl='http://127.0.0.1:3008';//本机node后台的地址
//登录功能
const onSubmit=()=>{
  const url = NodeBaseUrl + '/api/login';
  const {userName,password}=formState;
  let data={
    userName:userName,
    password:password,
  };
  http.postData(url,data, true, {}).then((res: any) => {
      message.info('登录成功');
      router.push({path: '/TodoList'});
  }).catch((err: any) => {
  });
}

</script>
  
<style scoped>
.login-container {
  height: 100vh;
  /* height: 2000px; */
  overflow: hidden;
  position: relative;
  /* background: url('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg') no-repeat;
  background-size: 100% 130%; */
}

.login-box {
  width: 300px;
  height: 300px;
  border:1px solid #ccc;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.device-box{
  width:200px;
  height:200px;
  border-radius: 10px;
  border:1px solid #ccc;
  margin:10px auto;
  padding:15px;
  display: flex;
  justify-content: space-between;
}
</style>
  