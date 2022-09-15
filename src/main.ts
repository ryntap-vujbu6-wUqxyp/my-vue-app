import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//pinia
import store from "./store/index";
const app = createApp(App);
app.use(store);


//vue-router
import router from './router'
app.use(router)

//antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
app.use(Antd);
import { Button, DatePicker, Layout, Menu } from "ant-design-vue";
app.use(Button);
app.use(DatePicker);


createApp(App).mount('#app')
