<template>
  <div class="echarts">
    <div id="main" class="echarts-canvas"></div>
  </div>
</template>
<script>
// var echarts = require('echarts')
import echarts from 'echarts'
export default {
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    // this.initChart()
  },
  methods: {
    initChart (data) {
      this.chart = echarts.init(document.getElementById('main'))
      this.chart.setOption({
        tooltip: {},
        xAxis: {
          data: ['徒步', '跑步', '骑行', '自驾', '公交', '出租']
        },
        yAxis: {},
        series: [{
          name: '总里程',
          type: 'bar',
          // itemStyle: {
          // color: 'yellow'
          // },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              )
            }
          },
          data: data
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
    box-sizing: border-box;
    &-canvas{
        width: 100%;
        height: 100%;
    }
}
</style>
