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

//animate.css
import 'animate.css'
import 'animate.css/animate.compat.css'

//挂载自定义的全局函数替换过滤器
type Filter = {
  //T：参数的泛型约束
    format: <T extends any>(str: T) => T
}
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $filters: Filter
    }
}
app.config.globalProperties.$filters = {
  format<T extends any>(str: T): string {
    return '通过挂载在全局函数实现过滤器';
  }
}


app.use(router).mount('#app')
