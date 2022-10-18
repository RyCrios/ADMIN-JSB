
<script setup>
// import vue api

// import my

// import ui
import { PlusOutlined } from '@ant-design/icons-vue';
import { message, Upload } from 'ant-design-vue';

// import api

// import other

//if error; please run npm install unplugin-vue-define-options -D
//设置vue组件名称
defineOptions({
    name: 'MyUpload',
})
const emit = defineEmits(['update:value'])
const props = defineProps({
    limit: {
        type: Number,
        default: 1
    },
    types: {
        type: Array,
        default: () => ['png', 'jpg', 'jpeg']
    },
    upload: {
        type: Function,
        required: true
    },
    value: {
        type: Array || String,
        default: () => []
    }
})


// vue api

// my config

// refs
const state = reactive({
    show: false,
    title: '',
    url: ''
})

const data = reactive({
    fileList: [],
    methods: {
        beforeUpload(file, fileList) {
            try {
                //  验证文件格式,返回上传类型是否有在类型中匹配
                if (!data.methods.valide(file.type).includes('true')) {
                    throw new Error(`上传的文件格式错误,当前支持${props.types.join()}格式文件!`)
                }
                if (data.fileList.length >= props.limit) {
                    throw new Error(`上传的文件数量超出限制,当前支持${props.limit}张!`)
                }

            } catch (error) {
                //  输出验证不通过的消息提醒
                message.warn(error.message)
                //  Upload.LIST_IGNORE; ant-upload组件配置,阻止上传行为情况下防止组件依旧渲染上传信息
                return Upload.LIST_IGNORE;
            }
        },
        async customRequest({ file }) {
            //  预定义上传文件格式
            let length = data.fileList.length
            let fileItem = {
                uid: file.uid,
                name: file.name,
                percent: 0,
                status: 'uploading',
                thumbUrl: ''
            }

            //  设置上传文件参数
            let formData = new FormData()
            formData.append('file', file)
            //  预上传 开始占位标识
            data.fileList.push(fileItem)
            const res = await props.upload(formData)
            if (res && res.code == 200) {
                //  占位标识替换成功数据
                data.fileList[length].percent = 100;
                data.fileList[length].status = 'success'
                data.fileList[length].thumbUrl = res.data
            } else {
                //  占位标识替换失败标识
                data.fileList[length].percent = 50;
                data.fileList[length].status = 'error'
                data.fileList[length].thumbUrl = ''
            }
        },
        valide(type) {
            return props.types.map(item => {
                return type.includes(item)
            }).join()
        },
        handlePreview(file) {
            state.show = true;
            state.title = file.name;
            state.url = file.thumbUrl
        },
        handleRemove(file) {
            let key = data.fileList.indexOf(file)
            return data.fileList.splice(key, 1)
        },
        handleCancel() {
            state.show = false;
            state.title = '';
            state.url = ''
        }
    },
    created() {
        let res = []
        switch (typeof props.value) {
            case 'object': {
                res = props.value
                break
            }
            case 'string': {
                if (props.value == '') break
                res[0] = props.value
                break
            }
            default: {
                break
            }
        }
        res
        debugger
        // &&: 可排除res为null等特殊情况时报错
        if (!res && res.length == 0) return
        res.forEach((item, index) => {
            console.log(11);
            data.fileList[index] = {
                uid: index,
                name: `${index}.png`,
                percent: 100,
                status: 'success',
                thumbUrl: item
            }
        })
    }
})

//  监听文件列表,并更新到表单绑定数据中
watch(() => data.fileList, (n, o) => {
    let data = []
    n.forEach(item => {
        item.status == "success" ? data.push(item.thumbUrl) : void 0
    })
    emit('update:value', props.limit == 1 ? data[0] : data)
}, { deep: true })

data.created()

</script>

<template>
    <div class="upload">
        <a-upload :file-list="data.fileList" :beforeUpload="data.methods.beforeUpload"
            :customRequest="data.methods.customRequest" list-type="picture-card" @preview="data.methods.handlePreview"
            @remove="data.methods.handleRemove">
            <plus-outlined />
        </a-upload>
        <a-modal :visible="state.show" :title="state.title" :footer="null" @cancel="data.methods.handleCancel">
            <img alt="预览图片" style="width: 100%" :src="state.url" />
        </a-modal>
    </div>
</template>