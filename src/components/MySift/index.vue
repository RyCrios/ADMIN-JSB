<script setup>
// import vue api

// import my

// import ui
import {
  SearchOutlined,
  ReloadOutlined,
  UpOutlined
} from '@ant-design/icons-vue'

// import api

// import other

//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
  name: 'MySift'
})
const props = defineProps({
  search: {
    type: Array,
    required: true
  },
  dict: Object
})
const emit = defineEmits(['search'])
// vue api

// my config

// refs
//  基本搜索表单
const MyForm = ref(null)
//  筛选高级表单
const MyMoreForm = ref(null)
//  初始化筛选dom
let dom = null

const state = reactive({
  isAll: false
})

const form = reactive({
  data: {},
  moreHeight: null,
  methods: {
    setData(arrayMap) {
      arrayMap.forEach((item) => {
        form.data[item.key] = null
      })
    },
    search() {
      emit('search', form.data)
    },
    reset() {
      MyForm.value.resetFields()
      MyMoreForm.value.resetFields()
    }
  },
  created() {
    form.methods.setData(props.search)
  }
})

//  是否进行展开筛选相关操作
const setMoreStyle = () => {
  state.isAll = !state.isAll
  if (state.isAll) {
    dom.setAttribute('style', `height:${form.moreHeight}px`)
  } else {
    dom.setAttribute('style', `height:0`)
  }
}

//  初始化筛选高度
onMounted(() => {
  dom = document.querySelector('.more')
  form.moreHeight = dom.clientHeight
  dom.setAttribute('style', 'height:0')
})
onBeforeUnmount(() => {
  form.moreHeight = null
  state.isAll = false
})

form.created()
</script>

<template>
  <div class="sift" id="qwes">
    <div class="form">
      <a-form
        ref="MyForm"
        layout="inline"
        style="max-width: 80%"
        :model="form.data"
      >
        <a-form-item
          v-for="(item, index) in search.slice(0, 4)"
          :key="index"
          :name="item.key"
        >
          <!-- type: 1 基本输入框 -->
          <template v-if="item.type == 1">
            <a-input
              v-model:value="form.data[item.key]"
              style="width: 200px"
              :placeholder="`请输入${item.title}!`"
            />
          </template>
          <template v-if="item.type == 2">
            <a-select
              v-model:value="form.data[item.key]"
              style="width: 200px"
              :placeholder="`请选择${item.title}!`"
            >
              <a-select-option
                v-for="item in dict[item.key]"
                :value="item.value"
                :key="item.id"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
          <template v-if="item.type == 3">
            <a-range-picker
              style="width: 420px"
              v-model:value="form.data[item.key]"
              :placeholder="[`选择开始${item.title}`, `选择结束${item.title}`]"
              show-time
              :valueFormat="item.format || 'YYYY-MM-DD HH:mm:ss'"
            />
          </template>
        </a-form-item>
      </a-form>
      <div class="btns">
        <!-- 搜索 -->
        <a-button size="small" type="link" @click="form.methods.search()">
          <search-outlined />
          搜索
        </a-button>
        <!-- 筛选 -->
        <a-button
          size="small"
          type="link"
          @click="setMoreStyle()"
          v-if="search.length > 4"
        >
          <up-outlined :rotate="state.isAll ? 0 : 180" />
          筛选
        </a-button>
        <!-- 重置 -->
        <a-button size="small" type="link" danger @click="form.methods.reset()">
          <reload-outlined />
          重置
        </a-button>
      </div>
    </div>

    <div class="more">
      <a-form ref="MyMoreForm" layout="inline" :model="form.data">
        <a-form-item
          style="margin-top: 8px"
          v-for="(item, index) in search.slice(4)"
          :key="index"
          :name="item.key"
        >
          <!-- type: 1 基本输入框 -->
          <template v-if="item.type == 1">
            <a-input
              v-model:value="form.data[item.key]"
              style="width: 200px"
              :placeholder="`请输入${item.title}!`"
            />
          </template>
          <template v-if="item.type == 2">
            <a-select
              v-model:value="form.data[item.key]"
              style="width: 200px"
              :placeholder="`请选择${item.title}!`"
            >
              <a-select-option
                v-for="item in dict[item.key]"
                :value="item.value"
                :key="item.id"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
          <template v-if="item.type == 3">
            <a-range-picker
              style="width: 416px"
              v-model:value="form.data[item.key]"
              :placeholder="[`选择开始${item.title}`, `选择结束${item.title}`]"
              show-time
              :valueFormat="item.format || 'YYYY-MM-DD HH:mm:ss'"
            />
          </template>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.sift {
  .form {
    position: relative;
    display: flex;

    .btns {
      position: absolute;
      top: 4px;
      right: 8px;
      text-align: right;
    }
  }

  .more {
    overflow: hidden;
    transition: all ease-in 0.2s;
  }
}
</style>
