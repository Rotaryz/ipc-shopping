<template>
  <div class="test">测试界面</div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations, mapActions} from 'vuex'

  export default {
    methods: {
      testMutations() {
        this.test(1)
      },
      testActions() {
        this.saveTest(2)
      },
      ...mapMutations({
        test: 'TEST_TYPE'
      }),
      ...mapActions([
        'saveTest'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .test
    color: #831992
    font-size: 20px
</style>
