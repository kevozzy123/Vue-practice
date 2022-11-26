<template>
  <el-card class="page">
    <div class="input-box">
      <el-input v-model="filterInput" placeholder="请输入查询关键字" size="large">
        <template #append>
          <el-button icon="Search" @click="search"></el-button>
        </template>
      </el-input>
    </div>

    <el-table :data="orders" border style="width: 100%">
      <el-table-column type="expand" label="明细" width="70px">
        <template #default="props">
          <div>
            {{ props.row.consignee_addr }}
            <el-table :data="props.row.family">
              <!-- <el-table-column label="Name" prop="name" />
              <el-table-column label="State" prop="state" />
              <el-table-column label="City" prop="city" />
              <el-table-column label="Address" prop="address" />
              <el-table-column label="Zip" prop="zip" /> -->
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="60px" />
      <el-table-column label="订单编号" prop="order_number" />
      <el-table-column label="订单价格(元)" prop="order_price" />
      <el-table-column label="是否付款" prop="paid">
        <template #default="scope">
          <el-tag v-show="scope.row.pay_status == 0" type="danger">未付款</el-tag>
          <el-tag v-show="scope.row.pay_status == 1" type="success">已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" prop="is_send" />
      <el-table-column label="下单时间" prop="create_time" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEditClick(scope.row.order_id)">
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>
          <el-button size="small" type="warning" @click="logtisticVisivle = true">
            <el-icon>
              <Location />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
    <OrderDialog v-model="dialogVisible" @update:visible="dialogVisible = false" @update:order="changeAddress">
    </OrderDialog>

    <LogtisticDialog :LogtisticInfo="LogtisticInfo" v-model="logtisticVisivle"  @update:visible="logtisticVisivle = false"></LogtisticDialog>
  </el-card>
</template>

<script>
import OrderDialog from '@/components/order/OrderDialog.vue'
import LogtisticDialog from "@/components/order/LogtisticDialog.vue";
export default {
  components: { OrderDialog, LogtisticDialog },
  data() {
    return {
      filterInput:'',
      dialogVisible: false,
      logtisticVisivle: false,
      orders: [],
      currentPage: 1,
      pageSize: 5,
      total: 10,
      oId: null,
      LogtisticInfo:[]
    };
  },
  methods: {
    search() {
      this.fetchData(this.currentPage, this.pageSize, this.filterInput)
    },
    fetchData(pagenum, pagesize, query) {
      this.$api.getOrders(pagenum, pagesize, query)
      .then((data) => {
        // console.log(data);
        this.orders = data.goods;
        this.total = data.total
      });

      this.$api.getLogistics()
      .then(data => {
        this.LogtisticInfo = data
      })
    },
    handleEditClick(id) {
      this.dialogVisible = true
      this.oId = id
    },
    changeAddress(addr) {
      // console.log(this.oId, addr)
      this.dialogVisible = false
      this.$api.updateOrderAddress(this.oId, addr)
    },
    handleSizeChange(val) {
      this.fetchData(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.fetchData(val, this.pageSize)
    }
  },
  created() {
    this.fetchData(this.currentPage, this.pageSize)
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 40%;
}

.pagination-box {
  display: flex;
  justify-content: center;
}
</style>