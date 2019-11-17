<template>
  <div class="history-box">
    <div class="history" v-if="$route.name === 'History'">
      <div class="history-title" style="z-index:200">
        <span>出行历史</span>
        <svg-icon class="title-svg" icon-class="history-list" />
      </div>
      <div class="box"></div>
      <md-field>
        <md-cell-item
          @click="historyDetailsOnClick(item)"
          v-for="(item,index) in historyList"
          :key="index"
          :title="item.tripType"
          :brief="item.startPlace?`${item.startPlace}—${item.endPlace}`:`行程${item.distance}公里`"
          :addon="item.date"
          arrow
        />
      </md-field>
    </div>
    <div v-show="$route.name === 'Details'" class="trip-map">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'History',
  data () {
    return {
      historyList: []
    }
  },
  mounted () {
    this.historyListOnPatch()
  },
  methods: {
    /** action */
    historyDetailsOnClick (item) {
      // this.$router.push({ path: '/history/details', query: item })
      this.$router.push({ name: 'Details', params: item })
    },
    /** ajax */
    historyListOnPatch () {
      let that = this
      this.$http.get('/trip/historyList', {}).then(res => {
        that.historyList = res.data.data
        that.historyList.forEach(item => {
          item.date = item.date
            .slice(0, 10)
            .split('-')
            .join('/')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.history-box {
  width: 100%;
  height: 100%;
}
.history {
  width: 100%;
  height: calc(100% - 100px);
  overflow: auto;
  &-title {
    width: 100%;
    color: #363030;
    font-size: 36px;
    padding: 40px 40px 30px 40px;
    box-sizing: border-box;
    font-weight: bold;
    position: fixed;
    background: #ffffff;
    z-index: 200;
    top: 0;
    left: 0;
    .title-svg {
      margin-left: 10px;
    }
  }
  .box {
    height: 90px;
  }
}
  .trip-map {
    width: 100%;
    height: 100%;
  }
</style>
<style lang="scss">
.history {
  .md-field {
    padding: 0px 5.33vw;
  }
}
</style>
