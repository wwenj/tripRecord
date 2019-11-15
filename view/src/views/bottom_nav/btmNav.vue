<template>
  <div class="btm-nav">
    <md-tab-bar v-model="currentTab" :items="items" :has-ink="false" @change="navOnChage">
      <template slot="item" slot-scope="{ item }">
        <div class="custom-item">
          <div class="icon">
            <md-icon :name="item.icon" />
          </div>
          <div class="text">
            <span v-text="item.label"></span>
          </div>
        </div>
      </template>
    </md-tab-bar>
  </div>
</template>

<script>
import { TabBar, Icon } from 'mand-mobile'

export default {
  name: 'barTab',
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon
  },
  data () {
    return {
      currentTab: 1,
      items: [
        { name: 1, label: '出行', icon: 'home' },
        { name: 2, label: '交通', icon: 'location' },
        { name: 3, label: '历史', icon: 'calendar' },
        { name: 4, label: '我的', icon: 'authentication' }
      ]
    }
  },
  methods: {
    navOnChage (e) {
      switch (e.name) {
        case 1:
          this.$router.push({ path: '/trip' })
          break
        case 2:
          this.$router.push({ path: '/traffic' })
          break
        case 3:
          this.$router.push({ path: '/history' })
          break
        case 4:
          this.$router.push({ path: '/user' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btm-nav {
  width: 100%;
  height: 100px;
  background-color: #fff;
  z-index: 100;
  position: absolute;
  bottom: 0;
  // border:1px solid black;
}
.icon {
  text-align: center;
}
</style>
