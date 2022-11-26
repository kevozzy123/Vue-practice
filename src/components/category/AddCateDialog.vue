<template>
    <div class="dialog">
        <el-dialog v-bind="$attrs" width="50%" title="添加分类">
            <el-form ref="addForm">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="name" />
                </el-form-item>

                <el-select v-model="level" placeholder="请选择父分类层级" size="large">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="$emit('update:visible')">取消</el-button>
                    <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            level: null,
            options:[
                {
                    value: 0,
                    label: '一级'
                },
                {
                    value: 1,
                    label: '二级'
                },
                {
                    value: 2,
                    label: '三级'
                },
            ]
        }
    },
    methods: {
        handleConfirm() {
            this.$emit('update:info', this.name, this.level)
            this.$emit('update:visible')
            this.name = ''
            this.level = null
        }
    }
}
</script>

<style lang="scss" scoped>

</style>