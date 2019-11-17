<template>
  <div class="detail">
    <div id="map"></div>
    <div v-if="this.data.type === 'trip'" class="detail-con">
      <p class="detail-con-title">
        <span>{{data.tripType}}</span>
        <span>{{data.date}}</span>
      </p>
      <h2>
        <span>{{data.distance}}</span>
        公里
      </h2>
      <div class="detail-con-detail">
        <p>
          <span>{{data.time}}</span>
          <br>
          <span>总计时间</span>
        </p>
        <p>
          <span>{{data.speed}}</span>
          <br>
          <span>平均配速(km/h)</span>
        </p>
        <p>
          <span>{{data.Calorie}}</span>
          <br>
          <span>消耗能量(k)</span>
        </p>
      </div>
      <p class="detail-con-mark">
        <span>备注：</span>
        <span>{{data.mark}}</span>
      </p>
    </div>
    <div v-if="this.data.type === 'traffic'" class="detail-con">
      <p class="detail-con-title">
        <span>{{data.tripType}}</span>
        <span>{{data.date}}</span>
      </p>
      <div class="detail-con-place">
        <span>{{data.startPlace}}</span>
        <svg-icon class="place-svg" icon-class="place-right"/>
        <span>{{data.endPlace}}</span>
      </div>
      <div class="detail-con-detail">
        <p>
          <span>{{data.time}}</span>
          <br>
          <span>出发时间</span>
        </p>
        <p>
          <span>{{data.price}}元</span>
          <br>
          <span>行程花费(RMB)</span>
        </p>
        <p>
          <span>{{data.distance}}</span>
          <br>
          <span>里程(km)</span>
        </p>
      </div>
      <p class="detail-con-mark">
        <span>备注：</span>
        <span>{{data.mark}}</span>
      </p>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mand-mobile'
export default {
  name: 'historyDetails',
  data () {
    return {
      map: null,
      isPopupShow: true,
      data: {}
      // geolocationData: [[116.306295, 40.053034], [116.319802, 39.98294]]
    }
  },
  mounted () {
    this.data = this.$route.params
    console.log(this.$route)
    // console.log(this.$route)
    this.initMap()
    if (this.data.type === 'trip') {
      // 画行走轨迹图
      this.mapPath()
    }
    if (this.data.type === 'traffic') {
      // 或路线规划图
      this.searchDriving()
    }
    // this.data.date = this.data.date.slice(0, 10)
  },
  methods: {
    initMap () {
      this.map = new window.AMap.Map('map', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 11, // 初始化地图层级
        center: [126.56092959999998, 43.920187299999995] // 初始地图中心点
      })
    },
    // 移动轨迹图
    mapPath () {
      let that = this
      let lineArr = this.data.trajectory.slice()
      let marker = new window.AMap.Marker({
        map: that.map,
        position: lineArr[0],
        icon: 'https://webapi.amap.com/images/car.png',
        offset: new window.AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90
      })

      // 绘制轨迹
      let polyline = new window.AMap.Polyline({
        map: that.map,
        path: lineArr,
        showDir: true,
        strokeColor: '#28F', // 线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 // 线宽
        // strokeStyle: "solid"  //线样式
      })

      let passedPolyline = new window.AMap.Polyline({
        map: that.map,
        // path: lineArr,
        strokeColor: 'red', // 线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 // 线宽
        // strokeStyle: "solid"  //线样式
      })

      marker.on('moving', function (e) {
        passedPolyline.setPath(e.passedPath)
      })

      that.map.setFitView()
      marker.moveAlong(lineArr, 200)
    },
    // 查找路线
    searchDriving (LngLatArr) {
      this.ToastHide('正在规划路线...')
      let that = this
      //   let type = that.tripTypeMarriage.slice(5, 15)
      //   console.log(type)
      this.map.plugin('AMap.Transfer', function () {
        that.driving = new window.AMap.Transfer({
          map: that.map,
          city: '北京市',
          //   panel: 'panel',
          autoFitView: true
          //   policy: window.AMap.TransferPolicy.LEAST_TIME
        })
        // 根据起终点经纬度规划驾车导航路线
        that.driving.search(
          //   LngLatArr[0],
          //   LngLatArr[1],
          //   new window.AMap.LngLat(116.291035, 39.907899),
          //   new window.AMap.LngLat(116.427281, 39.903719),
          new window.AMap.LngLat(
            that.data.startCode[0],
            that.data.startCode[1]
          ),
          new window.AMap.LngLat(that.data.endCode[0], that.data.endCode[1]),
          function (status, result) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            Toast.hide()
            console.log(status, result)
            if (status === 'complete') {
              console.log('绘制驾车路线完成')
              that.panelListShow = true
              //   that.isPanelShow = true
            } else {
              console.log('获取驾车数据失败：' + result)
              Toast.failed('未检测到匹配路线')
            }
          }
        )
        // window.AMap.event.addListener(that.driving, 'complete', function (e) {
        //   console.log(e)
        // }) // 返回定位出错信息
      })
    },
    // 定时取消Toast
    ToastHide () {
      setTimeout(() => {
        Toast.hide()
      }, 15000)
    }
  }
}
</script>
<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  color: #555555;
}
.detail-con {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  // height: 500px;
  padding: 40px;
  box-sizing: border-box;
  background: #ffffffe7;
  box-shadow: 0px 4px 20px #acaaaa;
  &-title {
    font-size: 30px;
    display: flex;
    justify-content: space-between;
  }
  h2 {
    text-align: center;
    font-style: oblique;
    font-size: 30px;
    vertical-align: bottom;
    margin-top: 20px;
    // margin-top: 40px;
    span:nth-child(1) {
      font-size: 150px;
      font-weight: bold;
    }
  }
  &-place{
    text-align: center;
    margin-top: 40px;
    font-size: 40px;
    color: #252525;
    font-weight: bold;
    .place-svg{
      padding: 0 30px;
    }
  }
  &-detail {
    margin-top: 60px;
    display: flex;
    justify-content: space-around;
    p {
      text-align: center;
      span:nth-child(1) {
        display: inline-block;
        height: 40px;
        font-size: 30px;
        font-weight: bold;
      }
      span:nth-child(3) {
        font-size: 24px;
        font-style: initial;
      }
    }
  }
  &-mark {
    margin-top: 40px;
    span:nth-child(1) {
      color: #252525;
    }
  }
}
#map {
  width: 100%;
  height: calc(100%-250px);
  margin-top: 300px;
}
</style>
