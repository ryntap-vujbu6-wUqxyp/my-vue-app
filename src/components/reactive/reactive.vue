<template>
    <h2>{{count}}</h2>
    <hr>
    <button @click="update">更新</button>

    <hr style="margin-top:200px;">
    <h2>name: {{state.name}}</h2>
    <h2>age: {{state.age}}</h2>
    <h2>wife: {{state.wife}}</h2>
    <button @click="update1">更新</button>
</template>

<script lang="ts">
import {
    ref, reactive,defineComponent
} from 'vue'
export default defineComponent({
    name: 'child',
    props: ['msg'],
    emits: ['fn'],
    /* 使用vue3的composition API */
    setup(props,{attrs, emit, slots}) {
        console.log('setup', this);
        console.log(props.msg);
        console.log(props.msg, attrs.msg2, slots, emit)

        // 定义响应式数据 ref对象
        const count = ref(1)
        // 更新响应式数据的函数
        function update() {
            count.value+=1;
            emit('fn', '++')
        }

        const state = reactive({
            name: 'tom',
            age: 25,
            wife: {
                name: 'marry',
                age: 22
            },
        })

        const update1 = () => {
            state.name += '--';
            state.age += 1;
            state.wife.name += '++';
            state.wife.age += 2;
        }


        return {
            count,
            update,
            state,
            update1
        }
    }
})
</script>
  