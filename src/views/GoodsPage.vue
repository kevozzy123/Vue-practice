<template>
  <el-card class="page">
    <div class="input-box">
      <el-input v-model="filterInput" @keyup.enter="search" placeholder="请输入查询关键字" size="large">
        <template #append>
          <el-button icon="Search" @click="search">
          </el-button>
        </template>
      </el-input>
      <el-button @click="$router.push({name:'addgood'})" type="primary" size="large">添加新商品</el-button>
    </div>
    <el-table :data="products" border>
      <el-table-column type="index" label="序号" width="60px" />
      <el-table-column prop="goods_name" label="商品名称" width="350px" />
      <el-table-column prop="goods_price" label="商品价格" />
      <el-table-column prop="goods_number" label="商品重置" />
      <el-table-column prop="add_time" label="创建时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="default" @click="handleEdit(scope.$index, scope.row)">
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>
          <el-popconfirm placement="bottom" title="你确定要删除此商品吗?" :width="200" trigger="click"
            @confirm="handleDelete(scope.row.goods_id)">
            <template #reference>
              <el-button size="default" icon="Delete" type="danger"></el-button>
            </template>

            <el-button size="small">取消</el-button>
            <el-button size="small" type="primary">确定</el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      filterInput:'',
      input: "",
      dialogVisible1: false,
      currentPage: 1,
      pageSize: 5,
      total: 12,
      products: [],
      showPop: false
    };
  },
  methods: {
    search() {
      this.fetchGoods(this.currentPage, this.pageSize, this.filterInput)
    },
    addNewGood() { },
    handleDelete(id) {
      this.$api.removeGoods(id)
      .then(() => {
        this.fetchGoods(this.currentPage, this.pageSize)
      })
    },
    handleSizeChange(val) {
      this.fetchGoods(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.fetchGoods(val, this.pageSize)
    },
    fetchGoods(pagenum, pagesize, query) {
      this.$api.getGoods(pagenum, pagesize, query)
        .then(data => {
          console.log(data)
          this.products = data.goods
          this.total = data.total
          this.products.forEach(product => {
            let date = Date(product.add_time).toLocaleString()
            let day = new Date(date).getDate()
            let month = new Date(date).getMonth()
            let year = new Date(date).getFullYear()
            let sec = new Date(date).getSeconds()
            let minute = new Date(date).getMinutes()
            let hour = new Date(date).getHours()

            product.add_time = `${year}年${month}月${day}日 ${hour}:${minute}:${sec}`
          })
        })
    }
  },
  created() {
    this.fetchGoods(this.currentPage, this.pageSize)
  }
};
</script>

<style lang="scss" scoped>
.input-box {
  display: flex;
  align-items: center;
}

.el-input {
  width: 40%;
}
</style>