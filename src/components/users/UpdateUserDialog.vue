<template>
  <div class="dialog">
    <el-dialog v-bind="$attrs" width="50%" title="用户角色分配">
      <el-form ref="addForm" :rules="$userRules">
        <el-form-item label="用户名称" prop="username">
          <el-input :modelValue="$attrs.username" />
        </el-form-item>
        <el-form-item label="角色邮箱" prop="email">
          <el-input v-model="email" />
        </el-form-item>
        <el-form-item label="角色电话" prop="mobile">
          <el-input v-model="mobile" type="number" />
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
      email: '',
      mobile: null,
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('update:info', this.email, this.mobile)
      this.$emit('update:visible')
    }
  }
};
</script>

<style lang="scss" scoped>

</style>