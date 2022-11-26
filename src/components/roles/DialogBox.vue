<template>
  <!-- v-model="dialogFVisible" -->
  <div class="dialog">
    <el-dialog v-bind="$attrs" width="fit-content" title="权限管理">
      <el-tree ref="tree" 
        :data="rightsList" 
        :props="defaultProps" 
        show-checkbox 
        default-expand-all 
        @check-change="getCheckedNodes()" 
        :default-checked-keys="defaultCheckedNodes"
        node-key="id"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('update:visible')">Cancel</el-button>
          <el-button type="primary" @click="handleConfirm"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // props: ["rightsList"],
  //   emits: ["hideDialog"],
  props:['role'],
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "authName",
      },
      rightsList: [],
      checkedNodes: [],
      defaultCheckedNodes: [],
      visible: this.$attrs
    };
  },
  methods: {
    getCheckedNodes() {
      this.checkedNodes = this.$refs.tree.getCheckedNodes(false)
      console.log(this.formattedNodes)
    },
    handleConfirm() {
      this.$emit('update:visible')
      this.$emit('update:role', this.formattedNodes)
    },
    setDefaultOptions() {
      console.log(this.$refs.tree.setCheckedNodes)
      console.log(this.role.children)
      this.$refs.tree.setCheckedNodes(this.role.children)
    }
  },
  computed:{
    formattedNodes() {
      const idArr = this.checkedNodes.map(node => {
        return node.id
      })

      return idArr.toString()
    },
    
  },
  watch: {
    visible: {
      handler() {
        console.log(this.role)
        console.log(this.$refs.tree)
      },
      immediate: true
    }
  }, 
  mounted() {
    // console.log(this.role)
    // console.log(this.$refs.tree)
    // // this.$refs.tree.setCheckedNodes(this.role.children)
  },
  created() {
    this.$api.getRightsListTree()
      .then(data => {
        this.rightsList = data
      })
  }
};
</script>

<style lang="scss" scoped>
.dialog :deep(.el-dialog .el-dialog__body) {
  display: flex !important;
  // flex-wrap: nowrap !important;
}

.el-dialog {
  min-width: fit-content;
  padding: 0 12px;
}

.el-tree{
  display: flex;
}
</style>