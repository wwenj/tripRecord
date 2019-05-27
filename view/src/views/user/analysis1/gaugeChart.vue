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
    this.initChart()
  },
  methods: {
    initChart (data) {
      this.chart = echarts.init(document.getElementById(this.echartId))
      this.chart.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '速度',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 220,
            splitNumber: 11,
            radius: '100%',
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: { // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: { // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              backgroundColor: 'auto',
              borderRadius: 2,
              color: '#eee',
              padding: 3,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
              textShadowColor: '#222'
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic'
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              formatter: function (value) {
                value = (value + '').split('.')
                value.length < 2 && (value.push('00'))
                return ('00' + value[0]).slice(-2) +
                        '.' + (value[1] + '00').slice(0, 2)
              },
              fontWeight: 'bolder',
              borderRadius: 3,
              backgroundColor: '#444',
              borderColor: '#aaa',
              shadowBlur: 5,
              shadowColor: '#333',
              shadowOffsetX: 0,
              shadowOffsetY: 3,
              borderWidth: 2,
              textBorderColor: '#000',
              textBorderWidth: 2,
              textShadowBlur: 2,
              textShadowColor: '#fff',
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              fontFamily: 'Arial',
              width: 60,
              color: '#eee',
              rich: {}
            },
            data: [{ value: 40, name: 'km/h' }]
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
    height: 100%;
  }
}
</style>
