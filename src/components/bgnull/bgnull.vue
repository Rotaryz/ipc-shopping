<template>
  <div class="bgnull" v-if="showBgnull">
    <div class="center">
      <div class="images">
        <img v-if="showImagSta == 1 " :src="imageUrl + '/defaults/ipc-shopping/employee/pic-@2x.png'"/>
        <img v-if="showImagSta == 2" :src="imageUrl + '/defaults/ipc-shopping/aliance/pic-union_empty@2x.png'"/>
        </div>
      <div class="text">
        <span>{{text}}</span>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  export default {
    data () {
      return {
        imageUrl: api.image
      }
    },
    props: [
      'imagesUrl',
      'text',
      'showBgnull',
      'showImagSta' // 跟据不同的状态显示不同的图片
    ],
    methods: {
      show (content) {
        if (this.showBgnull) {
          return
        }
        this.showBgnull = true
        this.imagesUrl = content.imagesUrl
        this.text = content.text
      },
      hide () {
        this.showBgnull = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'

  .bgnull
    position: relative
    width: 100vw
    height: 100vh
    background-color: $color-background-f6
    .center
      width: 87px
      height: 99.5px
      position: absolute
      top: -170px
      left: 0px
      right: 0px
      bottom: 0px
      margin: auto
      .images
        width: 87px
        height: 75.5px
        image
          width: 100%
          height: 100%
      .text
        text-align center
        span
          font-family: $font-family-light
          font-size: $font-size-small
          color: $color-assist-27

</style>
