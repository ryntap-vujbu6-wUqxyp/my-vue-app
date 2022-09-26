import { defineStore } from 'pinia';
import { ref, reactive, computed, watch ,toRef,toRefs} from 'vue';
import { message } from 'ant-design-vue';
import { Item } from 'ant-design-vue/lib/menu';

//泛型每条限制待办事项类型
export type Item = {
    id: number,
    context: string,
    status: boolean,
    isRead:boolean
}
//每次主键自增
let id = 1;
function generate(): number {
    return id++;
}
export const useTodoStore = defineStore('todo', () => {
    let newItem = ref('');//单条待办事项
    //待办事项数组,如果直接定义一个空数组，无法直接给数组赋值会丢失响应性，需将数组作为对象的一个属性
    let Items = reactive<{list:Item[]}>({list:[]});

    watch(newItem,()=>{
        console.log('变化了======================',newItem.value);
        Items.list.forEach(item=>{
            if(item.context.indexOf(newItem.value)!=-1){
                item.context=`<span style='color:red'>${item.context}</span>`;
            }
        });
        // this.options = this.list.filter(item => {
        //     return item.label.toLowerCase()
        //       .indexOf(query.toLowerCase()) > -1;
        //   });
    })

    //增加待办事项
    function addItem() {
        //判空
        if (!newItem.value) { return message.info('请输入待办事项') };
        //判重
        let contextArr: Array<String> = [];
        Items.list.forEach((item) => { contextArr.push(item.context) });
        if (contextArr instanceof Array && contextArr.length > 0 && contextArr.indexOf(newItem.value) !== -1) {
            return message.info('请不要输入完全相同的待办事项');
        }
        //添加
        Items.list.push({ id: generate(), context: newItem.value, status: false ,isRead:false});
        //置空
        newItem.value = '';
    };

    //删除待办事项
    function deleteTodoList(item: Item) {
        let index = Items.list.indexOf(item);
        Items.list.splice(index, 1);
    };

    //修改单条待办状态
    function updateTodoList(item: Item) {
        let index = Items.list.indexOf(item);
        Items.list[index].isRead = !item.isRead;
    };

    //模糊查询待办
    function queryTodoList() { };
    
    //选中待办的条数
    const isCompleteds = computed(() => {
        const arr: Item[] = Items.list.filter(item => item.status);
        return arr.length;
    });

    //全选操作
    const allSelect =computed({
        get(){
            // if(Items.list.length>0) return Items.list.every(item=>item.status);else return false;
            return Items.list.length>0&&Items.list.every(item=>item.status);
        },
        set(value:boolean){
            Items.list.forEach(obj => obj.status = value);
        }
    });

    //清除已经完成的待办事项
    function clear () {
        if(Items.list.length>0&&Items.list.every(item=>item.status===false))return message.info('没有已完成的待办事项');
        Items.list=Items.list.filter(item=>item.status===false);
    }

    return {
        newItem,
        Items,
        allSelect,
        isCompleteds,
        addItem,
        deleteTodoList,
        updateTodoList,
        queryTodoList,
        clear,
    }
});