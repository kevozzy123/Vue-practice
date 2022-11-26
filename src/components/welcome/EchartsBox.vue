<template>
  <h2>{{ title }}</h2>
  <div class="chart" ref="echartDom"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: ['chartData', 'title'],
  data() {
    return {
      myChart: {},
      options: {}
    }
  },
  methods: {
    setOption(chartData) {
      this.myChart.setOption(chartData)
    }
  },
  mounted() {
    // console.log("---->",this.chartData)

    this.myChart = echarts.init(this.$refs.echartDom)
    // this.myChart.setOption(this.chartData)
  }
}
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>