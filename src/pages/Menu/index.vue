
<script setup>
// import vue api

// import my

// import ui
import { createFromIconfontCN, EditTwoTone, DeleteTwoTone } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
// import api
import { GET_LIST, GET_DETAIL, GET_TREE, POST_MENU, PUT_MENU, DELETE_MENU } from "@a/menu"
// import other
import Utils from "@u/Utils";
import config from "./config"
import icons from "@/assets/js/dict"
//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
    name: 'Menu',
})

// vue api

// my config
const { columns } = config()
const IconFont = createFromIconfontCN({
    scriptUrl: import.meta.env.VITE_ALICDN_URL
});
// refs
const MyForm = ref(null)


const state = reactive({
    //  表单是否展示
    show: false,
    //  业务提交类型
    dataType: true,
})
const data = reactive({
    //  table数据源
    list: [],
    methods: {

        async list() {
            const res = await GET_LIST()
            if (res && res.code == 200) {
                data.list = res.data
            }
        }
    },
    created() {
        data.methods.list()
    }
})
const form = reactive({
    //  新增业务模型
    add: {
        parentId: 0,
        name: '',
        component: '',
        path: '',
        sort: '',
        meta: {
            auth: null,
            menu: {
                title: '',
                icon: null
            }
        }
    },
    //  编辑业务模型
    edit: {},
    methods: {
        //  返回对应按钮状态下的数据结构,让表单动态绑定不同数据模式
        model() {
            return state.dataType ? form.add : form.edit
        },
        //  新增: 打开表单,设置提交类型为新增
        add() {
            state.show = true
            state.dataType = true
        },
        async del(id) {
            const res = await DELETE_MENU(id)
            if (res && res.code == 200) {
                message.success(res.message);
                data.methods.list()
            } else {
                message.warning(res.message);
            }
        },
        async edit(id) {
            const res = await GET_DETAIL(id)
            if (res && res.code == 200) {
                form.edit = Utils.objectData(res.data, form.add)
                form.edit['id'] = id
                state.show = true
                state.dataType = false
            }
        },
        close() {
            MyForm?.value.resetFields();
        },
        async onFinish(values) {
            let callback = state.dataType ? POST_MENU : PUT_MENU
            const res = await callback(form.methods.model())
            if (res && res.code == 200) {
                message.success(res.message);
                state.show = false
                form.methods.close()
                data.methods.list()
            } else {
                message.warning(res.message);
            }
        },
        formatInt(value) {
            return parseInt(value)
        }
    }
})
const dict = reactive({
    icon: icons,
    parentId: [],
    methods: {
        async getTree() {
            const res = await GET_TREE()
            if (res && res.code == 200) {
                dict.parentId = [{
                    id: 0,
                    label: '顶级菜单',
                    value: 0,
                    children: dict.methods.setTree(res.data)
                }]
            }
        },
        setTree(list) {
            return list.map(item => {
                return {
                    ...item,
                    id: item.value,
                    children: item.children ? dict.methods.setTree(item.children) : []
                }
            })
        }
    },
    created() {
        dict.methods.getTree()
    }
})

data.created()
dict.created()
</script>

<template>
    <div class="body">
        <div class="header">
            <div class="search"></div>
            <div class="btn">
                <a-button type="primary" title="新增" @click="form.methods.add()">
                    新增
                </a-button>
            </div>
        </div>
        <div class="main">
            <div class="table">
                <a-table size="middle" :rowKey="(record) => record.id" :pagination="false" :columns="columns"
                    :data-source="data.list">
                    <template #bodyCell="{ text, record, index, column }">
                        <template v-if="column.dataIndex === 'title'">
                            {{ record.meta.menu.title }}
                        </template>
                        <template v-if="column.dataIndex === 'icon'">
                            <icon-font style='font-size:21px' :type="record.meta.menu.icon" />
                        </template>
                        <template v-if="column.dataIndex === 'operation'">
                            <!-- 编辑 -->
                            <a-button type="link" shape="circle" title="编辑" @click="form.methods.edit(record.id)">
                                <template #icon>
                                    <edit-two-tone />
                                </template>
                            </a-button>
                            <!-- 删除 -->
                            <a-popconfirm title="是否确认删除？" ok-text="确认" cancel-text="取消"
                                @confirm="form.methods.del(record.id)">
                                <a-button type="link" shape="circle" danger title="删除">
                                    <template #icon>
                                        <delete-two-tone two-tone-color="#eb2f96" />
                                    </template>
                                </a-button>
                            </a-popconfirm>
                        </template>
                    </template>

                </a-table>
            </div>
        </div>
        <div class="pages">

        </div>
        <a-drawer v-model:visible="state.show" @close="form.methods.close" :title="state.dataType ? '添加' : '编辑'"
            placement="right" width="480">
            <a-form :model="form.methods.model()" ref="MyForm" name="basic" :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }" autocomplete="off" @finish="form.methods.onFinish">
                <a-form-item label="菜单层级" name="parentId">
                    <a-tree-select v-model:value=" form.methods.model().parentId" style="width: 100%"
                        :treeData="dict.parentId" tree-data-simple-mode placeholder="请选择菜单层级" />
                </a-form-item>
                <a-form-item label="菜单图标" required :name="['meta', 'menu', 'icon']">
                    <a-select v-model:value="form.methods.model().meta.menu.icon" placeholder="请选择菜单图标">
                        <a-select-option :value="item.value" v-for="item in dict.icon" :key="item.id">
                            <icon-font :type="item.value" />
                            <span style="margin-left: 8px;">{{item.label}}</span>
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="菜单标题" required :name="['meta', 'menu', 'title']">
                    <a-input v-model:value="form.methods.model().meta.menu.title" placeholder="请输入菜单标题" />
                </a-form-item>
                <a-form-item label="菜单名称" required name="name">
                    <a-input v-model:value="form.methods.model().name" placeholder="请输入菜单名称" />
                </a-form-item>
                <a-form-item label="菜单路径" required name="path">
                    <a-input v-model:value="form.methods.model().path" placeholder="请输入菜单路径" />
                </a-form-item>
                <a-form-item label="组件路径" required name="component">
                    <a-input v-model:value="form.methods.model().component" placeholder="请输入组件路径" />
                </a-form-item>
                <a-form-item label="菜单排序" name="sort">
                    <a-input-number v-model:value="form.methods.model().sort" placeholder="请输入菜单排序" style="width: 100%"
                        :formatter="form.methods.formatInt" :min="1" :step="1" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
                    <a-button type="primary" html-type="submit">提交</a-button>
                </a-form-item>
            </a-form>
        </a-drawer>
    </div>
</template>

<style scoped lang='less'>

</style>