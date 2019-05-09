<template>
  <div class="btm-nav">
    <md-tab-bar v-model="current" :items="items" :has-ink="false" @change="navOnChage">
      <template slot="item" slot-scope="{ item }">
        <div class="custom-item">
          <div class="icon">
            <md-icon :name="item.icon"/>
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
  name: 'tab-bar-demo',
  /* DELETE */
  title: '自定义内容',
  titleEnUS: 'Custom Item',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon
  },
  data () {
    return {
      current: 1,
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
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.btm-nav {
  width: 100%;
  height: 100px;
  // border:1px solid black;
}
.icon {
  text-align: center;
}
</style>
