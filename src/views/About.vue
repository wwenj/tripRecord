<template>
  <div class="map">
    <div id="map"></div>
    <md-button type="primary" @click="mapOnDelete">停止实时定位</md-button>
    <md-button type="primary" @click="mapPath">轨迹图</md-button>
    <md-button type="primary" @click="pathSimplifier">巡航图</md-button>
  </div>
</template>

<script>
import { Button, Toast } from 'mand-mobile'
export default {
  name: 'mapLocation',
  components: {
    [Button.name]: Button
  },
  mounted () {
    this.createTrip()
    this.watchMap()
    setTimeout(() => {
      Toast.hide()
    }, 15000)
  },
  data () {
    return {
      map: null,
      watchID: null // 实时监听
    }
  },
  methods: {
    watchMap () {
      let that = this
      this.watchID = navigator.geolocation.watchPosition(
        function (position) {
          console.log('实时定位中---')
          let gps = position.coords
          console.log([gps.latitude, gps.longitude])
        //   window.AMap.convertFrom([gps.latitude, gps.longitude], 'gps', function (status, result) {
        //     console.log(result)
        //   })
        },
        function () {
          Toast.failed('实时定位出错，请尝试刷新')
          that.mapOnDelete()
        }
      )
    },
    createTrip () {
      Toast.loading('加载中...')
      let that = this
      this.map = new window.AMap.Map('map', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        // mapStyle: 'amap://styles/light', // 设置地图的显示样式
        zoom: 11, // 初始化地图层级
        // viewMode: '3D', // 地图模式
        // pitch: 75, // 地图俯仰角度，有效范围 0 度- 83 度
        center: [126.60421, 43.83378] // 初始地图中心点
      })
      this.map.plugin(['AMap.Geolocation', 'AMap.ControlBar'], function () {
        var geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：5s
          buttonPosition: 'RB', // 定位按钮的停靠位置
          buttonOffset: new window.AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
        })
        // 定位插件---------------------------------------------------------
        that.map.addControl(geolocation)
        geolocation.getCurrentPosition(function (status, result) {
          Toast.hide()
          if (status === 'complete') {
            console.log('定位成功')
            console.log(result)
          } else {
            console.log('定位失败')
            console.log(result)
          }
        })
        window.AMap.event.addListener(geolocation, 'complete', that.localOnComplete) // 返回定位信息
        window.AMap.event.addListener(geolocation, 'error', that.localOnError) // 返回定位出错信息
        // 罗盘插件---------------------------------------------------------
        that.map.addControl(new window.AMap.ControlBar())
      })
      this.map.on('complete', function () {
        // 地图图块加载完成后触发
        console.log('地图加载完成')
      })
    },
    // 监听手动定位成功
    localOnComplete (e) {
      console.log('手动定位成功')
      console.log(e)
    },
    // 手动定位失败
    localOnError (e) {
      console.log('手动定位出错')
      console.log(e)
      Toast.failed('定位出错请尝试刷新')
    },
    // 停止实时定位
    mapOnDelete () {
      // this.map.destroy()
      let that = this
      navigator.geolocation.clearWatch(that.watchID)
      console.log('停止实时定位')
    },
    // 移动轨迹图
    mapPath () {
      let that = this
      var lineArr = [[126.567402, 43.923187], [126.567402, 43.923129], [126.56744, 43.923098], [126.56759, 43.923024], [126.567794, 43.923024], [126.567928, 43.922912], [126.568169, 43.922819], [126.568486, 43.922723], [126.568598, 43.922881], [126.568727, 43.923074], [126.56884, 43.92319], [126.569274, 43.923055], [126.569564, 43.92348], [126.569859, 43.923944], [126.569172, 43.924199]]
      // var arr = []// 经纬度坐标数组
      // arr.push(new window.AMap.LngLat('116.368904', '39.913423'))
      // arr.push(new window.AMap.LngLat('116.382122', '39.901176'))
      // arr.push(new window.AMap.LngLat('116.387271', '39.912501'))
      // arr.push(new window.AMap.LngLat('116.398258', '39.904600'))
      // arr.push(new window.AMap.LngLat('116.427097', '39.912500'))
      // console.log(Math.round(window.AMap.GeometryUtil.distanceOfLine(arr)))
      var marker = new window.AMap.Marker({
        map: that.map,
        position: [126.567402, 43.923187],
        icon: 'https://webapi.amap.com/images/car.png',
        offset: new window.AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90
      })

      // 绘制轨迹
      var polyline = new window.AMap.Polyline({
        map: that.map,
        path: lineArr,
        showDir: true,
        strokeColor: '#28F', // 线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 // 线宽
        // strokeStyle: "solid"  //线样式
      })

      var passedPolyline = new window.AMap.Polyline({
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
    // 巡航图
    pathSimplifier () {
      let that = this
      window.AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier, $) {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }

        var pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          // autoSetFitView:false,
          map: that.map, // 所属的地图实例

          getPath: function (pathData, pathIndex) {
            var points = pathData.points
            var lnglatList = []

            for (var i = 0, len = points.length; i < len; i++) {
              lnglatList.push(points[i].lnglat)
            }

            return lnglatList
          },
          getHoverTitle: function (pathData, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
              // point
              return pathData.name + '，' + pathData.points[pointIndex].name
            }

            return pathData.name + '，点数量' + pathData.points.length
          },
          renderOptions: {

            renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
          }
        })

        window.pathSimplifierIns = pathSimplifierIns

        // 设置数据
        pathSimplifierIns.setData([{
          name: '路线0',
          points: [{
            name: '点a',
            lnglat: [116.405289, 39.904987]
          }, {
            name: '点b',
            lnglat: [113.964458, 40.54664]
          }, {
            name: '点c',
            lnglat: [111.47836, 41.135964]
          }, {
            name: '点d',
            lnglat: [108.949297, 41.670904]
          }, {
            name: '点e',
            lnglat: [106.380111, 42.149509]
          }, {
            name: '点f',
            lnglat: [103.774185, 42.56996]
          }, {
            name: '点g',
            lnglat: [101.135432, 42.930601]
          }, {
            name: '点h',
            lnglat: [98.46826, 43.229964]
          }, {
            name: '点i',
            lnglat: [95.777529, 43.466798]
          }, {
            name: '点j',
            lnglat: [93.068486, 43.64009]
          }, {
            name: '点k',
            lnglat: [90.34669, 43.749086]
          }, {
            name: '点l',
            lnglat: [87.61792, 43.793308]
          }]
        }])

        // 选中路线0
        var navg0 = pathSimplifierIns.createPathNavigator(0, {
          loop: true, // 循环播放
          speed: 1000000
        })
        navg0.start()
        pathSimplifierIns.on('pointClick', function (e, info) {
          console.log('Click: ' + info.pathData.points[info.pointIndex].name)
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
