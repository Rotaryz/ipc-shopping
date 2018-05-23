<template>
  <div class="check-status-bar-item">
    <article class="wrap" @tap="lookOverHandler(shopItem)">
      <section class="w-top">
        <div class="logo" :style="shopImg"></div>
        <article class="info">
          <div class="shop-name">{{shopItem.name}}</div>
          <div class="location" :style="backgroundMapImg">{{shopItem.location}}</div>
          <section class="expense-box" v-if="shopItem.statusCode !== constObj.REFUSE">
            <div class="number">购买数量 {{shopItem.sales}}</div>
            <article class="money">
              <section class="m-txt">实付金额</section>
              <section class="m-num-box">
                <div class="m-icon">¥</div>
                <div class="m-num">{{shopItem.money}}</div>
              </section>
            </article>
          </section>
        </article>
      </section>
      <section class="w-bottom">
        <div class="status-info">{{statusMsg}}</div>
        <div class="arrow-right" :style="arrowRightImg"></div>
      </section>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'
  import source from 'common/source'

  // const OBJ = {
  //   id: '',
  //   shopImg: '',
  //   name: '福泉楼饮食文化',
  //   location: '广州市白云区黄石路万达广场',
  //   sales: 60,
  //   money: 6000,
  //   statusCode: 0
  // }

  const CHECK_CONST_OBJ = {
    APPLYING: 0,
    CHECKING: 1,
    PASS: 2,
    REFUSE: 3
  }

  export default {
    props: {
      shopItem: {
        type: Object,
        default: {}
      },
      constObj: {
        type: Object,
        default: CHECK_CONST_OBJ
      }
    },
    data () {
      return {
        imageUri: baseURL.image
      }
    },
    methods: {
      lookOverHandler (shopItem) {
        this.$emit('lookOverHandler', shopItem)
      }
    },
    computed: {
      statusMsg () {
        switch (this.shopItem.statusCode) {
          case this.constObj.APPLYING :
            return `待添加优惠券`
          case this.constObj.CHECKING :
            return `待审核`
          case this.constObj.PASS :
            return `已通过`
          case this.constObj.REFUSE :
            return `已退款` || `排队中`
        }
      },
      shopImg () {
        const img = this.shopItem.shopImg
        return `background-image:url(${img})`
      },
      arrowRightImg () {
        return source.imgArrowRightA4()
      },
      backgroundMapImg () {
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
      layout()
      .w-top
        position: relative
        layout(row, block, no-wrap)
        cut-off-rule-bottom()
        height: 90px
        align-items: center
        .logo
          box-sizing: border-box
          width: 60px
          height: 60px
          border: 0.5px solid $color-cut-line-ed
          background-position: center
          background-repeat: no-repeat
          background-size: cover
        .info
          flex: 1
          height: 100%
          box-sizing: border-box
          padding: 15px 12px
          layout()
          .shop-name
            font-family: $font-family-regular
            font-size: $font-size-medium-x
            color: $color-text-2d
            line-height: $font-size-medium-x
            margin-bottom: 6px
            no-wrap()
          .location
            font-family: $font-family-light
            font-size: $font-size-small
            color: $color-text-a4
            line-height: $font-size-small
            margin-bottom: 14px
            padding-left: 11px
            background-size: 7.5px 10px
            background-repeat: no-repeat
            background-position: left bottom
            no-wrap()
          .expense-box
            font-family: $font-family-light
            font-size: $font-size-small
            color: $color-text-2d
            line-height: $font-size-small
            layout(row)
            .number
              margin-right: 21px
            .money
              layout(row)
              .m-txt
                margin-right: 6px
              .m-num-box
                layout(row)
                align-items: flex-end
                .m-icon
                  font-family: $font-family-light
                  font-size: $font-size-small-s
      .w-bottom
        layout(row)
        flex: 1
        justify-content: space-between
        align-items: center
        font-family: $font-family-light
        font-size: $font-size-small
        color: $color-text-2d
        .arrow-right
          width: 12px
          height: 12px
          background-size: 100% 100%
          margin-right: 15px
          background-repeat: no-repeat
          background-position: center
        .status-info
          flex: 1
</style>
