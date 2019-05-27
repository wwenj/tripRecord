<template>
  <div class="trend">
    <div class="trend-title">
      <h2>出行趋势</h2>
      <p>最近七天内，2种行程，8种出行方式的里程趋势折线图</p>
       <!-- <md-notice-bar
      mode="closable"
      icon="volumn"
    >最近七天内，2种行程，8种出行方式的出行趋势</md-notice-bar> -->
    </div>
    <lineChart ref="echart1" class="trend-echart" ></lineChart>
    <lineChart ref="echart2" class="trend-echart-btm" ></lineChart>
  </div>
</template>
<script>
import lineChart from './lineChart'
export default {
  name: 'Trend',
  components: {
    lineChart
  },
  data () {
    return {
      chart: null,
      xAxisData: ['11日', '12日', '13日', '14日', '15日', '16日', '17日'],
      trafficData: null,
      tripData: null,
      data1: {
        title: '私人出行',
        legendData: ['跑步', '徒步', '骑行', '自驾'],
        seriesData: [
          {
            name: '徒步',
            type: 'line',
            stack: '里程',
            data: [20, 132, 101, 134, 90, 330, 210]
          },
          {
            name: '跑步',
            type: 'line',
            stack: '里程',
            data: [150, 232, 201, 454, 190, 330, 410]
          },
          {
            name: '骑行',
            type: 'line',
            stack: '里程',
            data: [90, 122, 151, 124, 200, 210, 190]
          },
          {
            name: '自驾',
            type: 'line',
            stack: '里程',
            data: [189, 102, 230, 410, 287, 180, 200]
          }
        ]
      },
      data2: {
        title: '公共交通',
        legendData: ['步行', '单车', '出租', '公交'],
        seriesData: [
          {
            name: '步行',
            type: 'line',
            stack: '里程',
            data: [90, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '单车',
            type: 'line',
            stack: '里程',
            data: [150, 292, 201, 154, 190, 330, 410]
          },
          {
            name: '出租',
            type: 'line',
            stack: '里程',
            data: [90, 122, 151, 84, 80, 210, 190]
          },
          {
            name: '公交',
            type: 'line',
            stack: '里程',
            data: [89, 82, 230, 210, 387, 280, 100]
          }
        ]
      },
      allData: null
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    // 重新封装数据，对接echart、
    updatefetchData () {
      let day = (new Date()).getDate()
      let tmpDate = {}
      let tmpItem = {}
      // this.allData.forEach((item) => {
      //   item.date = item.date.slice(8, 10)
      //   if (!tmpDate[item.date]) {
      //     tmpDate[item.date] = []
      //   }
      //   tmpDate[item.date].push(item)
      // })
      // console.log(tmpDate)
      this.allData.forEach((item) => {
        item.date = parseInt(item.date.slice(8, 10)) + 1
        item.tripType = item.tripType.slice(0, 2)
        if (!tmpItem[item.tripType]) {
          tmpItem[item.tripType] = {
            name: item.tripType,
            type: 'line',
            stack: '里程',
            data: {}
          }
          tmpItem[item.tripType].data[day] = 0
          tmpItem[item.tripType].data[day - 1] = 0
          tmpItem[item.tripType].data[day - 2] = 0
          tmpItem[item.tripType].data[day - 3] = 0
          tmpItem[item.tripType].data[day - 4] = 0
          tmpItem[item.tripType].data[day - 5] = 0
          tmpItem[item.tripType].data[day - 6] = 0
          tmpItem[item.tripType].data[item.date] = item.distance
        } else {
          let tmp = tmpItem[item.tripType].data[item.date]
          if (tmp) {
            tmpItem[item.tripType].data[item.date] = parseInt(tmp) + parseInt(item.distance)
          } else {
            tmpItem[item.tripType].data[item.date] = item.distance
          }
        }
      })
      // console.log(tmpItem)
      this.xAxisData = Object.keys(tmpItem['公交'].data).join().split(',')
      this.xAxisData.forEach((item, index) => {
        this.xAxisData[index] = item + '日'
      })
      for (let item in tmpItem) {
        tmpItem[item].data = Object.values(tmpItem[item].data).join().split(',')
      }
      console.log(tmpItem)
      this.trafficData = {
        title: '公共交通',
        legendData: ['步行', '单车', '出租', '公交'],
        seriesData: [tmpItem['步行'], tmpItem['单车'], tmpItem['出租'], tmpItem['公交']]
      }
      this.tripData = {
        title: '私人出行',
        legendData: ['徒步', '跑步', '骑行', '自驾'],
        seriesData: [tmpItem['徒步'], tmpItem['跑步'], tmpItem['骑行'], tmpItem['自驾']]
      }
      this.$refs.echart1.echartsUpdata(this.trafficData, this.xAxisData)
      this.$refs.echart2.echartsUpdata(this.tripData, this.xAxisData)
    },
    /** ajax */
    fetchData () {
      this.$http.get('/user/tripTrend', {}).then(res => {
        // console.log(res.data.data)
        this.allData = res.data.data
        this.updatefetchData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.trend {
  width: 100%;
  height: 100%;
  padding: 30px 30px;
  box-sizing: border-box;
  &-title {
    h2 {
      font-size: 40px;
      text-align: center;
    }
    p{
      color: #2f86f6;
      font-size: 25px;
      margin-top: 15px;
      text-align: center;
    }
  }
  &-echart{
    margin-top: 30px;
  }
  &-echart-btm{
    margin-top: 70px;
  }
}
</style>
