<template>
  <el-card class="user-page">
    <div class="input-box">
      <el-input v-model="filterInput" placeholder="请输入查询关键字" size="large">
        <template #append>
          <el-button icon="Search" @click="search"/>
        </template>
      </el-input>
      <el-button type="primary" size="large" @click="this.dialogVisible2 = true">添加新角色</el-button>
    </div>

    <!-- <el-card class="box-card"> -->
    <el-table :data="users" border>
      <el-table-column type="index" label="序号" width="60px" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="mobile" label="电话" />
      <el-table-column prop="role_name" label="角色" />
      <el-table-column label="状态" width="80px">
        <template #default="scope">
          <el-switch v-model="scope.row.mg_state" @change="handleStateChange(scope.row.id, scope.row.mg_state)"
            size="large" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEditClick(scope.row.username, scope.row.id)">
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>
          <el-button size="small" type="warning"
            @click="handleDetailClick(scope.row.username, scope.row.role_name, scope.row.id)">
            <el-icon>
              <Setting />
            </el-icon>
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- </el-card> -->

    <!-- <div class="paginagtion-box"> -->
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
    <DialogBoxUser v-model="dialogVisible" @update:visible="dialogVisible = false" :username="username"
      :currentRole="currentRole" @update:role="changeRole"></DialogBoxUser>

    <AddUserDialog v-model="dialogVisible2" @update:add="addUser" @update:visible="dialogVisible2 = false">
    </AddUserDialog>

    <UpdateUserDialog v-model="dialogVisible3" :username="username" @update:visible="dialogVisible3 = false"
      @update:info="updateUser"></UpdateUserDialog>
  </el-card>
</template>

<script>
import DialogBoxUser from "@/components/users/DialogBoxUser.vue";
import AddUserDialog from '@/components/users/AddUserDialog.vue';
import UpdateUserDialog from "@/components/users/UpdateUserDialog.vue";

export default {
  components: { DialogBoxUser, AddUserDialog, UpdateUserDialog },
  data() {
    return {
      input: {
        username: '',
        email: '',
        password: '',
        mobile: ''
      },
      users: [],

      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      // panigation props
      currentPage: 1,
      pageSize: 5,
      total: 24,
      filterInput: '',
      // dialog props
      username: '',
      currentRole: '',
      uid: 0
    };
  },
  methods: {
    handleDelete(id) {
      this.$api.deleteUser(id)
        .then(() => {
          this.$message({
            message: "删除成功",
            showClose: true,
            duration: 2000,
          });

          this.fetchData(this.currentPage, this.pageSize)
        })
    },
    handleEditClick(username, uid) {
      this.dialogVisible3 = true
      this.username = username
      this.uid = uid
    },
    handleDetailClick(username, role, uid) {
      this.username = username
      this.currentRole = role
      this.uid = uid
      this.dialogVisible = true;
    },
    updateUser(email, mobile) {
      this.$api.updateUserInfo(this.uid, email, mobile)
      .then(() => {
        this.$message({
            message: "修改成功",
            showClose: true,
            duration: 2000,
            type: "success",
          });
      })

      this.fetchData(this.currentPage, this.pageSize)
    },
    changeRole(rid) {
      console.log(this.uid, rid)
      this.$api.arrangeRole(this.uid, rid)
        .then(() => {
          this.fetchData(this.currentPage, this.pageSize)
        })
    },
    addUser(username, password, email, mobile) {
      this.$api.addUser(username, password, email, mobile)
        .then(() => {
          this.dialogVisible2 = false
          this.$message({
            message: "添加成功",
            showClose: true,
            duration: 2000,
            type: "success",
          });
          this.fetchData(this.currentPage, this.pageSize)
        });

    },
    handleStateChange(id, newVal) {
      // console.log(id, newVal)
      this.$api.updateUserState(id, newVal)
        .then(() => {
          this.$message({
            message: '设置状态成功',
            showClose: true,
            duration: 2000,
            type: "success",
          });
        })
    },
    search() {
      this.fetchData(this.currentPage, this.pageSize, this.filterInput)
    },  
    fetchData(pagenum, pagesize, query) {
      this.$api.loadUsers(pagenum, pagesize, query).then((data) => {
        console.log(data);
        this.users = data.users;
        this.total = data.total
      });
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
.user-page {
  padding: 1rem;
  background-color: white;
  height: 100%;
}

.el-input {
  width: 40%;
  //   margin: 0 auto 1rem;
}
</style>