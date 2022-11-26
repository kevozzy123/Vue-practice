<template>
    <div class="page">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card class="grid-content card1">
                    <div class="title">
                        <span>用户统计</span>
                        <el-tag>实时</el-tag>
                    </div>
                    <div class="num">29</div>
                    <div class="bottom">当前总用户数量</div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="grid-content card2">
                    <div class="title">
                        <span>商品统计</span>
                        <el-tag>实时</el-tag>
                    </div>
                    <div class="num">849</div>
                    <div class="bottom">当前总商品数量</div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="grid-content card3">
                    <div class="title">
                        <span>订单统计</span>
                        <el-tag>实时</el-tag>
                    </div>
                    <div class="num">203</div>
                    <div class="bottom">当前总订单数量</div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="grid-content card4">
                    <div class="title">
                        <span>销售统计</span>
                        <el-tag>实时</el-tag>
                    </div>
                    <div class="num">2909</div>
                    <div class="bottom">当前总销售数量</div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="bottom-row">
            <el-col :span="12">
                <el-card class="card5">
                    <EchartsBoxVue ref="echart1" :chartData="dataOne" :title="'用户数据来源'"></EchartsBoxVue>
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card class="card6">
                    <EchartsBoxVue ref="echart2" :chartData="chartOptions" :title="'页面访问统计'"></EchartsBoxVue>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import EchartsBoxVue from '@/components/welcome/EchartsBox.vue'
export default {
    components: { EchartsBoxVue },
    data() {
        return {
            dataOne: {},
            chartOptions: {
                // legend: {
                //     // data:['首页', '分类', '商品列表', '商品详情']
                // },
                tooltip: {
                    // trigger: 'axis',
                    // axisPointer: {
                    //     type: 'shadow'
                    // }
                },
                dataset: {
                    // dimensions: ['name', '首页', '分类', '商品列表', '商品详情'],
                    source: []
                },
                xAxis: { type: 'category' },
                yAxis: {},
                series: [
                    { type: 'bar' },
                    { type: 'bar' },
                    { type: 'bar' },
                    { type: 'bar' },
                ]
            }
        }
    },
    created() {
        this.$api.getStatistics(1)
            .then(res => {
                console.log(res)
                res.legend = null
                this.dataOne = res
                // this.dateOne.dataZoom = {}
                
                this.dataOne.tooltip = {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                }
                this.$refs.echart1.setOption(res);
            })

        this.$api.getStatistics(2)
            .then(res => {
                for (let key in res) {
                    let obj = {}
                    obj.name = key
                    obj['首页'] = res[key][0].rp2_count
                    obj['分类'] = res[key][1].rp2_count
                    obj['商品列表'] = res[key][2].rp2_count
                    obj['商品详情'] = res[key][3].rp2_count
                    this.chartOptions.dataset.source.push(obj)
                    this.chartOptions.dataset.source.sort((a, b) => {
                        return a.name.split('-').join('') - b.name.split('-').join('')
                    })
                }
                this.$refs.echart2.setOption(this.chartOptions)
            })
    }
}
</script>

<style lang="scss" scoped>
.bottom-row {
    margin-top: 2rem;
    height: 75%;
}

.grid-content {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.grid-content .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    font-weight: 800;
}

.grid-content .bottom {
    margin-top: 5px;
    margin-right: auto;
}

.el-card__body .num {
    font-size: 1.75rem;
}

.card1 {
    background-color: rgb(84, 112, 198);
}

.card2 {
    background-color: rgb(154, 96, 180);
}

.card3 {
    background-color: rgb(59, 162, 114);
}

.card4 {
    background-color: rgb(252, 132, 82);
}

.card5,
.card6 {
    height: 100%;
    background-color: white;
}
</style>