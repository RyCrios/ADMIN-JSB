
<script setup>
// import my
import MyMenu from '../components/MyMenu/index.vue';
import MyNav from '../components/MyNav/index.vue';
// import ui
import {
    LeftCircleTwoTone,
    RightCircleTwoTone,
} from '@ant-design/icons-vue';
// import api

// import other
import logo from "@/assets/img/logo.png"
//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
    name: 'Page',
})

// vue api
const store = useStore()
// my config

// refs


const state = reactive({
    collapsed: false
})

const toggle = () => {
    state.collapsed = !state.collapsed
}
</script>

<template>
    <a-layout class="layout clear-bgc">
        <a-layout-sider v-model:collapsed="state.collapsed" :trigger="null" collapsible class="clear-bgc sider">
            <div class="switch" @click="toggle">
                <left-circle-two-tone :style="{fontSize:'24px' }" twoToneColor="#00000014" v-if="state.collapsed" />
                <right-circle-two-tone :style="{fontSize:'24px'}" twoToneColor="#00000014" v-else />
            </div>
            <div class="logo">
                <a-avatar :src="logo" :size="48" />
                <span v-show="!state.collapsed">吉顺办</span>
            </div>
            <MyMenu :menu="store.state.routers" class="ov-y" />
        </a-layout-sider>
        <a-layout class="clear-bgc ov-y">
            <a-layout-header class="clear-bgc header">
                <MyNav />
            </a-layout-header>
            <a-layout-content class="clear-bgc main">
                <a-breadcrumb>
                    <a-breadcrumb-item v-for="(item,index) in store.state.breadcrumb" :key="index">
                        {{item}}
                    </a-breadcrumb-item>
                </a-breadcrumb>

                <router-view v-slot="{ Component }">
                    <transition name="slide-left">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </a-layout-content>
            <a-layout-footer class="clear-bgc footer">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<style scoped lang='less'>
.layout {
    width: 100vw;
    height: 100vh;
    background-color: #f5f4ee;
    background-image: linear-gradient(190deg, #F4F4F3 30%, #ffffff 75%, #dfdced 75%);

    .sider {
        position: relative;

        .logo {
            width: 100%;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            span {
                color: #1890ff;
                margin-left: 8px;
                font-size: 18px;
                font-weight: 500;
            }
        }

        .switch {
            cursor: pointer;
            position: absolute;
            top: 50%;
            right: -12px;
            z-index: 9;
            background-color: #ffffff;
            border-radius: 50%;
            transform: translateY(-50%);
        }

        &::before {
            content: '';
            position: absolute;
            top: 4vh;
            right: -1px;
            display: block;
            width: 1px;
            height: 92vh;
            background-color: #EDEDEF;

        }
    }

    .header {
        padding: 0 18px;
    }

    .main {
        padding: 0 18px;
        min-height: auto;
    }

    .footer {
        text-align: center;
        height: 36px;
        line-height: 36px;
        padding: 0;
    }
}

.clear-bgc {
    background-color: rgba(0, 0, 0, 0);
}

.slide-left-enter-active {
    transition: transform 0.5s ease;
}

.slide-left-leave-active {
    transition: none;
}

.slide-left-enter-from,
.slide-left-leave-to {
    transform: translate3d(100vw, 0, 0);
}

.slide-right-enter-active {
    transition: transform 0.5s ease;
}

.slide-right-leave-active {
    transition: none;
}

.slide-right-enter-from,
.slide-right-leave-to {
    transform: translate3d(-100vw, 0, 0);
}
</style>