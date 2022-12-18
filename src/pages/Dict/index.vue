<script setup>
// import vue api

// import my
import MyLoading from '@c/MyLoading/index.vue'
import MySift from '@c/MySift/index.vue'

// import ui
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
// import api
import {
  POST_DICT_LIST,
  POST_DICT_ADD,
  DELETE_DICT_ID,
  PUT_DICT_UPDATE,
  GET_DICT_DETAIL,
  GET_DICT_DATA_TYPE,
  DELETE_DICT_DATA_ID,
  POST_DICT_DATA_ADD
} from '@a/dict'

// import other
import Utils from '@u/Utils'
import config from './config'
//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
  name: 'Dict'
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
  //  业务提交类型
  dataType: true,
  //  加载状态
  loading: false
})
const data = reactive({
  list: [],
  dataList: [],
  methods: {
    async list(params) {
      state.loading = true
      const res = await POST_DICT_LIST(params || page)
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
    dictName: '',
    dictType: '',
    remark: ''
  },
  //  编辑业务模型
  edit: {},
  //  编辑扩展属性表达
  newEdit: {
    dictLabel: '',
    dictValue: '',
    dictTypeId: null,
    dictType: '',
    isDefault: 'N'
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
    async del(id) {
      const res = await DELETE_DICT_ID(id)
      if (res && res.code == 200) {
        message.success(res.message)
        page.pageNum = 1
        data.methods.list()
      } else {
        message.warning(res.message)
      }
    },
    async delData(row) {
      const res = await DELETE_DICT_DATA_ID(row.id)
      if (res && res.code == 200) {
        data.dataList.splice(data.dataList.indexOf(row), 1)
        message.success(res.message)
      } else {
        message.warning(res.message)
      }
    },
    async setData() {
      if (
        form.newEdit.dictLabel.trim() == '' ||
        form.newEdit.dictValue.trim() == ''
      ) {
        message.warning('请设置对应属性或键值进行添加！')
        return
      }
      const res = await POST_DICT_DATA_ADD(form.newEdit)
      if (res && res.code == 200) {
        const dictData = await GET_DICT_DATA_TYPE(form.newEdit.dictType)
        data.dataList = dictData.data
        form.newEdit = {
          dictLabel: '',
          dictValue: '',
          dictTypeId: null,
          dictType: '',
          isDefault: 'N'
        }
        message.success(res.message)
      }
    },
    async edit(id) {
      const res = await GET_DICT_DETAIL(id)
      form.newEdit.dictType = res.data.dictType
      form.newEdit.dictTypeId = res.data.id
      const dictData = await GET_DICT_DATA_TYPE(res.data.dictType)
      data.dataList = dictData.data
      form.edit = Utils.objectData(res.data, form.add)
      form.edit['id'] = id
      state.show = true
      state.dataType = false
    },
    close() {
      MyForm?.value.resetFields()
    },
    async onFinish(values) {
      let callback = state.dataType ? POST_DICT_ADD : PUT_DICT_UPDATE
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
  methods: {},
  created() {}
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
        <a-form-item label="字典名称" required name="dictName">
          <a-input
            v-model:value="form.methods.model().dictName"
            placeholder="请输入字典名称"
          />
        </a-form-item>
        <a-form-item label="字典类型" required name="dictType">
          <a-input
            v-model:value="form.methods.model().dictType"
            placeholder="请输入字典类型"
          />
        </a-form-item>
        <a-form-item label="字典描述" name="remark">
          <a-textarea
            v-model:value="form.methods.model().remark"
            placeholder="请输入字典描述"
            allow-clear
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
      <template v-if="!state.dataType">
        <a-input-group size="default" style="margin-bottom: 8px">
          <a-row>
            <a-col :span="9">
              <a-input
                v-model:value="form.newEdit.dictLabel"
                placeholder="属性"
              />
            </a-col>
            <a-col :span="9">
              <a-input
                v-model:value="form.newEdit.dictValue"
                placeholder="键值"
              />
            </a-col>
            <a-col :span="6" style="padding: 0 8px">
              <a-button
                block
                shape="round"
                type="primary"
                @click="form.methods.setData"
                >添加属性</a-button
              >
            </a-col>
          </a-row>
        </a-input-group>
        <a-table
          size="small"
          :columns="[
            { title: '属性', dataIndex: 'dictLabel' },
            { title: '键值', dataIndex: 'dictValue' },
            { title: '操作', dataIndex: 'operation', align: 'center' }
          ]"
          :data-source="data.dataList"
          :pagination="false"
        >
          <template #bodyCell="{ text, record, index, column }">
            <template v-if="column.dataIndex === 'operation'">
              <!-- 删除 -->
              <a-popconfirm
                title="是否确认删除？"
                ok-text="确认"
                cancel-text="取消"
                @confirm="form.methods.delData(record)"
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
      </template>
    </a-drawer>
  </div>
</template>

<style scoped lang="less"></style>
