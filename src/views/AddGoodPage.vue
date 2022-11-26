<template>
    <el-card class="box-card">
        <el-alert :closable="false" title="添加用户信息" type="info" show-icon center />

        <el-steps :active="activeIndex * 1" align-center finish-status="success">
            <el-step title="基本信息" />
            <el-step title="商品参数" />
            <el-step title="商品属性" />
            <el-step title="商品图片" />
            <el-step title="商品内容" />
            <el-step title="完成" />
        </el-steps>

        <div class="main-box">
            <el-tabs :tab-position="'left'" style="height: 200px" class="demo-tabs" @tab-click="handleTabClick">
                <el-tab-pane label="基本信息"></el-tab-pane>
                <el-tab-pane label="商品参数"></el-tab-pane>
                <el-tab-pane label="商品属性"></el-tab-pane>
                <el-tab-pane label="商品图片"></el-tab-pane>
                <el-tab-pane label="商品内容"></el-tab-pane>
            </el-tabs>

            <div class="main-content">
                <el-form v-if="activeIndex == 0" label-position="top" label-width="100px" :model="input"
                    style="max-width: 460px">
                    <el-form-item label="商品名称">
                        <el-input v-model="input.name" />
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="input.price" />
                    </el-form-item>
                    <el-form-item label="商品数量">
                        <el-input v-model="input.num" />
                    </el-form-item>
                    <el-form-item label="商品重量">
                        <el-input v-model="input.weight" />
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <el-cascader v-model="input.category" :options="options" :props="cascadeProps"
                            @change="handleChange">
                            <template #default="{ node, data }">
                                <span>{{ data.cat_name }}</span>
                                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                            </template>
                        </el-cascader>
                    </el-form-item>
                </el-form>

                <div class="content-box" v-else-if="activeIndex == 1">
                    <el-tag v-for="tag in params" :key="tag" closable @close="handleClose(tag)">
                        {{ tag }}
                    </el-tag>
                    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
                        @keyup.enter="handleParamConfirm(inputValue)" />
                    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                        + 添加新参数
                    </el-button>
                </div>

                <div class="content-box" v-else-if="activeIndex == 2">
                    <el-tag v-for="tag in properties" :key="tag" closable @close="handleClose(tag)">
                        {{ tag }}
                    </el-tag>
                    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" size="small"
                        @keyup.enter="handlePropConfirm(inputValue)"/>
                    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                        + 添加新属性
                    </el-button>
                </div>

                <div class="content-box" v-else-if="activeIndex == 3">
                    <el-upload v-model:file-list="fileList"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                        :on-preview="handlePictureCardPreview">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>

                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                </div>

                <div class="content-box" v-else-if="activeIndex == 4">
                    <!-- <QuillEditor contentType="html" v-model:content="intro" :options="quillOptions"></QuillEditor> -->
                    <el-button type="primary" @click="addGood">提交商品</el-button>
                </div>

                <div class="content-box" v-else-if="activeIndex == 6">
                    <el-alert title="添加成功" type="success" description="返回商品页或添加更多" show-icon />
                    <el-button type="primary" @click="$router.push({ name: 'goods' })">回到商品页</el-button>
                    <el-button type="success" @click="$router.go()">添加更多</el-button>
                </div>
            </div>
            <el-button class="back-btn" size="large" @click="$router.push({name:'goods'})">返回商品列表</el-button>
        </div>
    </el-card>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
export default {
    components:{ QuillEditor },
    data() {
        return {
            activeIndex: 0,
            dialogVisible: false,
            dialogImageUrl: '',
            inputValue: '',
            inputVisible: false,
            // input vars
            fileList: [],
            input: {
                name: '',
                price: 0,
                num: 0,
                weight: 0,
                category: null
            },
            params: [],
            properties: [],
            intro:'',
            // cascader config
            options: [],
            cascadeProps: {
                value: 'cat_id',
                label: 'cat_name'
            },
            // quill options
            quillOptions: {
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
            },
        }
    },
    methods: {
        handleChange() {

        },
        handleTabClick(pane) {
            this.activeIndex = pane.index
        },
        handlePictureCardPreview(uploadFile) {
            this.dialogImageUrl = uploadFile.url
            this.dialogVisible = true
        },
        handleParamConfirm(val) {
            this.params.push(val)
            this.inputValue = null
        },
        handlePropConfirm(val) {
            this.properties.push(val)
            this.inputValue = null
        },
        addGood() {
            let attrs = [{"attr_id":parseInt(Math.random()*10000),},{"attr_id":parseInt(Math.random()*10000),}]
            attrs[0].attr_value = this.params.join()
            attrs[1].attr_value = this.properties.join()
            console.log('name: ', this.input.name)
            console.log('category: ', this.input.category.join())
            console.log('price: ', this.input.price)
            console.log('weight: ', this.input.weight)
            console.log('num: ', this.input.num)
            console.log('intro: ', this.intro)
            console.log('attrs', attrs)
            this.$api.addGoods(this.input.name,this.input.category, this.input.price, 
            this.input.num, this.input.weight, this.intro, attrs)
            .then(() => {
                this.activeIndex = 6
            })
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(() => {
                this.$refs.InputRef.focus()
            })
        }
    },
    created() {
        this.$api.getCategories()
            .then(data => {
                this.options = data
            })
    }
}
</script>

<style lang="scss" scoped>
.el-alert {
    margin-bottom: 20px;
}

.back-btn{
    position: absolute;
    bottom: 100px;
}

.el-tabs {
    margin: 10px 0;
}

.el-alert :deep(.el-alert__title) {
    position: relative;
    top: 2px;
}

.main-box {
    display: flex;
    width: 100%;
}

.main-content {
    width: 100%;
    height: 90%;
    margin: 20px;
}

.content-box {
    width: 100%;
    height: 100%;
}

.el-form,
.el-form .el-input {
    width: 100%;
}

form {
    max-width: 2000px !important;
}

.el-tag{
    margin: 10px 10px 10px 0;
}
</style>