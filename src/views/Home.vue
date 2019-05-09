<template>
  <div class="main">
    <div id="home"></div>
    <md-button type="primary" @click="mapOnDelete">删除</md-button>
  </div>
</template>

<script>
import { Button } from 'mand-mobile'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    [Button.name]: Button
  },
  mounted () {
    this.createTrip()
    this.init2()
    // console.log(this.id)
  },
  data () {
    return {
      map: null,
      watchID: null // 实时监听
    }
  },
  computed: {
    ...mapGetters(['id'])
  },
  methods: {
    init () {
      this.setId('wangwenj')
      let params = {
        name: 'wang',
        age: 'wen'
      }
      this.$http
        .get('http://yapi.demo.qunar.com/mock/63722/home', params)
        .then(res => {
          console.log(res)
        })
      this.$http
        .post('http://yapi.demo.qunar.com/mock/63722/about', params)
        .then(res => {
          console.log(res)
        })
    },
    init2 () {
      console.log('----')
      this.watchID = navigator.geolocation.watchPosition(function (position) {
        console.log('定位中---')
        console.log(position)
      })
    },
    createTrip () {
      let that = this
      this.map = new window.AMap.Map('home', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        mapStyle: 'amap://styles/light', // 设置地图的显示样式
        zoom: 11, // 初始化地图层级
        viewMode: '3D', // 地图模式
        center: [43.924061, 126.56971], // 初始化地图中心点
        pinch: 45
      })
      // this.map.plugin('AMap.Geolocation', function () {
      //   var geolocation = new window.AMap.Geolocation({
      //     enableHighAccuracy: true, // 是否使用高精度定位，默认:true
      //     timeout: 10000, // 超过10秒后停止定位，默认：5s
      //     buttonPosition: 'RB', // 定位按钮的停靠位置
      //     buttonOffset: new window.AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //     zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点

      //   })
      //   that.map.addControl(geolocation)
      //   geolocation.getCurrentPosition(function (status, result) {
      //     if (status === 'complete') {
      //       console.log('高德定位成功')
      //       console.log(result)
      //     } else {
      //       console.log('定位失败')
      //       console.log(result)
      //     }
      //   })
      //   // window.AMap.event.addListener(geolocation, 'complete', onComplete)// 返回定位信息
      //   // window.AMap.event.addListener(geolocation, 'error', onError) // 返回定位出错信息
      // })
      // that.map.plugin([
      //   'AMap.ControlBar'
      // ], function () {
      //   // 添加 3D 罗盘控制
      //   that.map.addControl(new window.AMap.ControlBar())
      // })
      this.map.on('complete', function () {
      //   // 地图图块加载完成后触发
        console.log('地图加载完成')
      //   window.AMap.plugin([
      //     'AMap.ControlBar'
      //   ], function () {
      //     // 添加 3D 罗盘控制
      //     this.map.addControl(new window.AMap.ControlBar())
      //   })
      })
    },
    mapOnDelete () {
      // this.map.destroy()
      let that = this
      navigator.geolocation.clearWatch(that.watchID)
      console.log('停止实时定位')
    },
    ...mapActions(['setId'])
  }
}
</script>
<style lang="scss" scoped>
#home {
  width: 750px;
  height: 950px;
  box-sizing: border-box;
}
</style>
