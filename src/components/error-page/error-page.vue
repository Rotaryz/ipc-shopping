<template>
  <div class="bgnull" v-if="showBgnull">
    <div class="center">
      <div class="images" :class="{errs:showImagSta}">
        <img :src="imagesUrl"/>
      </div>
      <div class="text">
        <p class="title">{{title}}</p>
        <div class="msg-info">
          <div class="left">{{msg}}</div>
          <div class="right" v-if="showImagSta === 0">
            <p>忘了信号不好；</p>
            <p>找不到请求页面；</p>
            <p>没有微信号；</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  const PATHARRAY = [ // 添加无数据时默认页面所需要的路径图片
    {
      title: '抱歉！您撞到了404页面…',
      img: '/defaults/ipc-shopping/page/pic-404@2x.png',
      msg: '可能原因：'
    },
    {
      title: '咦…被发现啦！',
      img: '/defaults/ipc-shopping/page/pic-upgrade upgrade upgrade@2x.png',
      msg: '为了更好的提高服务，我们正在努力升级中…稍等一下下，马上回来！'
    }
  ]
  export default {
    data () {
      return {
        imageUrl: api.image,
        imagesUrl: '',
        title: '',
        msg: ''
      }
    },
    props: {
      showBgnull: {
        type: Boolean,
        default: false
      },
      showImagSta: Number
    },
    mounted() {
      this.imagesUrl = this.imageUrl + PATHARRAY[this.showImagSta].img
      this.title = PATHARRAY[this.showImagSta].title
      this.msg = PATHARRAY[this.showImagSta].msg
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'

  .bgnull
    position: relative
    width: 100vw
    height: 100vh
    .center
      width: 280px
      height: 300px
      position: absolute
      top: -93px
      left: 0px
      right: 0px
      bottom: 0px
      margin: auto
      .images
        width: 149px
        height: 128px
        margin: auto
        margin-bottom: 20px
        image
          width: 100%
          height: 100%
      .images.errs
        width: 148px
        height: 157px
        margin-bottom: 0px
      .text
        text-align center
        .title
          font-family: $font-family-light
          font-size: $font-size-large
          color: $color-text-2d
          margin-bottom: 15px
        .msg-info
          display: flex
          flex-direction: row
          justify-content: center
          .left
            font-family: $font-family-light
            font-size: $font-size-medium
            color: $color-text-a4
            line-height: 22.5px
          .right
            font-family: $font-family-light
            font-size: $font-size-medium
            color: $color-text-a4
            line-height: 22.5px
            text-align: left
        p
          white-space: pre-wrap

</style>
