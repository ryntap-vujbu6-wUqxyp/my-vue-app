import { defineStore } from 'pinia';
import { ref, reactive, computed, watch} from 'vue';
import { message } from 'ant-design-vue';
import http from '../http/http'
// import { Item } from 'ant-design-vue/lib/menu';

//泛型每条限制待办事项类型
export type Item = {
    _id: number,
    todoListName: string,
    isFinished: boolean,
    isRead:boolean,
    showDelBut?:boolean
}
//每次主键自增
let _id = 1;
function generate(): number {
    return _id++;
}

const NodeBaseUrl='http://127.0.0.1:3008';//本机node后台的地址


export const useTodoStore = defineStore('todo', () => {
    let newItem = ref('');//单条待办事项
    //待办事项数组,如果直接定义一个空数组，无法直接给数组赋值会丢失响应性，需将数组作为对象的一个属性
    let Items = reactive<{list:Item[]}>({list:[]});

    watch(newItem,()=>{
        Items.list.forEach(item=>{
            if(item.todoListName){
                //清除上次的搜索span
                var reg1 = new RegExp('</?span.*?>', 'gi');
                item.todoListName = item.todoListName.replace(reg1, '');

                //为搜索内容添加高亮
                if(newItem.value){
                    let replaceReg = new RegExp(newItem.value,'g');
                    let replaceString = '<span style="color:#FFF;background:red">' + newItem.value + '</span>';
                    item.todoListName = item.todoListName.replace(replaceReg, replaceString);
                }
            }
        });
    })

    //增加待办事项
    function addItem() {
        //判空
        if (!newItem.value) { return message.info('请输入待办事项') };
        //判重
        // let contextArr: Array<String> = [];
        // Items.list.forEach((item) => { contextArr.push(item.todoListName) });
        // console.log('======',contextArr,newItem.value);
        // if (contextArr.length > 0 && contextArr.indexOf(newItem.value) !== -1) {
        //     return message.info('请不要输入完全相同的待办事项');
        // }
        //添加
        const url = NodeBaseUrl + '/api/addTodoListItem';
        const data={
            todoListName: newItem.value,
            isFinished:0
        }
        http.postData(url, data, true, {}).then((res: any) => {
            message.info('新增成功');
            queryTodoList();
        }).catch((err: any) => {});





        //置空
        newItem.value = '';
    };

    //删除待办事项
    function deleteTodoList(item: Item) {
        const url = NodeBaseUrl + '/api/deleteTodoList';
        const data={
            id:item._id
        }
        http.postData(url, data, true, {}).then((res: any) => {
            message.info('删除成功');
            queryTodoList();
        }).catch((err: any) => {});
    };

    function modifyStatus(item:Item){
        Items.list.forEach(item=>{
            item.isRead=false;
        });
        let index = Items.list.indexOf(item);
        Items.list[index].isRead = !item.isRead;
    }

    //修改单条待办状态
    function updateTodoList(item: Item,type:boolean) {
        newItem.value='';
        let data={
            id:item._id,
            todoListName: item.todoListName,
            isFinished:item.isFinished
        }
        const url = NodeBaseUrl + '/api/updateTodoListItem';
        http.postData(url, data, true, {}).then((res: any) => {
            message.info('修改成功');
            queryTodoList();
        }).catch((err: any) => {
            queryTodoList();
        });
        
    };
    
    //选中待办的条数
    const isCompleteds = computed(() => {
        const arr: Item[] = Items.list.filter(item => item.isFinished);
        return arr.length;
    });

    //全选操作
    const allSelect =computed({
        get(){
            return Items.list.length>0&&Items.list.every(item=>item.isFinished);
        },
        set(value:boolean){
            console.log('value=========',value);
            const url = NodeBaseUrl + '/api/selectAllItem';
            http.postData(url, {status:value}, true, {}).then((res: any) => {
                // message.info('全选成功');
                queryTodoList();
            }).catch((err: any) => {
                queryTodoList();
            });
        }
    });

    //清除已经完成的待办事项
    function clear () {
        if(Items.list.length>0&&Items.list.every(item=>item.isFinished===false))return message.info('没有已完成的待办事项');
        const url = NodeBaseUrl + '/api/deleteTodoList';
        http.postData(url, {}, true, {}).then((res: any) => {
            message.info('删除已完成事项成功');
            queryTodoList();
        }).catch((err: any) => {});
    }

    //从node初始化获取所有列表的数据
    function queryTodoList(){
        const url = NodeBaseUrl + '/api/queryTodoList';
        http.getData(url, {}).then((res: any) => {
            Items.list=res.data;
            Items.list.forEach(item=>{
                item._id=item._id;
                item.isRead=false;
                item.showDelBut=false;
            })
        }).catch((err: any) => { })
    }

    //调接口改变待办事项的状态
    const changeStatus=(item:Item)=>{
        let data={
            id:item._id,
            todoListName: item.todoListName,
            isFinished:item.isFinished
        }
        const url = NodeBaseUrl + '/api/updateTodoListItem';
        http.postData(url, data, true, {}).then((res: any) => {
            message.info('修改成功');
            queryTodoList();
        }).catch((err: any) => {
            queryTodoList();
        });
    }

    return {
        newItem,
        Items,
        allSelect,
        isCompleteds,
        addItem,
        deleteTodoList,
        updateTodoList,
        clear,
        queryTodoList,
        modifyStatus,
        changeStatus
    }
});