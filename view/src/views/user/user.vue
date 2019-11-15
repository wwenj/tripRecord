<template>
  <div class="user">
    <img class="user-bgimg" src="../../assets/img/user-bg.jpg">
    <div class="user-con">
      <div v-if="userData" class="user-title">
        <div class="user-title-top">
          <!-- <img src="../../assets/img/head.jpeg" alt> -->
          <img :src="userData.img" alt>
          <div class="user-title-top-con">
            <p>{{userData.name}}</p>
            <p>账号:{{userData.userName}}</p>
          </div>
        </div>
        <div class="user-title-bto">
          <p>
            <span>10</span>
            <span>好友</span>
          </p>
          <p>
            <span>23</span>
            <span>关注</span>
          </p>
          <p>
            <span>109</span>
            <span>粉丝</span>
          </p>
          <p>
            <span>2</span>
            <span>圈子</span>
          </p>
        </div>
      </div>
      <div class="user-tool">
        <div class="user-tool-title">我的信息</div>
        <div class="user-tool-box">
          <p @click="toDetailOnClick('userDetails')">
            <svg-icon class="img-svg" icon-class="mileage"/>
            <span>信息总览</span>
          </p>
          <p @click="toDetailOnClick('trend')">
            <svg-icon class="img-svg" icon-class="trend"/>
            <span>出行趋势</span>
          </p>
          <p @click="toDetailOnClick('analysis')">
            <svg-icon class="img-svg" icon-class="Analysis"/>
            <span>数据分析</span>
          </p>
          <p>
            <svg-icon class="img-svg" icon-class="Medal"/>
            <span>成就殿堂</span>
          </p>
        </div>
      </div>
      <div class="user-more">
        <div class="user-tool-title">更多功能</div>
        <div class="user-tool-box">
          <p>
            <svg-icon class="img-svg" icon-class="p1"/>
            <span>出行计划</span>
          </p>
          <p>
            <svg-icon class="img-svg" icon-class="p2"/>
            <span>好友排名</span>
          </p>
          <p>
            <svg-icon class="img-svg" icon-class="p3"/>
            <span>路况分析</span>
          </p>
          <p>
            <svg-icon class="img-svg" icon-class="p4"/>
            <span>交通补助</span>
          </p>
        </div>
        <div class="user-tool-box" style="margin-top:7vw;">
          <p>
            <svg-icon class="img-svg" icon-class="p5"/>
            <span>体重管理</span>
          </p>
          <p>
            <svg-icon class="img-svg" icon-class="p6"/>
            <span>周报</span>
          </p>
          <p>
            <svg-icon class="img-svg" icon-class="p7"/>
            <span>风险管控</span>
          </p>
          <p>
            <svg-icon class="img-svg" icon-class="p8"/>
            <span>运动课堂</span>
          </p>
        </div>
        <div class="user-tool-box" style="margin-top:7vw;">
          <p>
            <svg-icon class="img-svg" icon-class="p9"/>
            <span>智能硬件</span>
          </p>
          <p>
            <svg-icon class="img-svg" icon-class="p10"/>
            <span>心悦会员</span>
          </p>
          <p>
            <!-- <svg-icon class="img-svg" icon-class="Analysis"/> -->
            <span></span>
          </p>
          <p>
            <!-- <svg-icon class="img-svg" icon-class="Medal"/> -->
            <span></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'User',
  data () {
    return {
      userData: null,
      headImg: '../../assets/img/head.jpeg'
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
    this.userData = this.user
  },
  methods: {
    toDetailOnClick (item) {
      this.$router.push({ path: `/${item}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  height: calc(100% - 100px);
  position: relative;
  color: #363030;
  &-bgimg {
    width: 100%;
  }
  &-con {
    width: 100%;
    height: 500px;
    padding: 0 40px 20px 40px;
    position: absolute;
    left: 0;
    top: 150px;
    box-sizing: border-box;
  }
  &-title {
    width: 100%;
    height: 300px;
    background: #ffffff;
    box-shadow: 0px 0px 3px #cccbcb;
    padding: 30px 20px;
    box-sizing: border-box;
    &-top {
      width: 100%;
      //   height: 200px;
      display: flex;
      justify-content: start;
      img {
        width: 140px;
        height: 140px;
        border-radius: 140px;
        box-shadow: 0px 0px 10px #cac8c8;
        margin-right: 30px;
      }
      .user-title-top-con {
        height: 140px;
        p:nth-child(1) {
          font-weight: bold;
          font-size: 30px;
          color: #1b1717;
          margin-top: 20px;
        }
        p:nth-child(2) {
          font-size: 20px;
          color: #383333;
          margin-top: 15px;
        }
      }
    }
    &-bto {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 40px;
      box-sizing: border-box;
      margin-top: 40px;
      p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
  &-tool {
    width: 100%;
    box-shadow: 0px 0px 3px #cccbcb;
    background: #ffffff;
    margin-top: 20px;
    padding: 30px 20px;
    box-sizing: border-box;
    color: #363030;
    &-title {
      font-size: 27px;
    }
    &-box {
      padding: 0 20px;
      margin-top: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        width: 100px;
        text-align: center;
        flex-direction: column;
        justify-content: space-around;
        .img-svg {
          font-size: 50px;
          margin: auto;
        }
      }
    }
  }
  &-more {
    width: 100%;
    box-shadow: 0px 0px 3px #cccbcb;
    background: #ffffff;
    margin-top: 20px;
    padding: 30px 20px;
    box-sizing: border-box;
  }
}
</style>
