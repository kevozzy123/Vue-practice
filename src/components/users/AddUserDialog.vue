<template>
  <div class="dialog">
    <el-dialog v-bind="$attrs" width="50%" title="用户角色分配">
      <el-form ref="addForm" :model="input" :rules="$userRules">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="input.username" />
        </el-form-item>
        <el-form-item label="角色邮箱" prop="email">
          <el-input v-model="input.email"/>
        </el-form-item>
        <el-form-item
          label="角色密码"
          prop="password"
        >
          <el-input v-model="input.password"/>
        </el-form-item>
        <el-form-item
          label="角色电话"
          prop="mobile"
        >
          <el-input v-model="input.mobile" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('update:visible')">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: {
        username: "",
        email: "",
        password: "",
        mobile: "",
      },
    };
  },
  methods: {
    async handleConfirm() {
      await this.$refs.addForm.validate();
      
      this.$emit("update:add", this.input.username, 
      this.input.password, this.input.email, this.input.mobile);
      this.input = {
        username: "",
        email: "",
        password: "",
        mobile: "",
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>