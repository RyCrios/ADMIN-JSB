
<script setup>
// import my

// import ui

// import api

// import other
import Utils from "@u/Utils";

//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
    name: 'Home',
})

// vue api

// my config

// refs
const state = reactive({
    timer: null,
    created() {
        state.timer = setInterval(() => {
            data.time = Utils.dayjs().format('a h:mm:ss')
        }, 1000)
    }
})
const data = reactive({
    title: Utils.getTimeState() + window.sessionStorage.getItem('name'),
    time: Utils.dayjs().format('a h:mm:ss'),
})

state.created()
</script>

<template>
    <div class="body">
        <div class="header">
            <a-page-header :title="data.title" sub-title="欢迎访问吉顺办!">
                <template #extra>
                    {{data.time}}
                </template>
            </a-page-header>
        </div>
    </div>
</template>

<style scoped lang='less'>

</style>