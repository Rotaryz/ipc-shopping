<template>
  <div class="test">测试界面
    <div class="btn">提现</div>
    <div class="btn2" @tap="test22">分配</div>
    <div class="line" v-if="flag"></div>
    <div class="box" v-for="(val,key,index) in list" :key="index">{{val}}-{{key}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations, mapActions} from 'vuex'
  import api from 'api'

  export default {
    data() {
      return {
        flag: true,
        list: new Array(7).fill(0)
      }
    },
    created() {
      console.log(api)
    },
    methods: {
      test22() {
        console.log(222)
        this.flag = !this.flag
      },
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
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .test
    color: #831992
    font-size: 20px
    .btn
      normal-button-default($color-assist-7c)
      cut-off-rule-bottom(#000)
    .btn2
      function-button($color-assist-47)
    .line
      background-color: yellow
      margin: 50px auto
      height: 50px
      cut-off-rule-top(#f00, 10%, 10%)
    .box
      height: 100px
      width: 100px
      background-color: red
      margin: 10px


</style>
