<template>
  <div id="app">
    <div class="box">
      <!-- <md-water-mark class="text-container" :content="markContent" spacing="10vw"> -->
        <router-view/>
      <!-- </md-water-mark> -->
    </div>
    <btmNav></btmNav>
  </div>
</template>
<script>
import { WaterMark } from 'mand-mobile'
import btmNav from 'views/bottom_nav/btmNav'
export default {
  components: {
    [WaterMark.name]: WaterMark,
    btmNav: btmNav
  },
  data () {
    return {
      markContent: '王文健'
    }
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
}
.text-container {
  background: #fff;
}
</style>
