<template>
  <div class="bgnull" v-if="showBgnull">
    <div class="center">
      <div class="images">
        <img :src="imagesUrl"/>
      </div>
      <div class="text">
        <span>{{text}}</span>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'

  const PATHARRAY = [ // 添加无数据时默认页面所需要的路径图片
    {title: '暂无员工', img: '/defaults/ipc-shopping/employee/pic-@2x.png'},
    {title: '暂无数据', img: '/defaults/ipc-shopping/page/pic-income_empty@2x.png'}
  ]
  export default {
    data () {
      return {
        imageUrl: baseURL.image,
        imagesUrl: '',
        text: ''
      }
    },
    props: {
      showBgnull: {
        type: Boolean,
        default: false
      },
      showImagSta: String
    },
    mounted () {
      this.imagesUrl = this.imageUrl + PATHARRAY[this.showImagSta].img
      this.text = PATHARRAY[this.showImagSta].title
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'

  .bgnull
    position: relative
    width: 100vw
    height: 100%
    background-color: $color-background-f6
    box-sizing: border-box
    border: 1px solid red
    .center
      width: 87px
      height: 99.5px
      position: absolute
      top: -35%
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
