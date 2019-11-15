<template>
  <div class="me">
    <img class="me-bgimg" src="../../assets/img/user-bg.jpg">
    <div v-if="userData" class="me-top">
      <span @click="loginOutOnClick" class="me-top-outbtn">退出登录</span>
      <img class="me-top-heaimg" :src="userData.img" alt>
      <p class="me-top-name">{{userData.name}}</p>
      <p class="me-top-phone">账号:{{userData.userName}}</p>
      <div class="me-top-bto">
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
    <div v-if="userData" class="me-con">
      <h2>个人信息</h2>
      <div class="me-con-user">
        <p>
          <span>性别：</span>
          <span>{{userData.sex}}</span>
        </p>
        <p>
          <span>年龄：</span>
          <span>{{userData.age}}</span>
        </p>
        <p>
          <span>家乡：</span>
          <span>{{userData.address}}</span>
        </p>
        <p>
          <span>情感状况：</span>
          <span>{{userData.Marriage}}</span>
        </p>
        <p>
          <span>身份：</span>
          <span>{{userData.identity}}</span>
        </p>
      </div>
      <h2>出行里程</h2>
      <div class="me-con-data">
        <echart ref="echart"></echart>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Toast } from 'mand-mobile'
import echart from './components/echart'
export default {
  name: 'UserDetails',
  components: {
    echart
  },
  data () {
    return {
      userData: null,
      distanceArr: [] // 出行里程汇总
    }
  },
  computed: {
    ...mapGetters(['user', 'userDistance'])
  },
  mounted () {
    this.userData = this.user
    delete this.userDistance.userId
    this.distanceArr = Object.values(this.userDistance)
    this.$nextTick(() => {
      this.$refs.echart.initChart(this.distanceArr)
    })
  },
  methods: {
    loginOutOnClick () {
      localStorage.removeItem('user')
      this.setUser(null)
      Toast.succeed(`登录状态已清除`, 1500)
      this.$router.push({ path: '/login' })
    },
    ...mapActions(['setUser'])
  }
}
</script>

<style lang="scss" scoped>
.me {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  &-bgimg {
    width: calc(100%+540px);
    height: 470px;
    margin-left: -120px;
  }
  &-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 470px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0, 0, 0, 0.438);
    &-outbtn {
      position: absolute;
      top: 20px;
      right: 30px;
      color: #ffffff;
      font-size: 28px;
    }
    &-heaimg {
      width: 140px;
      height: 140px;
      border-radius: 140px;
      box-shadow: 0px 0px 5px #cac8c8;
      margin-top: 40px;
    }
    &-name {
      color: #ffffff;
      font-weight: bold;
      font-size: 30px;
      margin-top: 10px;
    }
    &-phone {
      color: #ffffff;
      font-size: 28px;
      margin-top: 10px;
    }
    &-bto {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 60px;
      color: #ffffff;
      box-sizing: border-box;
      margin-top: 60px;
      p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span:nth-child(1) {
          font-weight: bold;
        }
      }
    }
  }
  &-con {
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    h2 {
      font-size: 30px;
      color: black;
    }
    &-user {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      padding: 20px 0;
      p {
        min-width: 200px;
        height: 60px;
        font-size: 25px;
      }
      span:nth-child(2) {
        color: black;
      }
    }
    &-data {
      width: 100%;
      height: 650px;
      padding: 40px 20px;
      margin-top: -100px;
      box-sizing: border-box;
    }
  }
}
</style>
