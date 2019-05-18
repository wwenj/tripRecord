<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-0">
    <md-result-page
      type="lost">
    </md-result-page>
  </div>
</template>

<script>
import { ResultPage } from 'mand-mobile'

export default {
  name: 'result-page-demo',
  title: '404',
  components: {
    [ResultPage.name]: ResultPage
  }
}

</script>

<style lang="scss" scoped>
.md-example-child-result-page-0{
  background: #FFF;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  margin-top: -100px;
}
</style>
