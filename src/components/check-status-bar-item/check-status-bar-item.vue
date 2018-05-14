<template>
  <div class="check-status-bar-item">
    <article class="wrap">
      <section class="w-top">
        <div class="logo"></div>
        <article class="info">
          <div class="shop-name">福泉楼饮食文化</div>
          <div class="location" :style="backgroundMapImg">广州市白云区黄石路万达广场</div>
          <section class="expense-box">
            <div class="number">购买数量 60</div>
            <article class="money">
              <section class="m-txt">实付金额</section>
              <section class="m-num-box">
                <div class="m-icon">¥</div>
                <div class="m-num">6000</div>
              </section>
            </article>
          </section>
        </article>
      </section>
      <section class="w-bottom">
        <div class="status-info">待添加优惠券</div>
        <img v-if="arrowRightImg" :src="arrowRightImg">
      </section>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  // import api from 'api'
  import source from 'common/source'

  export default {
    data () {
      return null
    },
    computed: {
      arrowRightImg () {
        return source.imgArrowRightA4('img')
      },
      backgroundMapImg() {
        return source.imgMapIcon()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .check-status-bar-item
    position: relative
    .wrap
      box-sizing: border-box
      height: 131px
      background-color: $color-background-ff
      padding-left: 15px
      .w-top
        position: relative
        layout(row, block, no-wrap)
        .logo
          box-sizing: border-box
          width: 60px
          height: 60px
          border: 0.5px solid $color-cut-line-ed
          margin-right: 12px
        .info
          flex: 1
          height: 100%
          box-sizing: border-box
          padding: 15px 0
          layout()
          justify-content:space-around
          .shop-name
            font-family: $font-family-regular
            font-size: $font-size-medium-x
            color: $color-text-2d
            line-height: $font-size-medium-x
          .location
            font-family: $font-family-light
            font-size: $font-size-small
            color: $color-a4
            line-height: $font-size-small

      .w-bottom
        position: relative

</style>
