<template>
  <div class="echarts">
    <div id="main" class="echarts-canvas"></div>
  </div>
</template>
<script>
var echarts = require('echarts')
export default {
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart (data) {
      this.chart = echarts.init(document.getElementById('main'))
      this.chart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['徒步', '跑步', '骑行', '自驾', '公交', '出租']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 5, 20, 36]
        }]
      })
    },
    /** public */
    // 对外接口，先销毁，再重建
    echartsUpdata (data) {
      this.eachartDestroy()
      this.initChart(data)
    },
    destroyed () {
      this.eachartDestroy()
    },
    // 销毁echart
    eachartDestroy () {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    }
  }

}
</script>
<style lang="scss" scoped>
.echarts{
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
    &-canvas{
        width: 100%;
        height: 500px;
    }
}
</style>
