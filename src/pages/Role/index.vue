<script setup>
// import vue api

// import my
import MyLoading from '@c/MyLoading/index.vue'
import MySift from '@c/MySift/index.vue'

// import ui
import { EditTwoTone, DeleteTwoTone, ApiTwoTone } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
// import api
import {
  POST_ROLE_LIST,
  POST_ROLE_ADD,
  DELETE_ROLE_ID,
  PUT_ROLE_UPDATE,
  GET_ROLE_DETAIL,
  POST_ROLE_MENU
} from '@a/role'
import { GET_TREE } from '@a/menu'
// import other
import Utils from '@u/Utils'
import config from './config'
//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
  name: 'Role'
})

// vue api

// refs
const MyForm = ref(null)

const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: null,
  param: {},
  showTotal: (total, range) =>
    `当前展示${range[0]}-${range[1]}项, 共 ${total} 项数据`,
  change(pageNum, pageSize) {
    page.pageNum = pageNum
    page.pageSize = pageSize
    data.methods.list()
  }
})
const state = reactive({
  //  表单是否展示
  show: false,
  //  额外功能信息
  showMore: false,
  //  额外业务标题
  title: '',
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
      const res = await POST_ROLE_LIST(params || page)
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
    status: null,
    description: '',
    code: ''
  },
  //  编辑业务模型
  edit: {},
  //  菜单配置
  menuId: {
    roleId: null,
    menuids: []
  },
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
    async menu(id) {
      const res = await GET_ROLE_DETAIL(id)
      form.menuId.roleId = res.data.id
      form.menuId.menuIds = res.data.menuIds
      state.showMore = true
      state.title = '菜单配置'
    },
    async setMenu() {
      let c = form.menuId.menuIds.toString()

      const res = await POST_ROLE_MENU({
        ...form.menuId,
        menuIds: form.menuId.menuIds.toString()
      })
      if (res && res.code == 200) {
        message.success(res.message)
        state.showMore = false
        state.title = ''
      }
    },
    async del(id) {
      const res = await DELETE_ROLE_ID(id)
      if (res && res.code == 200) {
        message.success(res.message)
        page.pageNum = 1
        data.methods.list()
      } else {
        message.warning(res.message)
      }
    },
    async edit(id) {
      const res = await GET_ROLE_DETAIL(id)
      form.edit = Utils.objectData(res.data, form.add)
      form.edit['id'] = id
      state.show = true
      state.dataType = false
    },
    close() {
      MyForm?.value.resetFields()
    },
    async onFinish(values) {
      let callback = state.dataType ? POST_ROLE_ADD : PUT_ROLE_UPDATE
      const res = await callback(form.methods.model())
      if (res && res.code == 200) {
        message.success(res.message)
        state.show = false
        form.methods.close()
        data.methods.list()
      } else {
        message.warning(res.message)
      }
    }
  }
})
const dict = reactive({
  menu: [],
  methods: {
    async get_menu() {
      const res = await GET_TREE()
      if (res && res.code == 200) {
        dict.menu = res.data
      }
    }
  },
  created() {
    dict.methods.get_menu()
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
        <MySift :search="search" :dict="dict" @search="data.methods.search" />
      </div>
      <div class="btn">
        <a-button type="primary" title="新增" @click="form.methods.add()">
          新增
        </a-button>
      </div>
    </div>
    <div class="main">
      <div class="table">
        <a-table
          size="middle"
          :rowKey="(record) => record.id"
          :pagination="false"
          :columns="columns"
          :data-source="data.list"
        >
          <template #bodyCell="{ text, record, index, column }">
            <template v-if="column.dataIndex === 'operation'">
              <!-- 编辑 -->
              <a-button
                type="link"
                shape="circle"
                title="编辑"
                @click="form.methods.edit(record.id)"
              >
                <template #icon>
                  <edit-two-tone />
                </template>
              </a-button>
              <!-- 配置菜单 -->
              <a-button
                type="link"
                shape="circle"
                title="菜单"
                @click="form.methods.menu(record.id)"
              >
                <template #icon>
                  <api-two-tone />
                </template>
              </a-button>
              <!-- 删除 -->
              <a-popconfirm
                title="是否确认删除？"
                ok-text="确认"
                cancel-text="取消"
                @confirm="form.methods.del(record.id)"
              >
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
      <a-pagination
        size="small"
        showSizeChanger
        showQuickJumper
        v-model:current="page.pageNum"
        v-model:page-size="page.pageSize"
        :total="page.total"
        :show-total="page.showTotal"
        @change="page.change"
      />
    </div>
    <a-drawer
      v-model:visible="state.show"
      @close="form.methods.close"
      :title="state.dataType ? '添加' : '编辑'"
      placement="right"
      width="480"
    >
      <a-form
        :model="form.methods.model()"
        ref="MyForm"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
        @finish="form.methods.onFinish"
      >
        <a-form-item label="角色名称" required name="name">
          <a-input
            v-model:value="form.methods.model().name"
            placeholder="请输入事项名称"
          />
        </a-form-item>
        <a-form-item label="状态" required name="status">
          <a-radio-group
            v-model:value="form.methods.model().status"
            button-style="solid"
          >
            <a-radio-button value="a">Hangzhou</a-radio-button>
            <a-radio-button value="b">Shanghai</a-radio-button>
            <a-radio-button value="c">Beijing</a-radio-button>
            <a-radio-button value="d">Chengdu</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="事项描述" name="description">
          <a-textarea
            v-model:value="form.methods.model().description"
            placeholder="请输入事项描述"
            allow-clear
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
    <a-drawer
      v-model:visible="state.showMore"
      :title="state.title"
      placement="right"
    >
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="菜单树">
          <a-tree-select
            v-model:value="form.menuId.menuIds"
            :tree-data="dict.menu"
            allow-clear
            multiple
            show-checked-strategy="SHOW_ALL"
            tree-default-expand-all
            placeholder="请选择菜单"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button type="primary" @click="form.methods.setMenu">提交</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
