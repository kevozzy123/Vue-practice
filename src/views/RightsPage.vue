<template>
  <el-card class="box-card">
    <el-table :data="products" border>
      <el-table-column type="index" label="序号" width="60px" />
      <el-table-column prop="authName" label="权限名称" />
      <el-table-column prop="path" label="路径" />
      <el-table-column label="权限等级">
        <template #default="scope">
          <el-tag class="ml-2" :type="getLevelType(scope.row.level)">{{
            getLevelContent(scope.row.level)
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getLevelType(level) {
      if (level == 0) {
        return "";
      } else if (level == 1) {
        return "success";
      } else if (level == 2) {
        return "danger";
      }
    },
    getLevelContent(level) {
        if (level == 0) {
        return "一级";
      } else if (level == 1) {
        return "二级";
      } else if (level == 2) {
        return "三级";
      }
    },
    fetchData() {
      this.$api.getRightsList()
      .then((data) => {
        console.log(data);
        this.products = data.sort((a, b) => {
          return a.level - b.level
        })
      });
    },
  },
  created() {
    this.fetchData()
  },
};
</script>

<style lang="scss" scoped>
</style>