<template>
    <div>
        <el-card class="box-card">
            <pre>{{ content }}</pre>
            <!-- https://vueup.github.io/vue-quill/guide/installation.html#cdn -->
            <!-- npm install @vueup/vue-quill@latest --save -->
            <QuillEditor contentType="html" v-model:content="content" :options="options"></QuillEditor>
        </el-card>
    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
// console.log( QuillEditor )
export default {
    components: {
        QuillEditor
    },
    data() {
        return {
            content:"",
            options: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                        [{ 'direction': 'rtl' }],                         // text direction
                        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                        ['clean']                                         // remove formatting button
                    ]
                },
                placeholder:"请输入商品详情"
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.box-card{
    border: 1px solid black;
}
.box-card :deep(.ql-editor){
    min-height: 400px;// 动态高度
    // height: 400px;//滚动模式
}
</style>