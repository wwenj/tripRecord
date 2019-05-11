<template>
  <div class="trip">
    <!-- <MapLocation></MapLocation> -->
    <div v-if="$route.name !== 'Map'" class="trip-box">
      <img class="trip-bg" src="../../assets/img/bg.png" alt>
      <div class="trip-con">
        <md-tabs v-model="TripWay">
          <md-tab-pane name="p1" label="徒步"></md-tab-pane>
          <md-tab-pane name="p2" label="跑步"></md-tab-pane>
          <md-tab-pane name="p3" label="骑行"></md-tab-pane>
          <md-tab-pane name="p4" label="自驾"></md-tab-pane>
        </md-tabs>
        <div class="trip-border">
          <p>累计{{wayData[TripWay]}}</p>
          <strong>0.0</strong>
          <p>本月{{wayData[TripWay]}}0.0公里>></p>
        </div>
        <div class="trip-start" @click="tripStartOnClick">开始{{wayData[TripWay]}}</div>
      </div>
    </div>
    <div v-else class="trip-map">
      <router-view/>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane, Button } from 'mand-mobile'
import MapLocation from 'components/MapLocation/index'
export default {
  name: 'trip',
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Button.name]: Button,
    MapLocation: MapLocation
  },
  data () {
    return {
      TripWay: 'p1', // 出行方式
      wayData: {
        p1: '徒步',
        p2: '跑步',
        p3: '骑行',
        p4: '自驾'
      }
    }
  },
  mounted () {
    console.log(this.$route)
  },
  methods: {
    tripStartOnClick () {
      console.log('-=-=')
      this.$router.push({ path: '/trip/map' })
    }
  }
}
</script>

<style lang="scss" scoped>
.trip {
  width: 100%;
  height: 100%;
  position: relative;
  .trip-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
  }
  .trip-con {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .trip-border {
    width: 450px;
    height: 450px;
    border-radius: 450px;
    margin: 100px auto;
    border: 8px dashed #c5d1d3;
    border-bottom: none;
    p:nth-child(1) {
      text-align: center;
      margin-top: 80px;
      color: #4e4956;
      font-size: 33px;
      letter-spacing: 2px;
    }
    strong {
      display: block;
      text-align: center;
      margin-top: 35px;
      color: #4e4956;
      font-size: 130px;
    }
    p:nth-child(3) {
      text-align: center;
      margin-top: 35px;
      color: #9a9b9b;
      font-size: 28px;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .trip-start {
    width: 500px;
    height: 90px;
    border-radius: 90px;
    margin: auto;
    background: #57c595;
    text-align: center;
    line-height: 90px;
    color: #ffffff;
    font-size: 33px;
    letter-spacing: 2px;
  }
  .trip-map {
    widows: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss">
.md-tab-bar {
  background-color: transparent;
}
</style>
