<template>
  <div class="coupon-item">
    <article class="wrap" :style="backgroundImg">
      <div class="box">
        <section class="money-box">
          <div class="money"><em class="m-icon">¥</em>69</div>
        </section>
        <section class="info"></section>
      </div>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  // import source from 'common/source'

  // 使用场景默认值
  const DEFAULT_USE_TYPE = {
    normal: 0, // 默认样式
    check: 1 // 选择样式
  }

  export default {
    props: {
      useType: {
        type: Number,
        default: DEFAULT_USE_TYPE.normal
      },
      constUseType: {
        type: Object,
        default: DEFAULT_USE_TYPE
      }
    },
    data () {
      return {
        imageUri: api.image
      }
    },
    created () {
      // console.log(this.useType, this.constUseType.normal)
    },
    computed: {
      isNormal () {
        return this.useType === this.constUseType.normal
      },
      backgroundImg () {
        const img = this.isNormal ? `bg-activity_ticket2@2x.png` : `bg-activity_ticket@2x.png`
        return `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/${img}`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .coupon-item
    position: relative
    .wrap
      position: relative
      height: 0
      padding-top: 32.258064516129%
      border-radius: 3px
      overflow: hidden
      background-size: contain
      background-repeat: no-repeat
      background-position: center center
      .box
        fill-box()
        layout()
        .money-box
          width: 33.387096774193%
          height: 100%
          layout()
          justify-content: center
          align-items: center
          .money
            layout(row, inline, no-wrap)
            align-items: flex-end
            font-family: $font-family-din
            font-size: $font-size-shop
            color: $color-background-ff
            line-height: $font-size-shop
            .m-icon
              display: inline-block
              padding-bottom: 1.5px
              font-family: $font-family-meddle
              font-size: $font-size-large
              line-height: $font-size-large
</style>
