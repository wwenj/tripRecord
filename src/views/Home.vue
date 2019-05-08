<template>
  <div class="home">
    home
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'home',
  mounted () {
    this.init()
    console.log(this.id)
  },
  computed: {
    ...mapGetters(['id'])
  },
  methods: {
    init () {
      this.setId('wangwenj')
      let params = {
        name: 'wang',
        age: 'wen'
      }
      this.$http.get('http://yapi.demo.qunar.com/mock/63722/home', params).then(res => {
        console.log(res)
      })
      this.$http.post('http://yapi.demo.qunar.com/mock/63722/about', params).then(res => {
        console.log(res)
      })
    },
    ...mapActions(['setId'])
  }
}
</script>
<style lang="scss" scoped>
.home{
  width: 750px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid black;
}
</style>
