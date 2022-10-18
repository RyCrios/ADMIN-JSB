
<script setup>
// import my

// import ui
import zhCN from 'ant-design-vue/es/locale/zh_CN';

// import api

// import other

//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
    name: 'App',
})

// vue api

// my config

// refs

// 自适应
function resize() {
    let fs = document.body.clientWidth / 75;
    // 上面的75是根据设计图尺寸修改，例如设计图宽为1220，给左右两边各留10px，即1220-20=1200，1200/16(字体大小)等于75

    if (fs > 16) { // 控制字体大小，以免过大过小
        fs = 16;
    } else if (fs < 14) {
        fs = 14;
    }
    // 👇注意这里不能直接document.body.style
    document.body.parentNode.style = "font-size: " + fs + "px;";
}
resize();
window.onresize = resize;

</script>

<template>
    <a-config-provider :locale="zhCN">
        <RouterView />
    </a-config-provider>
</template>


<style lang='less'>
.body {
    margin: 8px 0;
    min-height: calc(100vh - 140px);

    .header {
        .search {
            position: relative;
            background-color: rgba(255, 255, 255, 0.375);
            border-radius: @radio;
            padding: 8px;
            box-shadow: @shadow;
        }

        .btn {
            margin-top: 8px;
        }
    }

    .main {
        margin-top: 8px;

        .table {
            position: relative;
            background-color: #fff;
            padding: 8px;
            border-radius: @radio;
            box-shadow: @shadow;
        }
    }

    .page {
        margin-top: 8px;
        text-align: right;
    }
}

.ov-y {
    overflow: scroll;
    overflow-x: hidden;
}
</style>