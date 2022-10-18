
<script setup>
// import my

// import ui
import { message } from 'ant-design-vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
// import api
import { POST_LOGIN } from "@a/user"
// import other

//  导入背景模块
import * as klouds from 'klouds'

//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
    name: 'Login',
})

// vue api
const router = useRouter()
// my config

// refs
const state = reactive({
    clouds: null,
    loading: false,
})

const form = reactive({
    data: {
        account: 'admin',
        password: 'wcg1261415218'
    },
    methods: {
        async sign() {
            if (form.data.account == '') return message.warning('用户名不能为空!');
            if (form.data.password == '') return message.warning('密码不能为空!');
            state.loading = true
            const res = await POST_LOGIN(form.data)
            if (res.code == 200) {
                window.sessionStorage.setItem('account', res.data.account)
                window.sessionStorage.setItem('headPicture', res.data.headPicture)
                window.sessionStorage.setItem('name', res.data.name)
                window.sessionStorage.setItem('token', res.data.token)
                state.loading = false
                router.replace('/base/index')
            }
        }
    }
})

onMounted(() => {
    //  初始化背景挂载
    state.clouds = klouds.create({
        selector: '#cloud-canvas',
        speed: 1,
        layerCount: 7,
    })
})

</script>

<template>
    <div class="login">
        <div class='login_title'>
            <span>欢迎访问黄家彬摸鱼平台</span>
        </div>
        <div class='login_fields'>
            <div class='login_fields__user'>
                <div class='icon'>
                    <img src='./img/user_icon_copy.png'>
                </div>
                <input placeholder='用户名' type='text' v-model="form.data.account">
                <div class='validation'>
                    <img src='./img/tick.png'>
                </div>
            </div>
            <div class='login_fields__password'>
                <div class='icon'>
                    <img src='./img/lock_icon_copy.png'>
                </div>
                <input placeholder='密码' type='password' v-model="form.data.password">
                <div class='validation'>
                    <img src='./img/tick.png'>
                </div>
            </div>
            <div class='login_fields__submit'>
                <a-button size="large" type="primary" :loading="state.loading" block @click="form.methods.sign()">登录
                </a-button>
            </div>
        </div>
    </div>
    <canvas id="cloud-canvas" />
</template>

<style scoped lang='less'>
#cloud-canvas {
    position: absolute;
    z-index: 0;
    width: 100vw;
    height: 100vh;
}

.login {
    box-sizing: content-box;
    opacity: 1;
    top: 20px;
    transform: rotateX(0deg);
    position: relative;
    z-index: 1;
    width: 240px;
    border-top: 2px solid #D8312A;
    height: 300px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    padding: 100px 40px 40px 40px;
    background: #35394abc;
    background: linear-gradient(45deg, #35394abc 0%, #1f222eee 100%);

    .login_title {
        color: #afb1be;
        height: 60px;
        text-align: left;
        font-size: 16px;
    }

    .login_fields {
        height: 208px;
        position: absolute;
        left: 0;

        .icon {
            position: absolute;
            z-index: 1;
            left: 36px;
            top: 8px;
            opacity: .5;
        }

        input {
            box-sizing: content-box;
            color: #afb1be;
            width: 190px;
            margin-top: -2px;
            background: #35394a72;
            left: 0;
            padding: 10px 65px;
            border: none;
            outline: none;
            box-shadow: none;
        }

        input[type='password'] {
            color: #DC6180 !important;
        }

        .login_fields__user,
        .login_fields__password {
            position: relative;
        }

        .login_fields__submit {
            position: relative;
            top: 35px;
            left: 10%;
            width: 80%;
            right: 0;

        }

        .forgot {
            float: right;
            font-size: 10px;
            margin-top: 11px;
            text-decoration: underline;

            a {
                color: #606479;
            }
        }
    }

    .disclaimer {
        position: absolute;
        bottom: 20px;
        left: 35px;
        width: 250px;
    }

    .validation {
        position: absolute;
        z-index: 1;
        right: 10px;
        top: 6px;
        opacity: 0;
    }
}
</style>