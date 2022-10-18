
<script setup>
// import vue api

// import my

// import ui

// import api

// import other

//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
    name: 'MyIcon',
})

// vue api

// my config

// refs


</script>

<template>
    <div class="icon">
        <slot></slot>
    </div>
</template>

<style scoped lang='less'>
.icon {
    padding: 6px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        box-shadow: @shadow;
    }
}
</style>