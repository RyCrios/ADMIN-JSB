
<script setup>
// import vue api

// import my
import MyLoading from "@c/MyLoading/index.vue"
import MySift from "@c/MySift/index.vue"

// import ui
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
// import api
import { POST_LIST, POST_ITEM, DELECT_ITEM, PUT_ITEM, GET_DETAIL } from "@a/item"
import { GET_LIST } from "@a/department"
// import other
import Utils from "@u/Utils";
import config from "./config"
//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
    name: 'Item',
})

// vue api

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
        async list(params) {
            state.loading = true
            const res = await POST_LIST(params || page)
            if (res && res.code == 200) {
                data.list = res.data
                page.total = res.total
            }
            state.loading = false
        },
        search(obj) {
            let params = {
                pageNum: 1,
                pageSize: 10,
                param: obj
            }
            data.methods.list(params)
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
        workObject: null,
        itemType: null,
        departmentId: null,
        transactType: null,
        isCharge: 0,
        chargeDescription: '',
        description: '',
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
            const res = await DELECT_ITEM(id)
            if (res && res.code == 200) {
                message.success(res.message);
                page.pageNum = 1
                data.methods.list()
            } else {
                message.warning(res.message);
            }
        },
        async edit(id) {
            const res = await GET_DETAIL(id)
            form.edit = Utils.objectData(res.data, form.add)
            form.edit['id'] = id
            state.show = true
            state.dataType = false
        },
        close() {
            MyForm?.value.resetFields();
        },
        async onFinish(values) {
            let callback = state.dataType ? POST_ITEM : PUT_ITEM
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
const dict = reactive({
    departmentId: [],
    isCharge: [],
    transactType: [],
    workObject: [],
    itemType: [],
    methods: {
        async get_departmentId() {
            const res = await GET_LIST()
            if (res && res.code == 200) {
                dict.departmentId = Utils.editDictConfig(res.data, { label: 'name', value: 'id', id: 'id' })
            }
        }
    },
    created() {
        dict.methods.get_departmentId()
    }
})

data.created()
dict.created()
// my config
const { search, columns } = config(dict)
</script>

<template>
    <div class="body">
        <div class="header">
            <div class="search">
                <MySift :search='search' :dict="dict" @search='data.methods.search' />
            </div>
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
                <a-form-item label="事项名称" required name="name">
                    <a-input v-model:value="form.methods.model().name" placeholder="请输入事项名称" />
                </a-form-item>
                <a-form-item label="相关部门" required name="departmentId">
                    <a-select v-model:value="form.methods.model().departmentId" placeholder="请选择相关部门">
                        <a-select-option :value="item.value" v-for="item in dict.departmentId" :key="item.id">
                            <span>{{item.label}}</span>
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="申报对象" required name="workObject">
                    <a-select v-model:value="form.methods.model().workObject" placeholder="请选择申报对象">
                        <a-select-option :value="item.value" v-for="item in dict.workObject" :key="item.id">
                            <span>{{item.label}}</span>
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="事项类型" required name="itemType">
                    <a-select v-model:value="form.methods.model().itemType" placeholder="请选择事项类型">
                        <a-select-option :value="item.value" v-for="item in dict.itemType" :key="item.id">
                            <span>{{item.label}}</span>
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="办理方式" required name="transactType">
                    <a-select v-model:value="form.methods.model().transactType" placeholder="请选择办理方式">
                        <a-select-option :value="item.value" v-for="item in dict.transactType" :key="item.id">
                            <span>{{item.label}}</span>
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="是否收费" required name="isCharge">
                    <a-select v-model:value="form.methods.model().isCharge" placeholder="请选择是否收费">
                        <a-select-option :value="item.value" v-for="item in dict.isCharge" :key="item.id">
                            <span>{{item.label}}</span>
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="收费说明" :required="form.methods.model().isCharge!=0" name="chargeDescription">
                    <a-textarea v-model:value="form.methods.model().chargeDescription" placeholder="请输入收费说明"
                        allow-clear />
                </a-form-item>
                <a-form-item label="事项描述" name="description">
                    <a-textarea v-model:value="form.methods.model().description" placeholder="请输入事项描述" allow-clear />
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