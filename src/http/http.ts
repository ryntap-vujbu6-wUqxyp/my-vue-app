/**
 * @author  lyp
 * @time    2020-9-27 8:47
 * @title   http请求封装
 * desc 前后端约定接口返回解构规范
 * {
 *    code: '1',
 *    data:" 请求成功",
 *    message: ""
 * }
 */
import { Interceptor } from './interceptor';
import { message, Modal } from 'ant-design-vue';
// import qs from 'qs'
 
 export class Http {
     public axios: any;
 
 
     constructor() {
         // 获取axios实例
         this.axios = new Interceptor().getInterceptors();
     }
 
     /**
      * get请求
      * @param {String} url [请求的url地址]
      * @param {object} params [请求时携带的参数, 默认为空]
      * @param {boolean} download [判断是否是下载请求， 默认为否]
      * @param {boolean} loading [判断是否是需要loading， 默认为否]
      * @desc 由于loading不能一成不变全屏加载，很多种情况都是局部loading，所以当loading为true时，会返回整个response，以便自行处理loading。
      */
     public getData(url: string, params: object = {}, download: boolean = false, loading: boolean = false) {
         return new Promise((resolve, reject) => {
             const config: any = { params };
             if (download) {
                 config.responseType = 'blob';
             }
             config.headers={
                "authorization":'Bearer '+localStorage.getItem('accessToken')
             }
             this.axios.get(url, {
                 ...config,
             }).then((res: any) => {
                resolve(res);
                //  this.resultHandle(res, resolve, loading);
             }).catch((err: { message: any; }) => {
                 reject(err.message);
             });
         });
     }
 
     /**
      * post请求
      * get请求
      * @param {String} url [请求的url地址]
      * @param {object} data [请求时携带的参数, 默认为空]
      * @param {boolean} download [判断是否是下载请求， 默认为否]
      * @param {boolean} loading [判断是否是需要loading， 默认为否]
      * @param {object} headers [自定义头部信息， 默认为空]
      * @param {boolean} formData [formData格式， 默认为否]
      * desc 由于loading不能一成不变全屏加载，很多种情况都是局部loading，所以当loading为true时，会返回整个response，以便自行处理loading。
      */
     public postData(
         url: string,
         data: object,
         loading: boolean = false,
         headers: object = {},
         ) {
         return new Promise((resolve, reject) => {
             const config: any = {};
             let newData: any = data;
             this.axios.post(url, data = newData, {
                 ...config,
                 headers,
             }).then((res: any) => {
                 resolve(res);
                //  this.resultHandle(res, resolve, loading);
             }).catch((err: { message: any; }) => {
                 reject(err.message);
             });
         });
     }
 
     /**
      * resultHandle 根据响应code
      * @param {any} res [请求返回值]
      * @param {any} resolve [Promise.resolve]
      * @param {boolean} loading [判断是否是需要loading]
      */
     public resultHandle(
         res: any,
         resolve: { (value?: unknown): void; (value?: unknown): void; (arg0: any): void; },
         loading: boolean) {
         console.log('请求结果:', res);
         if (res.code === '1') {
             resolve(res);
         } else {
             this.errorHandle(res);
             loading && resolve(res);
         }
     }
 
     /**
      * 服务端状态处理,例如中断性异常,退出异常等等(与拦截器http握手状态注意区分,一般都能分清楚吧)
      * 1000000 为session过期响应码
      * @param {any} res [请求返回值]
      */
     public errorHandle(res: any) {
         // 统一谈服务端提示,我们提示统一由服务端提供
         // 状态码判断
         if (res.code === '1000000') {
             Modal.confirm(
               {
                     title: '你已被登出，可以取消继续留在该页面，或者重新登录',
                     okText: '重新登录',
                     cancelText: '取消',
                     onOk() {
                         // 退出登录
                       console.log('已经退出登录');
                   },
                 });
         } else {
             message.error(res.msg);
         }
     }
 }

 export default new Http();