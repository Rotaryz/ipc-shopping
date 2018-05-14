<template>
  <article class="active-card-item">
    <section class="wrap" v-if="useType === constUseType.shop">
      <div class="box" :style="backgroundImg">
        <article :class="['b-top',downStyle?'down-status':'']">
          <div class="b-top-box">
            <section class="icon">
              <div class="icon-pic" :style="iconImg"></div>
            </section>
            <artilce class="info-box">
              <section class="title">{{cardInfo.title}}</section>
              <section class="date">{{cardInfo.endDate}}</section>
              <section class="info">
                <div class="i-item">销量 {{cardInfo.sales}}</div>
                <div class="i-item">核销 {{cardInfo.chargeOff}}</div>
              </section>
            </artilce>
            <section class="look-over">
              <span class="txt" :style="arrowImg" @tap="previewHandler(cardInfo)">预览</span>
            </section>
          </div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constStatus.addCoupon">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn last" @tap="addHandler(cardInfo)">添加优惠券</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constStatus.changeCoupon">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn last" @tap="changeHandler(cardInfo)">修改优惠券</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constStatus.lookOver">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn last" @tap="lookHandler(cardInfo)">查看</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constStatus.up">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn delete" @tap="buyHandler(cardInfo)">复购</div>
          <div class="btn delete" @tap="allocHandler(cardInfo)">分配</div>
          <div class="btn last" @tap="totalHandler(cardInfo)">统计</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constStatus.down">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn delete" @tap="deleteHandler(cardInfo)">删除</div>
          <div class="btn last" @tap="totalHandler(cardInfo)">统计</div>
        </article>
      </div>
    </section>
    <section class="wrap alloc-status" v-if="isAlloct">
      <div class="box" :style="backgroundImg">
        <article class="b-top">
          <div class="b-top-box">
            <section class="icon">
              <div class="icon-pic" :style="iconImg"></div>
            </section>
            <artilce class="info-box">
              <section class="title">{{cardInfo.title}}</section>
              <section class="date">{{cardInfo.endDate}}</section>
              <section class="info">
                <div class="i-item">可用库存 {{cardInfo.store}}</div>
              </section>
            </artilce>
            <section class="look-over">
              <span class="txt" :style="arrowImg" @tap="previewHandler(cardInfo)">预览</span>
            </section>
          </div>
        </article>
      </div>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'
  import source from 'common/source'

  // 状态常量默认值
  const DEFAULT_CONST_STATUS = {
    addCoupon: 0, // 添加优惠券,
    changeCoupon: 1, // 修改优惠券
    lookOver: 2, // 查看(审核中-报名成功-报名失败)
    up: 10, // 上架
    down: 11 // 下架
  }

  // 使用场景默认值
  const DEFAULT_USE_TYPE = {
    shop: 0, // 活动管理
    shopAllot: 1 // 活动分配
  }

  // 卡券信息的默认值-盟主管理
  const DEFAULT_CARD_INFO_UNION = {
    title: '异业联盟免费卡',
    endDate: '2018-01-17到期',
    sales: '100', // 销量
    chargeOff: '60', // 核销
    statusCode: DEFAULT_CONST_STATUS.down,
    statusStr: '已上架'
  }

  // 卡券信息的默认值-盟主审核
  const DEFAULT_CARD_INFO_ALLOT = {
    title: '异业联盟免费卡',
    endDate: '2018-01-17到期',
    store: '100'
  }

  export default {
    props: {
      cardInfo: {
        type: Object,
        default: DEFAULT_CARD_INFO_UNION || DEFAULT_CARD_INFO_ALLOT
      },
      constStatus: {
        type: Object,
        default: DEFAULT_CONST_STATUS
      },
      useType: {
        type: Number,
        default: DEFAULT_USE_TYPE.shop
      },
      constUseType: {
        type: Object,
        default: DEFAULT_USE_TYPE
      }
    },
    data () {
      return {
        imageUri: baseURL.image
      }
    },
    beforeMount () {
      // console.log(this.cardInfo)
    },
    mounted () {
      // console.log(this.useType)
    },
    methods: {
      previewHandler (cardInfo) {
        this.$emit('previewHandler', cardInfo)
      },
      editorHandler (cardInfo) {
        this.$emit('editorHandler', cardInfo)
      },
      totalHandler (cardInfo) {
        this.$emit('totalHandler', cardInfo)
      },
      deleteHandler (cardInfo) {
        this.$emit('deleteHandler', cardInfo)
      },
      changeHandler (cardInfo) {
        this.$emit('changeHandler', cardInfo)
      },
      lookHandler (cardInfo) {
        this.$emit('lookHandler', cardInfo)
      },
      buyHandler (cardInfo) {
        this.$emit('buyHandler', cardInfo)
      },
      allocHandler (cardInfo) {
        this.$emit('allocHandler', cardInfo)
      }
    },
    computed: {
      downStyle () {
        return this.cardInfo.statusCode === this.constStatus.down
      },
      isAlloct () {
        return this.useType === this.constUseType.shopAllot
      },
      backgroundImg () {
        return (
          this.isAlloct ? `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/bg-staff_card@2x.png)` : `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/pic-activity_cardp@2x.png)`
        )
      },
      iconImg () {
        return `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/pic-activity_cardp2@2x.png)` || ''
      },
      arrowImg () {
        return source.imgArrowRight()
      },
      shopImg () {
        return source.imgShopIcon()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .active-card-item
    position: relative
    background-color: $color-background-ff
    box-shadow: 1px 8px 21px 0 rgba(179, 187, 218, 0.23)
    border-radius: 3px
    overflow: hidden
    .wrap
      position: relative
      height: 0
      padding-top: 39.855072463768%
      &.alloc-status
        padding-top: 27.246376811594%
      .box
        layout()
        fill-box()
        background-repeat: no-repeat
        background-size: contain
        background-position: center center
        .b-top
          position: relative
          height: 0
          padding-top: 27.391304347826%
          &.down-status
            content: ''
            background-color: rgba(255, 255, 255, .6)
          .b-top-box
            fill-box()
            layout(row)
            align-items: center
            justify-content: flex-start
            padding: 10.5px 0 10px 10px
            font-family: $font-family-light
            color: $color-background-ff
            .icon
              position: relative
              width: 26.086956521739%
              height: 100%
              margin-right: 7px
              layout()
              justify-content: center
              .icon-pic
                width: 100%
                height: 0
                padding-top: 82.22222222222%
                background-repeat: no-repeat
                background-size: contain
                background-position: center center
                border-radius: 3px
                overflow: hidden
            .look-over
              height: 100%
              padding-right: 15px
              flex: 1
              layout()
              justify-content: center
              align-items: flex-end
              .txt
                width: 20px
                font-size: $font-size-small-s
                line-height: $font-size-small-s
                padding-right: 12px
                background-size: 10px
                background-position: right center
                background-repeat: no-repeat
            .info-box
              width: 54%
              height: 100%
              layout()
              justify-content: space-around
              box-sizing: border-box
              &.applying
                justify-content: space-between
                padding: 4.5px 0 6px
              .title
                font-family: $font-family-regular
                font-size: $font-size-medium-x
                line-height: $font-size-medium-x
              .date
                color: rgba(255, 255, 255, 0.6)
                font-size: $font-size-small-s
                line-height: $font-size-small-s
              .info
                font-size: $font-size-small
                line-height: $font-size-small
                layout(row)
                justify-content: flex-start
                align-items: center
                &.applying
                  align-items: flex-end
                .i-item
                  font-family: $font-family-light
                  font-size: $font-size-small
                  notice-icon()
                  margin-right: 6px
                .money
                  font-family: $font-family-bold
                  font-size: $font-size-large-xx
                  line-height: $font-size-large-xx
                  margin-right: 9px
                  .m-symbol
                    display: inline
                    font-family: $font-family-light
                    font-size: $font-size-small
                    line-height: $font-size-small
        .b-bottom
          flex: 1
          padding: 0 10px
          layout(row, block, no-wrap)
          align-items: center
          overflow: hidden
          .title
            flex: 1
            font-family: $font-family-light
            font-size: $font-size-small
            color: $color-text-2d
          .btn
            margin-left: 10px
            function-button()
            &:last-child
              function-button($color-assist-6d)
          .shop-list-item
            layout(row, block, no-wrap)
            align-items: center
            box-sizing: border-box
            width: 26.0615384615384%
            height: 100%
            position: relative
            padding-right: 4.3478260869565%
            .shop-icon
              width: 17.5px
              height: 12.5px
              background-size: contain
              background-position: center center
              background-repeat: no-repeat
              margin-right 4px
            .shop-name
              font-family: $font-family-regular
              font-size: $font-size-small
              color: $color-assist-47
              no-wrap()


</style>
