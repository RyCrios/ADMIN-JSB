
<script setup>
// import vue api

// import my
import MyLoading from "@c/MyLoading/index.vue"
// import ui
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
// import api
import { POST_LIST, POST_DEPARTMENT, DELETE_DEPARTMENT, PUT_DEPARTMENT } from "@a/department"

// import other
import Utils from "@u/Utils";
import config from "./config"
//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
    name: 'Department',
})

// vue api

// my config
const { columns } = config()
// refs
const MyForm = ref(null)

const page = reactive({
    pageNum: 1,
    pageSize: 10,
    total: null,
    param: {},
    showTotal: (total, range) => `当前展示${range[0]}-${range[1]}项, 共 ${total} 项数据`,
    change(pageNum, pageSize) {
        page.pageNum = pageNum
        page.pageSize = pageSize
        data.methods.list()
    },
})

const state = reactive({
    //  表单是否展示
    show: false,
    //  业务提交类型
    dataType: true,
    //  加载状态
    loading: false
})

const data = reactive({
    list: [],
    methods: {
        async list() {
            state.loading = true
            const res = await POST_LIST(page)
            if (res && res.code == 200) {
                data.list = res.data
                page.total = res.total
            }
            state.loading = false
        }
    },
    created() {
        data.methods.list()
    }
})

const form = reactive({
    //  新增业务模型
    add: {
        name: '',
        description: ''
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
            const res = await DELETE_DEPARTMENT(id)
            if (res && res.code == 200) {
                message.success(res.message);
                page.pageNum = 1
                data.methods.list()
            } else {
                message.warning(res.message);
            }
        },
        async edit(row) {
            form.edit = Utils.objectData(row, form.add)
            form.edit['id'] = row.id
            state.show = true
            state.dataType = false
        },
        close() {
            MyForm?.value.resetFields();
        },
        async onFinish(values) {
            let callback = state.dataType ? POST_DEPARTMENT : PUT_DEPARTMENT
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
    }
})

data.created()
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
                        <template v-if="column.dataIndex === 'operation'">
                            <!-- 编辑 -->
                            <a-button type="link" shape="circle" title="编辑" @click="form.methods.edit(record)">
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
                <MyLoading v-show="state.loading" />
            </div>
        </div>
        <div class="page">
            <a-pagination size="small" showSizeChanger showQuickJumper v-model:current="page.pageNum"
                v-model:page-size="page.pageSize" :total="page.total" :show-total="page.showTotal"
                @change="page.change" />
        </div>
        <a-drawer v-model:visible="state.show" @close="form.methods.close" :title="state.dataType ? '添加' : '编辑'"
            placement="right" width="480">
            <a-form :model="form.methods.model()" ref="MyForm" name="basic" :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }" autocomplete="off" @finish="form.methods.onFinish">
                <a-form-item label="机构名称" required name="name">
                    <a-input v-model:value="form.methods.model().name" placeholder="请输入机构名称" />
                </a-form-item>
                <a-form-item label="机构描述" name="description">
                    <a-textarea v-model:value="form.methods.model().description" placeholder="请输入机构描述" allow-clear />
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