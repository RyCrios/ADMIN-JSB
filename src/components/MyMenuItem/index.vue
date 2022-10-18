
<script setup>
// import vue api

// import my
import MyMenuItem from "./index.vue"
// import ui

// import api

// import other

//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
    name: 'MyMenuItem',
})

// vue api
const props = defineProps({
    menu: {
        type: Array,
        required: true
    }
})
// my config

// refs

</script>

<template>
    <div class="menu-item" v-for="item in props.menu" :key="item.id">
        <a-sub-menu :key="item.meta.menu.title" v-if="item.children">
            <template #title>
                <a-avatar shape="square" :size="16" :src="item.icon" />
                <span style="margin-left: 8px;">{{item.meta.menu.title}}</span>
            </template>
            <MyMenuItem :menu="item.children" v-if="item.children" />
        </a-sub-menu>
        <a-menu-item key="3" v-else>
            <a-avatar shape="square" :size="16" :src="item.icon" />
            <span style="margin-left: 8px;">{{item.meta.menu.title}}</span>
        </a-menu-item>
    </div>
</template>

<style scoped lang='less'>

</style>