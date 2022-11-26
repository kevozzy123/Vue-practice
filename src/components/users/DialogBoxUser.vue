<template>
  <div class="dialog">
    <el-dialog v-bind="$attrs" width="50%" title="用户角色分配">
      <el-form :rules="$userRules">
        <el-form-item label="当前用户名称" width="40px" prop="username">
          <el-input readonly :model-value="$attrs.username"/>
        </el-form-item>
        <el-form-item label="用户当前角色" width="40px" >
          <el-input readonly :model-value="$attrs.currentRole"/>
        </el-form-item>
        <el-form-item label="选择新角色" width="40px" prop="roleName">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in roles" :label="item.roleName" :value="item.id" :key="item"/>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('update:visible')">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // props: ['username', 'currentRole'],
  data() {
    return {
      value: null,
      roles: []
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('update:role', this.value)
      this.$emit('update:visible')
    }
  },
  created() {
    this.$api.getRoles()
    .then((data) => {
      this.roles = data
    })
  }
};
</script>

<style lang="scss" scoped>
</style>