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
    initChart (data, xAxisData) {
      this.chart = echarts.init(document.getElementById(this.echartId))
      this.chart.setOption({
        title: {
          text: data.title,
          textStyle: {
            fontSize: '15'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: data.legendData,
          top: '12%'
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '0%',
          top: '22%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: data.seriesData
      })
    },
    /** public */
    // 对外接口，先销毁，再重建
    echartsUpdata (data, xAxisData) {
      this.eachartDestroy()
      this.initChart(data, xAxisData)
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
  height: 480px;
  &-con {
    width: 100%;
    height: 480px;
  }
}
</style>
