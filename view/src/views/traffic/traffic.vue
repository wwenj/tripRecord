<template>
  <div class="traffic">
    <div id="container"></div>
    <div class="search">
      <md-field>
        <md-input-item
          @focus="searchOnFocus('start')"
          @blur="searchOnBlur"
          v-model="searchStart"
          ref="name"
          title="出发点"
          placeholder="请输入出发点"
          clearable
          is-title-latent
        ></md-input-item>
        <!-- is-title-latent -->
        <md-input-item
          @focus="searchOnFocus('objective')"
          @blur="searchOnBlur"
          v-model="searchObjective"
          ref="id"
          title="目的地"
          placeholder="请输入目的地"
          clearable
          is-title-latent
        ></md-input-item>
      </md-field>
      <md-button
        class="search-btn1"
        type="primary"
        plain
        @click="trafficTypeOnClick"
      >{{trafficType.slice(0, 2)}}</md-button>
      <md-button class="search-btn2" type="primary" @click="searchOnClick">搜索</md-button>
    </div>
    <div class="search-list" :id="searchListShow?'searchList':''">
      <p @click="searchResultDown" class="up-btn">
        <svg-icon class="up-svg" icon-class="down"/>
      </p>
      <md-field>
        <md-cell-item
          v-for="(item,index) in searchResult"
          :key="index"
          @click="searchResultListOnClick(item)"
          :title="item.name"
          :brief="typeof item.address==='string'?item.address:item.district"
        />
      </md-field>
      <div class="no-result" v-if="searchResult.length === 0">
        <md-result-page></md-result-page>
      </div>
    </div>
    <div v-if="isPanelShow" class="panel-list" :id="panelListShow?'panelList':''">
      <!-- <p class="up-btn">
        <svg-icon v-if="!panelListShow" class="up-svg" icon-class="up"/>
        <svg-icon v-else class="up-svg" icon-class="down"/>
      </p>-->
      <p @click="panelListAuto" class="panel-list-title">
        <span>请选择合适路线</span>
        <svg-icon v-if="!panelListShow" class="up-svg" icon-class="up"/>
        <svg-icon v-else class="up-svg" icon-class="down"/>
        <span class="sure-btn" @click.stop="panelSureOnClick">确定</span>
      </p>
      <div id="panel"></div>
    </div>
    <!-- 确认层 -->
    <md-dialog
      title="本次出行"
      :closable="true"
      v-model="sureDialog"
      :btns="btnDialog"
    >
      <md-field class="dialog-field">
        <md-detail-item title="交通公交" :content="trafficType" bold/>
        <md-detail-item title="出发地" :content="searchStart"/>
        <md-detail-item title="目的地" :content="searchObjective"/>
        <!-- <md-detail-item title="花费" content="5元"/> -->
        <md-field-item title="花费">
          <md-stepper slot="right" v-model="spendValue" min="0"/>
        </md-field-item>
        <md-detail-item title="日期" :content="dateTime"/>
        <md-input-item
          id="markText"
          v-model="markText"
          title="备注"
          placeholder="点此输入备注，少于20字"
          :maxlength="20"
        ></md-input-item>
      </md-field>
    </md-dialog>
    <!-- 选择出行方式 -->
    <md-popup v-model="tripTypePopupShow" position="top">
      <div class="traffic-type">
        <md-field title="选择出行工具" class="radio-field">
          <md-radio-list
            @change="trafficTypeOnChange"
            :options="reasons"
            v-model="tripTypeMarriage"
            icon="right"
            icon-inverse
            icon-disabled
            icon-position="right"
          />
        </md-field>
      </div>
    </md-popup>
  </div>
</template>
<script>
// import { setTimeout, clearTimeout } from 'timers'
import { Toast } from 'mand-mobile'
import { getTime } from 'utils/validate.js'
import { mapActions } from 'vuex'
export default {
  name: 'traffic',
  data () {
    return {
      spendValue: 0, // 出行花费
      trafficMap: null, // 地图实例
      searchState: 'start', // 当前聚焦状态start,Objective
      searchStart: '', // 出发地
      searchStartData: {}, // 确认出发点信息
      searchObjective: '', // 目的地
      searchObjectiveData: {}, // 确认目的地信息
      timer: null, // 防抖定时器
      searchResult: [], // 搜索结果
      searchListShow: false,
      watchStop: false, // 停止监视
      panelListShow: false,
      isPanelShow: false,
      driving: null, // 规划路径实例
      tripTypePopupShow: false, // 出行方式
      tripTypeMarriage: 'AMap.Transfer',
      trafficType: '公交/地铁',
      markText: '', // 备注
      sureDialog: false, // 确认出行信息
      dateTime: getTime().date3,
      distance: '0', // 第一条规划线路的路程
      btnDialog: [
        {
          text: '确认保存',
          handler: this.onIconConfirm
        }
      ],
      reasons: [
        {
          value: 'AMap.Transfer',
          text: '公交/地铁'
        },
        {
          value: 'AMap.Driving',
          text: '出租车'
        },
        {
          value: 'AMap.Riding',
          text: '单车/电车'
        },
        {
          value: 'AMap.Walking',
          text: '步行'
        }
      ]
    }
  },
  watch: {
    searchStart (val) {
      this.searchKeyBefore(val)
    },
    searchObjective (val) {
      this.searchKeyBefore(val)
    },
    searchListShow (val) {
      if (val) {
        this.panelListShow = false
      }
    },
    panelListShow (val) {
      if (val) {
        this.searchListShow = false
      }
    }
  },
  mounted () {
    this.init()
    this.loactionMap()
    // this.searchDriving()
    // this.searchKey()
  },
  methods: {
    /** action */
    // 搜索框聚焦
    searchOnFocus (e) {
      this.searchState = e
      this.searchResult = []
      this.searchListShow = true
      if (e === 'start') {
        this.searchKeyBefore(this.searchStart)
      } else {
        this.searchKeyBefore(this.searchObjective)
      }
    },
    // 失焦
    searchOnBlur () {
      //   this.searchResult = []
    },
    // 放下搜索页
    searchResultDown () {
      this.searchListShow = false
    },
    // 点击搜索结果列表
    searchResultListOnClick (item) {
      console.log(item)
      if (this.searchState === 'start') {
        this.searchStartData = item
        this.searchStart = item.name
      } else {
        this.searchObjectiveData = item
        this.searchObjective = item.name
      }
      this.searchListShow = false // 放下结果页
      this.watchStop = true // 本轮停止请求
    },
    // 选择出行方式
    trafficTypeOnClick () {
      this.tripTypePopupShow = true
    },
    // 选中出行方式
    trafficTypeOnChange (e) {
      this.trafficType = e.text
      this.tripTypePopupShow = false
    },
    // 点击搜索路线
    searchOnClick () {
      if (this.driving) {
        this.driving.clear()
      }
      let tmpArr = []
      if (
        !this.searchStartData.location ||
        !this.searchObjectiveData.location
      ) {
        Toast.failed('请先在列表中确认准确地点')
        return
      }
      tmpArr.push(this.searchStartData.location)
      tmpArr.push(this.searchObjectiveData.location)
      this.isPanelShow = true
      this.searchDriving(tmpArr)
    },
    // 确定路线
    panelSureOnClick () {
      this.panelListShow = false
      this.sureDialog = true
      this.dateTime = getTime().date3
    },
    // 规划路线列表显隐
    panelListAuto () {
      this.panelListShow = !this.panelListShow
    },
    // 确认信息
    onIconConfirm () {
      this.saveTripDataAjax()
      this.sureDialog = false
      // 清除信息
      this.driving.clear()
      this.searchStart = '' // 出发地
      this.searchStartData = {} // 确认出发点信息
      this.searchObjective = '' // 目的地
      this.searchObjectiveData = {}
      this.isPanelShow = false
    },
    init () {
      this.trafficMap = new window.AMap.Map('container', {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 13 // 地图显示的缩放级别
      })
    },
    /** private */
    // 请求搜索关键字
    searchKeyBefore (val) {
      let that = this
      if (val === '') return
      if (this.watchStop) {
        this.watchStop = false
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(function () {
        that.searchKey(val)
      }, 500)
    },
    // 搜索关键字
    searchKey (keyword) {
      //   Toast.loading('正在搜索...')
      this.ToastHide('正在搜索...')
      let that = this
      this.trafficMap.plugin('AMap.Autocomplete', function () {
        // 实例化Autocomplete
        var autoOptions = {
          // city 限定城市，默认全国
          city: '全国'
        }
        var autoComplete = new window.AMap.Autocomplete(autoOptions)
        autoComplete.search(keyword, function (status, result) {
          Toast.hide()
          // 搜索成功时，result即是对应的匹配数据
          console.log(status, result)
          if (status !== 'complete') {
            that.searchResult = []
            return
          }
          if (result.info !== 'OK') {
            that.searchResult = []
            return
          }
          that.searchResult = result.tips
        })
      })
    },
    // 查找路线
    searchDriving (LngLatArr) {
      console.log('LngLatArr')
      console.log(LngLatArr)
      this.ToastHide('正在规划路线...')
      let that = this
      let type = that.tripTypeMarriage.slice(5, 15)
      console.log(type)
      this.trafficMap.plugin(that.tripTypeMarriage, function () {
        that.driving = new window.AMap[type]({
          map: that.trafficMap,
          city: '北京市',
          panel: 'panel',
          autoFitView: true
          //   policy: window.AMap.TransferPolicy.LEAST_TIME
        })
        // 根据起终点经纬度规划驾车导航路线
        that.driving.search(
          LngLatArr[0],
          LngLatArr[1],
          //   new window.AMap.LngLat(116.291035, 39.907899),
          //   new window.AMap.LngLat(116.427281, 39.903719),
          function (status, result) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            Toast.hide()
            console.log(status, result)
            if (status === 'complete') {
              console.log('绘制驾车路线完成')
              that.panelListShow = true
              // 存第一条轨迹的路程
              if (result.plans) {
                that.distance = (result.plans[0].distance / 1000).toFixed(2)
              } else {
                that.distance = (result.routes[0].distance / 1000).toFixed(2)
              }
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
    // 定位
    loactionMap () {
      let that = this
      // this.ToastHide('定位中...')
      this.trafficMap.plugin(
        ['AMap.Geolocation', 'AMap.ControlBar'],
        function () {
          var geolocation = new window.AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 15000, // 超过10秒后停止定位，默认：5s
            buttonPosition: 'RB', // 定位按钮的停靠位置
            buttonOffset: new window.AMap.Pixel(100, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
          })
          // 定位插件---------------------------------------------------------
          that.trafficMap.addControl(geolocation)
          geolocation.getCurrentPosition(function (status, result) {
            // Toast.hide()
          })
          window.AMap.event.addListener(geolocation, 'error', function (e) {
            console.log(e)
          }) // 返回定位出错信息
        }
      )
    },
    // 定时取消Toast
    ToastHide (text) {
      Toast.loading(text)
      setTimeout(() => {
        Toast.hide()
      }, 15000)
    },
    /** ajax */
    // 保存出行数据
    saveTripDataAjax () {
      console.log('确认')
      let startCode = `${this.searchStartData.location.lng}, ${this.searchStartData.location.lat}`
      let endCode = `${this.searchObjectiveData.location.lng}, ${this.searchObjectiveData.location.lat}`
      let params = {
        type: 'traffic',
        tripType: this.trafficType,
        distance: this.distance,
        date: getTime().date2,
        time: getTime().date4,
        price: this.spendValue,
        startPlace: this.searchStart,
        endPlace: this.searchObjective,
        startCode: startCode,
        endCode: endCode,
        mark: this.markText || '未备注'
      }
      console.log(params)
      this.$http.get('/trip/addTraffic', params).then(res => {
        if (res.data.code === 200) {
          Toast.succeed('本次出行记录已上传')
          this.setUserData(res.data.data)
        } else {
          Toast.failed('记录上传出错')
        }
      })
    },
    ...mapActions(['setUserData'])
  }
}
</script>
<style lang="scss">
.traffic {
  width: 100%;
  height: calc(100% - 100px);
  overflow: hidden;
  position: relative;
  .search {
    width: 100%;
    position: absolute;
    top: 0px;
    right: 0px;
    box-sizing: border-box;
    box-shadow: 0px 8px 30px #929090;
    background: #ffffff;
    .search-btn1 {
      width: 140px;
      height: 45%;
      border-radius: 10px;
      position: absolute;
      top: 5%;
      right: 10px;
      //   transform: translateY(-50%);
      z-index: 100;
    }
    .search-btn2 {
      width: 140px;
      height: 45%;
      border-radius: 10px;
      position: absolute;
      top: 52%;
      right: 10px;
      //   transform: translateY(-50%);
      z-index: 100;
    }
  }
  .search-list {
    position: absolute;
    left: 0;
    top: 280px;
    width: 100%;
    height: calc(100%-280px);
    transform: translateY(130%);
    transition: all 0.3s;
    overflow: auto;
    background: #ffffffe1;
    .no-result {
      margin-top: 120px;
    }
  }
  .panel-list {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60%;
    padding: 0 20px;
    box-sizing: border-box;
    transform: translateY(90%);
    transition: all 0.3s;
    overflow: auto;
    background: #ffffffe8;
    box-shadow: 0px -3px 30px #929090;
    &-title {
      width: 100%;
      background: #ffffff;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      line-height: 80px;
      color: #929090;
      font-size: 20px;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f1efef;
      .sure-btn {
        width: 100px;
        height: 50px;
        color: #ffffff;
        text-align: center;
        line-height: 50px;
        border-radius: 10px;
        background: #2f86f6;
      }
      .up-svg {
        // position: absolute;
        // top: 0;
        // left: 50%;
        margin-left: -65px;
        font-size: 40px;
      }
    }
  }
  .traffic-type {
    width: 100%;
    // height: 600px;
    background: #ffffff;
    box-shadow: 0px 10px 30px #929090;
  }
}
.up-btn {
  padding-top: 15px;
  display: flex;
  justify-content: center;
  .up-svg {
    font-size: 40px;
  }
}
.dialog-field {
  padding: 0px !important;
}
#container {
  width: 100%;
  height: calc(100%-200px);
  margin-top: 250px;
}
#panel {
  width: 100%;
  margin-top: 38px;
}
#searchList {
  transform: translateY(0);
  transition: all 0.3s;
}
#panelList {
  transform: translateY(0);
  transition: all 0.3s;
}
</style>
<style lang="scss">
.traffic {
  .md-dialog-body {
    color: #858b9c;
    font-size: 16px;
  }
  .amap-lib-transfer {
    border: none;
  }
  .amap-geolocation-con {
    right: 10px !important;
    bottom: 150px !important;
  }
}
.search-list {
  .md-field {
    background: transparent;
  }
}
.search {
  .md-field {
    width: calc(100%-200px);
    padding: 0 40px 20px 40px;
  }
}
.md-stepper-button.md-stepper-button-add:before {
  content: "";
}
.dialog-field {
  .md-field-item-content:before {
    background-color: transparent;
  }
  .md-field-item-title {
    font-size: 3.733vw;
  }
  .md-field-item-content {
    min-height: 0;
    padding: 12px 0;
  }
}
#markText {
  .md-input-item-fake,
  .md-input-item-input {
    height: 4.5vw;
    color: #41485d;
    font-size: 3.733vw;
  }
  .md-input-item-input {
    text-align: right;
  }
}
</style>
