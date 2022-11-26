<template>
    <div class="dialog">
        <el-dialog v-bind="$attrs" width="50%" title="编辑">
            <el-form ref="addForm">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="name"/>
                </el-form-item>
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
    props:[],
    data() {
        return {
            name: ''
        }
    },
    methods: {
        handleConfirm() {
            this.$emit('update:info', this.name)
            this.$emit('update:visible')
            this.name = ''
        }
    }
   
}
</script>

<style lang="scss" scoped>

</style>