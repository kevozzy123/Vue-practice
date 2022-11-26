<template>
  <el-card>
    <div class="input-box">
      <el-button type="primary" size="large" @click="dialogVisible = true">添加分类</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="cat_id"
      border
    >
      <el-table-column type="index" label="序号" width="60px">
        <template #default="{ row }" >{{ row.i }}</template>
      </el-table-column>
      <el-table-column prop="cat_name" label="分类名称" />
      <el-table-column label="是否有效">
        <template #default="scope">
          <el-icon class="check-icon" v-if="scope.row.cat_pid == 0"><SuccessFilled /></el-icon>
          <!-- <el-icon v-else-if="scope.row.cat_pid == 1"><WarningFilled /></el-icon> -->
        </template>
      </el-table-column>
        
      <el-table-column label="权限等级">
        <template #default="scope">
          <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level==1" type="success" >二级</el-tag>
          <el-tag v-else-if="scope.row.cat_level==2" type="danger" >三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="openEdit(scope.row.cat_id)"
            ><el-icon><Edit /></el-icon>编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.cat_id)"
            ><el-icon><Delete /></el-icon>删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />

    <EditCateDialog v-model="dialogVisible2" @update:visible="dialogVisible = false" @update:info="handleEdit"></EditCateDialog>
    <AddCateDialog v-model="dialogVisible" @update:visible="dialogVisible2 = false" @update:info="addCategory"></AddCateDialog>
  </el-card>
</template>

<script>
import EditCateDialog from '@/components/category/EditCateDialog.vue';
import AddCateDialog from '@/components/category/AddCateDialog.vue';
export default {
  components: { EditCateDialog, AddCateDialog },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 24,
      rightsList:[],
      catId: null,
      dialogVisible: false,
      dialogVisible2: false
    };
  },
  methods: {
    handleDelete(id) {
      // alert(id)
      this.$api.deleteCategory(id)
      .then(() => {
        this.fetchData()
      })
    },
    openEdit(id) {
      this.catId = id
      console.log(id)
      this.dialogVisible2 = true
    },
    addCategory(name,  level) {
      console.log(name, level)
      // this.$api.addCategories()
      // .then(() => {
      //   this.fetchData()
      // })
    },
    handleEdit(catName) {
      // alert(this.catId)
      this.$api.editCategory(this.catId, catName)
      .then(() => {
        this.dialogVisible2 = false
        this.fetchData()
      })
    },
    handleSizeChange(val) {
      this.fetchData(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.fetchData(val, this.pageSize)
    },
    fetchData() {
      this.$api.getCategories(null, this.currentPage, this.pageSize)
      .then(data => {
        console.log(data)
        this.total = data.total
        this.tableData = data.result
        this.tableData.forEach((item, index) => {
          item.i = index+1
        })
      })
    },
  },
  created() {
    this.fetchData()
  }
};
</script>

<style lang="scss" scoped>
.el-table .el-table__cell {
  padding: 0;
}

.check-icon{
  color: var(--success);
  font-size: 1.5rem;
}
</style>