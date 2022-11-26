<template>
    <el-dialog class="aa" v-bind="$attrs" width="50%" title="物流进度">
        <el-timeline>
            <el-timeline-item v-for="(activity, index) in LogtisticInfo" :key="index" :timestamp="activity.time">
                {{ activity.context }}
            </el-timeline-item>
        </el-timeline>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="$emit('update:visible')">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
export default {
    props: ['LogtisticInfo'],
    data() {
        return {
            activities:[
                {
                    context: 'Event start',
                    time: '2018-04-15',
                },
                {
                    context: 'Approved',
                    time: '2018-04-13',
                },
                {
                    context: 'Success',
                    time: '2018-04-11',
                },
            ]
        }
    },
    mounted() {
        console.log(this.LogtisticInfo)
    }
}
</script>

<style lang="scss" scoped>
.aa :deep(.el-dialog__body) {
    padding: 30px;
}

</style>

<!-- <template>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </template>
  
  <script setup>
  const activities = [
    {
      content: 'Event start',
      timestamp: '2018-04-15',
    },
    {
      content: 'Approved',
      timestamp: '2018-04-13',
    },
    {
      content: 'Success',
      timestamp: '2018-04-11',
    },
  ]
  </script> -->