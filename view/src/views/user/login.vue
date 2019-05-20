<template>
  <div class="login">
    <div class="login-bg">
      <h1 class="login-title">
        <img src="../../assets/img/logo.png" alt>
      </h1>
      <md-field class="login-input">
        <md-input-item
          v-model="user.phone"
          type="phone"
          ref="name"
          title="手机号"
          placeholder="请输入手机号"
        ></md-input-item>
        <md-input-item
          v-model="user.password"
          type="password"
          ref="id"
          title="密码"
          placeholder="请输入密码"
        ></md-input-item>
      </md-field>
      <div class="login-btn">
        <span @click="loginOnClick">
          <svg-icon  class="svg-btn" icon-class="login-btn"/>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Toast } from 'mand-mobile'
export default {
  name: 'Login',
  data () {
    return {
      userData: null,
      user: {
        phone: '15330734121',
        password: '12345'
      }
    }
  },
  mounted () {
    // Toast.succeed('您需要先登录哦！', 1500)
  },
  methods: {
    /** action */
    loginOnClick () {
      this.loginAjax()
    },
    /** ajax */
    loginAjax () {
      let params = {
        userName: this.user.phone,
        passWord: this.user.password
      }
      this.$http.post('/user', params).then(res => {
        this.userData = res.data.data
        let tmpUser = JSON.stringify(this.userData)
        // 登录信息存到本地
        localStorage.setItem('user', tmpUser)
        // 存到vuex
        this.setUser(this.userData)
        this.allDistanceAjax()
        Toast.succeed(`欢迎回来，${this.userData.name}`, 1500)
        this.$router.push({ path: '/trip' })
      })
    },
    allDistanceAjax () {
      this.$http.get('/trip/allDistance', {}).then(res => {
        this.setUserData(res.data.data)
      })
    },
    ...mapActions(['setUser', 'setUserData'])
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url("../../assets/img/login-bg.jpg");
  background-size: 100% 100%;
  padding: 20px;
  &-input {
    margin-top: 60px;
  }
  &-title {
    margin-top: 250px;
    text-align: center;
    img {
      width: 402px;
      height: 101px;
      margin: auto;
    }
  }
  &-btn {
    width: 100%;
    margin: 70px auto;
    font-size: 130px;
    color: #ffffff;
    text-align: center;
  }
}
.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  background: #ffffff31;
}
</style>
<style lang="scss">
.login {
  .md-field {
    background: transparent;
  }
  .md-field-item-content:before {
    background: black;
  }
}
</style>
