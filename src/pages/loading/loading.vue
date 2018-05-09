<template>
  <div class="content">
    <div class="loading">
      <img v-if="imageUri" :src="imageUri + '/defaults/ipc-shopping/home/icon-guide_logoyy@2x.png'"/>
      <div class="shopText">赞播异业联盟</div>
      <div class="load">
        <span :class="loadingOne"></span>
        <span :class="loadingTwo"></span>
        <span :class="loadingThree"></span>
      </div>
    </div>
    <div class="watermark">Copyright © 2018 赞播 All Rights Reserved.</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import wx from 'wx'

  export default {
    data () {
      return {
        imageUri: api.image,
        showLoad: 1,
        timer: null
      }
    },
    mounted () {
      this._init()
      this._routeWithId()
    },
    beforeDestroy () {
      this.timer && clearInterval(this.timer)
    },
    methods: {
      // 初始化
      _init () {
        this.timer = setInterval(() => {
          this.showLoad = this.showLoad++ < 3 ? this.showLoad : 1
        }, 500)
      },
      // 根据身份路由
      _routeWithId () {
        setTimeout(() => {
          const url = `/pages/home/home`
          wx.redirectTo({url})
        }, 1500)
      }
    },
    computed: {
      loadingOne () {
        return this.showLoad === 1 ? '' : 'white'
      },
      loadingTwo () {
        return this.showLoad === 2 ? '' : 'white'
      },
      loadingThree () {
        return this.showLoad === 3 ? '' : 'white'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'
  .content
    height: 100vh
    width: 100vw
    overflow-y: hidden
    box-sizing: border-box
    background: $color-background-ff
    padding-top: 41.33vw
    .loading
      display: flex
      flex-direction: column
      align-items: center
      img
        height: 64px
        width: 64px
      .shopText
        font-family: $font-family-light
        font-size: $font-size-medium
        line-height: 20px
        margin-top: 6px
        color: $color-text-46
      .load
        span
          display: inline-block
          margin: 0 2px
          height: 6px
          width: 6px
          background: $color-text-a4
          border-radius: 50%
        .white
          background: $color-cut-line-ed

    .watermark
      position: absolute
      bottom: 6.67vw
      font-family: $font-family-thin
      font-size: $font-size-small-s
      color: $color-text-a4
      no-wrap()
      row-center()
</style>



