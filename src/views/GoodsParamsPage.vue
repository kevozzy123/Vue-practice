<template>
  <el-card class="page">
    <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon />
    <div class="input-box">
      <span>选择商品分类： </span>

      <el-cascader v-model="categoryParam" :options="selectOptions" :props="cascadeProps" @change="handleChange"
        clearable>
        <template #default="{ node, data }">
          <span>{{ data.cat_name }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
      </el-cascader>
      <!-- <p>{{ categoryParam[categoryParam.length - 1] }}</p>
      <p>{{ categoryParam }}</p> -->
    </div>

    <!-- 动态属性 -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="动态参数" name="first">
        <el-button type="primary" :disabled="allowButton" @click="openDialog('many')">添加新参数</el-button>
        <el-table :data="dynamicParams" border row-key="attr_id" :expand-row-keys="expandedRows" @expand-change="toggleRowKey">
          <!-- 明细 -->
          <el-table-column type="expand" label="明细" width="60px">
            <template #default="props">
              <div class="tags-box">
                <!-- 删除明细值 -->
                <el-tag v-for="item in props.row.attr_vals.split(',')" :key="item" closable
                  @close="handleCloseTag(props.row.cat_id, props.row.attr_id, props.row.attr_name, props.row.attr_sel,props.row.attr_vals, item)">
                  {{ item }}
                </el-tag>

                <!-- 增加明细值 -->
                <el-input v-if="inputVisible" ref="InputRef" v-model="tagInputValue" size="small"
                  @keyup.enter="handleInputConfirm(props.row.cat_id, props.row.attr_id, props.row.attr_name, props.row.attr_sel, props.row.attr_vals.concat(',', tagInputValue))" />
                <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                  + 新参数值
                </el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="60px" />
          <el-table-column prop="attr_name" label="参数名称" />
          <!-- 操作 -->
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row.cat_id, scope.row.attr_id, 0)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 静态属性 -->
      <el-tab-pane label="静态属性" name="second">
        <el-button type="primary" :disabled="allowButton" @click="openDialog('only')">添加新属性</el-button>
        <el-table :data="staticParams" border row-key="attr_id" :expand-row-keys="expandedRows" @expand-change="toggleRowKey">
          <!-- 明细 -->
          <el-table-column type="expand" label="明细" width="60px">
            <template #default="props">
              <div class="tags-box">

                <!-- 删除明细值 -->
                <el-tag v-for="item in props.row.attr_vals.split(',')" :key="item" closable
                  @close="handleCloseTag(props.row.cat_id, props.row.attr_id, props.row.attr_name, props.row.attr_sel,props.row.attr_vals, item)">
                  {{ item }}
                </el-tag>

                <!-- 增加明细值 -->
                <el-input v-if="inputVisible" ref="InputRef" v-model="tagInputValue" size="small"
                  @keyup.enter="handleInputConfirm(props.row.cat_id, props.row.attr_id, props.row.attr_name, props.row.attr_sel, props.row.attr_vals.concat(',', tagInputValue))" />
                <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                  + 新参数值
                </el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="60px" />
          <el-table-column prop="attr_name" label="参数名称" />
          <!-- 操作 -->
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" size="default" @click="handleEdit(scope.row.cat_id, scope.row.attr_id)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row.cat_id, scope.row.attr_id, 1)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <ParamsDialog v-model="dialogVisible" @update:add="addNewParam" @update:visible="dialogVisible = false">
    </ParamsDialog>
    <EditParamDialog v-model="dialogVisible2" @update:add="editParam" @update:visible="dialogVisible = false"></EditParamDialog>
  </el-card>
</template>

<script>
import ParamsDialog from '@/components/params/ParamsDialog.vue'
import EditParamDialog from '@/components/params/EditParamDialog.vue'

export default {
  components: { ParamsDialog, EditParamDialog },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      // tags
      tagInputValue: '',
      inputVisible: false,
      activeName: 'first',
      categoryParam: [],
      products: [],
      //cascader
      paramId: 0,
      selectOptions: [],
      cascadeProps: {
        value: 'cat_id',
        label: 'cat_name'
      },
      // param type
      paramType: '',
      attrId: '',
      dynamicParams: [],
      staticParams: [],
      expandedRows:[]
    };
  },
  methods: {
    openDialog(paramType) {
      this.paramType = paramType
      this.dialogVisible = true
    },
    addNewParam(attr_name) {
      console.log(this.paramId, attr_name, this.paramType)
      this.dialogVisible = false
      this.$api.addParam(this.paramId, attr_name, this.paramType)
      .then(() => {
        this.fetchData(this.paramId)
      })
    },
    editParam(attr_name) {
      console.log(this.paramId, attr_name, this.paramType)

      this.$api.updateCategoryParams()
      .then(() => {
        this.fetchData(this.paramId)
      })
    },
    handleChange(id) {
      // console.log(this.categoryParam, id)
      if(this.categoryParam !== null && this.categoryParam.length > 0) {
        this.fetchData(id[id.length - 1])
        this.paramId = id[id.length - 1]
      } else if(this.categoryParam === null) {
        this.dynamicParams = []
        this.staticParams = []
      }
    },
    handleDelete(catId, attrId) {
      console.log(catId, attrId)
      this.$api.removeCategoryParam(catId, attrId)
        .then(() => {
          this.fetchData(this.paramId)
        })
    },
    handleEdit(cat_id, attr_id) {
      this.paramId = cat_id
      this.attrId = attr_id
    },
    handleCloseTag(catId, attrId, attr_name, attr_sel, attr_vals, tag) {
      let set = new Set(attr_vals.split(','))
      set.delete(tag)
      let newStr = Array.from(set).join(',')
      this.handleInputConfirm(catId, attrId, attr_name, attr_sel, newStr)
    },
    handleInputConfirm(catId, attrId, attr_name, attr_sel, attr_vals) {
      this.tagInputValue = ''
      this.$api.updateCategoryParams(catId, attrId, attr_name, attr_sel, attr_vals)
        .then(() => {
          this.fetchData(this.paramId)
        })
    },
    async toggleRowKey(a, b) {
      console.log(a)
      let expanded = []
      await b.forEach(item => {
        expanded.push(item.attr_id)
        console.log(item.attr_id)
      })
      this.expandedRows = expanded 
      console.log(this.expandedRows)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.InputRef.focus()
      })
    },
    fetchData(id) {
      this.$api.getCategoryParamsMany(id)
        .then(data => {
          console.log(data)
          this.dynamicParams = data
        })

      this.$api.getCategoryParamsOnly(id)
        .then(data => {
          console.log(data)
          this.staticParams = data
        })
    }
  },
  computed: {
    allowButton() {
      return this.categoryParam !== null && this.categoryParam.length > 0 ? false : true
    },
    params() {
      return this.paramType == 0 ? this.dynamicParams : this.staticParams
    }
  },
  created() {
    this.$api.getCategories()
      .then(data => {
        console.log(data)
        this.selectOptions = data
      })
  },
};
</script>

<style lang="scss" scoped>
.input-box {
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 1rem 0;
}

.el-input {
  width: unset;
}

.el-select,
.select-trigger {
  display: flex;
  align-items: center;
}

.el-cascader .el-input {
  width: 40%;
  display: flex;
  align-items: center !important;
  margin: auto;
}

.el-pagination .el-select .el-input {
  margin: auto;
  display: flex;
  align-items: center;
}

.el-button {
  width: 100px;
}

.el-tag {
  margin: 0 10px 0 0;
}

.tags-box {
  margin: 16px 60px;
}
</style>