<template>
  <div id="app">
    <div class="box">
      <!-- <md-water-mark class="text-container" :content="markContent" spacing="10vw"> -->
      <transition name="fademap">
        <router-view/>
      </transition>
      <!-- </md-water-mark> -->
    </div>
    <btmNav></btmNav>
  </div>
</template>
<script>
import btmNav from 'views/bottom_nav/btmNav'
import { mapActions } from 'vuex'
import { Toast } from 'mand-mobile'
export default {
  components: {
    btmNav: btmNav
  },
  mounted () {
    // 验证本地是否已经登录过
    let tmpUser = localStorage.getItem('user')
    if (tmpUser) {
      this.setUser(JSON.parse(tmpUser))
    } else {
      Toast.succeed('您需要先登录哦！', 2000)
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    ...mapActions(['setUser'])
  }
}
</script>

<style>
@import "style/reset.css";
.box {
  width: 100%;
  height: calc(100vh-100px);
  overflow: auto;
  position: relative;
  color: #555555;
}
.text-container {
  background: #fff;
}
.fademap-enter {
  opacity: 0;
}
.fademap-enter-active {
  transition: all 0.2s;
}
/* .fademap-leave-to {
  opacity: 0;
}
.fademap-leave-active {
  transition: all 0.3s;
} */
</style>
