<template>
  <div class="dialog">
    <el-dialog v-bind="$attrs" width="50%" title="修改订单地址">
      <el-form ref="addForm">
        <el-form-item label="省市区/县">
          <el-cascader v-model="input.city" :options="options" @change="handleChange"/>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="input.address" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">Cancel</el-button>
          <el-button type="primary" @click="handleConfirm"> Confirm </el-button>
        </span>
      </template>
      <!-- <p>{{ formattedCity }}</p> -->
    </el-dialog>
  </div>
</template>

<script>
import citydata from '@/assets/citydata';
export default {
  data() {
    return {
      options: citydata,
      input: {
        city: '',
        address: '',
      }
    }
  },
  methods: {
    handleChange() {

    },
    handleConfirm() {
      this.$emit("update:order", this.formattedCity);
      this.input = {
        city: '',
        address: '',
      }
    },
    handleCancel() {
      this.$emit('update:visible')
      this.input = {
        city: '',
        address: '',
      }
    }
  },
  computed: {
    formattedCity() {
      return this.input.city.toString() + ',' + this.input.address
    }
  }
};
</script>

<style lang="scss" scoped>

</style>