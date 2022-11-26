<template>
    <div class="dialog">
        <el-dialog v-bind="$attrs" width="50%" title="添加新属性">
            <el-form ref="addForm">
                <el-form-item label="属性名称" prop="paramName">
                    <el-input v-model="paramName" />
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
    data() {
        return {
            paramName: ''
        };
    },
    methods: {
        async handleConfirm() {
            this.$emit("update:add", this.paramName);
            this.paramName = ''
        },
    },
}
</script>

<style lang="scss" scoped>

</style>