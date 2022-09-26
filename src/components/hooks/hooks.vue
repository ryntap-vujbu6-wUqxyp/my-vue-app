<template>
    <div>
      <h2>x: {{x}}, y: {{y}}</h2>
    </div>
    </template>
    
    <script>
    
    import {
      ref,onBeforeMount
    } from "vue"
    /* 
    在组件中引入并使用自定义hook
    自定义hook的作用类似于vue2中的mixin技术
    自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂

    hooks:复用不同于全局函数调用的区别在于hooks复用会执行hooks中的生命周期函数，实现解耦合复用
    */
    import useMousePosition from './useMousePosition'
    
    export default {
      setup() {
        onBeforeMount(()=>{
          console.log('1=========');
        });

        const {x, y} = useMousePosition()
        return {
          x,
          y,
        }
      }
    }
    </script>
    