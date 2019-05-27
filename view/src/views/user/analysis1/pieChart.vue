<template>
  <div class="echart">
    <div :id="echartId" class="echart-con"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'LineChart',
  data () {
    return {
      chart: null,
      echartId: `echart${Math.floor(Math.random() * 10000000)}`
    }
  },
  mounted () {
  },
  methods: {
    initChart (data) {
      this.chart = echarts.init(document.getElementById(this.echartId))
      this.chart.setOption({
        title: {
          text: '出行方式分布图',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['步行', '跑步', '单车/电车', '自驾/出租', '公交/地铁']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '步行' },
              { value: 310, name: '跑步' },
              { value: 234, name: '单车/电车' },
              { value: 135, name: '自驾/出租' },
              { value: 1548, name: '公交/地铁' }
              // { value: data.allWalk, name: '步行' },
              // { value: data.allRun, name: '跑步' },
              // { value: data.allCycle, name: '单车/电车' },
              // { value: parseInt(data.allDrive) + parseInt(data.allTaxi), name: '自驾/出租' },
              // { value: data.allBus, name: '公交/地铁' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
.echart {
  width: 100%;
  height: 550px;
  &-con {
    width: 100%;
    height: 550px;
  }
}
</style>
