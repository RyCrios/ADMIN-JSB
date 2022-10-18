
<script setup>
// import my
import MyMenuItem from "@c/MyMenuItem/index.vue"
// import ui
import { createFromIconfontCN } from '@ant-design/icons-vue';

// import api

// import other

//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
    name: 'MyMenu',
})

// vue api
const router = useRouter()
const store = useStore()
const props = defineProps({
    menu: {
        type: Array,
        required: true
    }
})
// my config
const IconFont = createFromIconfontCN({
    scriptUrl: import.meta.env.VITE_ALICDN_URL
});
// refs

const toPath = ({ path }) => {
    router.push(path)
}
//  重新定义已选择菜单
const selectedKeys = computed(() => {
    let res = []
    store.state.breadcrumb.forEach((item, index) => {
        index ? res.push(item) : void 0
    })
    return res
})

</script>

<template>
    <a-menu class="menu" :selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="工作台" @click="toPath({path: '/base/index'})">
            <icon-font type="icon-menhuguanli" />
            <span style="margin-left: 8px;">工作台</span>
        </a-menu-item>
        <template v-for="item in props.menu">
            <MyMenuItem :menu="item.children" v-if="item.children.length" />
            <a-menu-item :key="item.meta.title" v-else @click="toPath(item)">
                <icon-font :type="item.meta.icon" />
                <span style="margin-left: 8px;">{{item.meta.title}}</span>
            </a-menu-item>
        </template>
    </a-menu>
</template>

<style scoped lang='less'>
.menu {
    height: 70vh;
    background-color: rgba(0, 0, 0, 0);
    border: none;
}
</style>