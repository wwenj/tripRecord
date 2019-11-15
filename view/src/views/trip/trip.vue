<template>
  <div class="trip">
    <!-- <MapLocation></MapLocation> -->
    <div v-show="$route.name !== 'Map'" class="trip-box">
      <img class="trip-bg" src="../../assets/img/bg.jpg" alt>
      <div class="trip-con">
        <md-tabs v-model="TripWay">
          <md-tab-pane name="徒步" label="徒步"></md-tab-pane>
          <md-tab-pane name="跑步" label="跑步"></md-tab-pane>
          <md-tab-pane name="骑行" label="骑行"></md-tab-pane>
          <md-tab-pane name="自驾" label="自驾"></md-tab-pane>
        </md-tabs>
        <div class="trip-border">
          <p>累计{{TripWay}}</p>
          <strong>{{distance}}</strong>
          <p>本月{{TripWay}}{{distance}}公里>></p>
        </div>
        <div class="trip-start" @click="tripStartOnClick">开始{{TripWay}}</div>
      </div>
    </div>
    <transition name="fademap">
      <div v-if="$route.name === 'Map'" class="trip-map">
        <router-view/>
      </div>
    </transition>
  </div>
</template>
<script>
// import { Tabs, TabPane, Button } from 'mand-mobile'
import { mapGetters } from 'vuex'
export default {
  name: 'trip',
  data () {
    return {
      TripWay: '徒步', // 出行方式
      // allDistanceData: null, // 当前出行总里程
      distance: '0.0',
      wayData: {
        p1: '徒步',
        p2: '跑步',
        p3: '骑行',
        p4: '自驾'
      }
    }
  },
  computed: {
    allDistanceData () {
      return this.userDistance
    },
    ...mapGetters(['userDistance'])
  },
  watch: {
    '$route' (to) {
      this.updataDistance(this.TripWay)
    },
    TripWay: {
      handler (val) {
        this.updataDistance(val)
      },
      immediate: true
    }
  },
  methods: {
    updataDistance (val) {
      switch (val) {
        case '徒步':
          this.distance = this.allDistanceData.allWalk
          break
        case '跑步':
          this.distance = this.allDistanceData.allRun
          break
        case '骑行':
          this.distance = this.allDistanceData.allCycle
          break
        case '自驾':
          this.distance = this.allDistanceData.allDrive
          break
      }
    },
    tripStartOnClick () {
      this.$router.push({ name: 'Map', params: { tripType: this.TripWay } })
    }
    /** ajax */
    // allDistanceAjax () {
    //   this.$http.get('/trip/allDistance', {}).then(res => {
    //     this.allDistanceData = res.data.data
    //     this.distance = this.allDistanceData.allWalk
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.trip {
  width: 100%;
  height: calc(100% - 100px);
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
.fademap-enter {
  opacity: 0;
}
.fademap-enter-active {
  transition: all 0.3s;
}
.fademap-leave-to {
  opacity: 0;
}
.fademap-leave-active {
  transition: all 0.3s;
}
</style>
<style lang="scss">
.md-tab-bar {
  background-color: transparent;
}
</style>
