<template>
    <div class="dialog">
    <el-dialog v-bind="$attrs" width="50%" title="角色信息修改">
      <el-form>
        <el-form-item label="角色名称">
          <el-input v-model="roleName" />
        </el-form-item>

        <el-form-item label="角色描述">
          <el-input v-model="desc"/>
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
      props: ['role'],
        data() {
            return {
                roleName: '',
                desc: ''
            }
        },
        methods: {
            handleConfirm() {
                console.log(this.roleName, this.desc)
                this.$emit('update:visible')
                this.$emit('update:edit', this.roleName, this.desc)
                this.roleName = ''
                this.desc = ''
            }
        },
        watch: {
        role: {
            handler() {
                this.roleName = this.role.roleName
                this.desc = this.role.roleDesc
                console.log(this.role)
            },
            // immediate: true
        },
        mounted() {
          
        },
    }
    }
</script>

<style lang="scss" scoped>

</style>