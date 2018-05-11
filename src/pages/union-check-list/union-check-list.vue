<template>
  <article class="union-check-list">
    <div class="test">
      <union-card @editor="test" :useType="1" ></union-card>
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  // import api from 'api'
  import UnionCard from 'components/union-card-item/union-card-item'

  export default {
    data() {
      return {
        tabFlag: 1,
        isEmpty: false
      }
    },
    components: {
      UnionCard
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  $nav-height = 40px // 导航栏高度

  .union-check-list
    min-height :100vh
    .test
      padding :15px

</style>
