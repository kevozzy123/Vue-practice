<template>
  <el-card class="page">
    <div class="input-box">
      <el-button @click="this.dialogVisible2 = true" type="primary" size="large">添加新角色</el-button>
    </div>

    <el-table :data="roles" border style="width: 100%" row-key="id" :expand-row-keys="expandedRows" @expand-change="toggleRowKey">
      <el-table-column type="expand" label="明细" width="70px">
        <!-- 展开明细 -->
        <template #default="scope">
          <!-- 一级循环 -->
          <el-row v-for="childOne in scope.row.children" :key="childOne" class="row1">
            <el-col :span="4" class="col1">
              <el-tag @close="handleDeleteRight(scope.row.id, childOne.id)" closable>{{ childOne.authName }}</el-tag>
              <el-icon>
                <CaretRight />
              </el-icon>
            </el-col>
            <!-- 二级循环 -->
            <el-col :span="19" class="col2">
              <el-row v-for="childTwo in childOne.children" :key="childTwo" class="row2">
                <el-col :span="7">
                  <el-tag type="success" @close="handleDeleteRight(scope.row.id, childTwo.id)" closable>{{ childTwo.authName }}</el-tag>
                  <el-icon>
                    <CaretRight />
                  </el-icon>
                </el-col>
                <!-- 三级循环 -->
                <!-- <template v-if="childTwo.children"> -->
                <el-col :span="12" class="col3">
                  <el-row v-for="childThree in childTwo.children" :key="childThree" class="row3">
                    <el-col>
                      <el-tag type="warning" @close="handleDeleteRight(scope.row.id, childThree.id)" closable>{{ childThree.authName }}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
                <!-- </template> -->
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 普通table -->
      <el-table-column type="index" label="序号" width="60px" />
      <el-table-column label="角色名称" prop="roleName" />
      <el-table-column label="角色描述" prop="roleDesc" />
      <el-table-column label="操作">
        <!-- 操作 -->
        <template #default="scope">
          <el-button type="primary" size="small" @click="openEditMenu(scope.row)">
            <el-icon>
              <Edit />
            </el-icon>
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">
            <el-icon>
              <Delete />
            </el-icon>删除
          </el-button>
          <el-button size="small" type="warning" @click="openRoleMenu(scope.row)">
            <el-icon>
              <Setting />
            </el-icon>分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <EditRoleDialog :role="currentRole" v-model="dialogVisible" @update:edit="handleEdit" @update:visible="dialogVisible = false" >
    </EditRoleDialog>

    <AddRoleDialog v-model="dialogVisible2" @update:add="addNewRole" @update:visible="dialogVisible2 = false">
    </AddRoleDialog>

    <DialogBox :role="currentRole" ref="rolesDialog" v-model="dialogVisible3" @update:role="handleRoleChange($event)"
      @update:visible="dialogVisible3 = false"></DialogBox>
  </el-card>
</template>

<script>
import EditRoleDialog from "@/components/roles/EditRoleDialog.vue";
import AddRoleDialog from "@/components/roles/AddRoleDialog.vue";
import DialogBox from '@/components/roles/DialogBox.vue'

export default {
  components: { EditRoleDialog, AddRoleDialog, DialogBox },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      // data
      roles: [],
      rights: [],
      roleId: null,
      currentRole: null,
      //expanded rows
      expandedRows: [],
    };
  },
  methods: {
    handleEdit(roleName, roleDesc) {
      this.$api.editRole(this.roleId, roleName, roleDesc)
        .then(() => {
          this.fetchRoles()
        })
    },
    handleDelete(id) {
      this.$api.deleteRole(id)
        .then(() => {
          this.fetchRoles()
        })
    },
    handleRoleChange(roles) {
      console.log(this.roleId, roles)
      this.$api.grantRoles(this.roleId, roles)
        .then(() => {
          this.fetchRoles()
        })
    },
    handleDeleteRight(roleId, rightId) {
      // console.log(roleId, rightId)
      this.$api.removeRoleRight(roleId, rightId)
        .then(() => {
          this.fetchRoles()
        })
    },
    async openRoleMenu(role) {
      this.currentRole = role
      this.roleId = role.id
      this.dialogVisible3 = true;
      await this.$nextTick()
      this.$refs.rolesDialog.setDefaultOptions()
      // console.log(this.currentRole)
      // console.log(this.checkedNodes)
    },
    openEditMenu(role) {
      this.roleId = role.id
      this.currentRole = role
      this.dialogVisible = true;
      // console.log(this.currentRole)
    },
    addNewRole(roleName, roleDesc) {
      console.log('new role added')
      this.$api.addRole(roleName, roleDesc)
        .then(() => {
          this.fetchRoles()
        })
    },
    async toggleRowKey(a, b) {
      console.log(a)
      let expanded = []
      await b.forEach(item => {
        expanded.push(item.id)
      })
      this.expandedRows = expanded 
      // console.log(this.expandedRows)
    },
    fetchRoles() {
      this.$api.getRoles()
        .then(data => {
          console.log(data)
          this.roles = data
        })
    }
  },
  computed: {
    checkedNodes() {
      let childOne = this.currentRole.children.map(child => {
        return child.id
      })
      let childTwo = this.currentRole.children.children ? this.currentRole.children.children.map(child => {
        return child.id
      }) : null

      return childOne.concat(childTwo)
    }
  },
  created() {
    this.fetchRoles()
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  font-weight: 800;
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba($color: #000000, $alpha: 0.4);
  z-index: 9999;
}

.el-button {
  padding: 7px 15px;
}

.el-table .el-table__cell {
  padding: 10px 0;
}

.el-col,
.el-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.el-tag{
  margin: 5px;
}

.row2,
.row3 {
  display: flex;
  flex-wrap: nowrap;
}

.col2{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.col3{
  min-width: 500px;
}
.row2{
  width: 400px;
}

.col1{
  width: 60px;
}

.row1 {
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(172, 172, 172);
}
</style>