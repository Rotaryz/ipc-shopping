<template>
  <article class="union-card-item">
    <section class="wrap">
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
                <div class="i-item">销量 {{cardInfo.sales}}</div>
                <div class="i-item">核销 {{cardInfo.chargeOff}}</div>
              </section>
            </artilce>
            <section class="look-over">
              <span class="txt" :style="arrowImg" @tap="previewHandler(cardInfo)">预览</span>
            </section>
          </div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constStatus.up">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn delete" @tap="editorHandler(cardInfo)">编辑</div>
          <div class="btn total" @tap="totalHandler(cardInfo)">统计</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constStatus.down">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn delete" @tap="deleteHandler(cardInfo)">删除</div>
          <div class="btn total" @tap="totalHandler(cardInfo)">统计</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constStatus.apply">
          <div class="title">{{cardInfo.statusStr}}</div>
          <!--<div class="btn delete" @tap="checkHandler(cardInfo)">编辑</div>-->
          <div class="btn delete" @tap="checkHandler(cardInfo)">审查</div>
          <div class="btn delete" @tap="checkHandler(cardInfo)">排序</div>
          <div class="btn total" @tap="checkHandler(cardInfo)">上架</div>
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
    apply: 1, // 报名,
    up: 2, // 上线
    down: 3 // 下线
  }

  // 使用场景默认值
  const DEFAULT_USE_TYPE = {
    union: 0, // 联盟管理
    unionApplying: 1, // 联盟报名
    shop: 10, // 活动管理
    shopApplying: 11 // 活动2
  }

  // // 卡券信息的默认值-盟主管理
  // const DEFAULT_CARD_INFO_UNION = {
  //   title: '异业联盟卡',
  //   endDate: '2018-01-17到期',
  //   sales: '100', // 销量
  //   chargeOff: '60', // 核销
  //   statusCode: DEFAULT_CONST_STATUS.applying,
  //   statusStr: '已上架'
  // }
  //
  // // 卡券信息的默认值-盟主审核
  // const DEFAULT_CARD_INFO_APPLYING = {
  //   title: '20家异业联盟卡',
  //   money: '100',
  //   cardNum: '4',
  //   shopList: new Array(4).fill('国颐堂国颐堂')
  // }

  export default {
    props: {
      cardInfo: {
        type: Object,
        default: {}
      },
      constStatus: {
        type: Object,
        default: DEFAULT_CONST_STATUS
      },
      useType: {
        type: Number,
        default: DEFAULT_USE_TYPE.unionApplying
      },
      constUseType: {
        type: Object,
        default: DEFAULT_USE_TYPE
      }
    },
    data () {
      return {
        imageUri: baseURL.image,
        bgImgType: this.useType // 背景图片类型
      }
    },
    beforeMount () {
      console.log(this.cardInfo)
    },
    mounted () {
      console.log(this.useType)
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
      checkHandler (cardInfo) {
        this.$emit('checkHandler', cardInfo)
      }
    },
    computed: {
      backgroundImg () {
        switch (this.bgImgType) {
          case DEFAULT_USE_TYPE.unionApplying:
          case DEFAULT_USE_TYPE.union: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/pic-union_b@2x.png)` || ''
          }
          case DEFAULT_USE_TYPE.shop: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/pic-activity_cardp@2x.png)` || ''
          }
          default: {
            return ''
          }
        }
      },
      iconImg () {
        switch (this.bgImgType) {
          case DEFAULT_USE_TYPE.unionApplying:
          case DEFAULT_USE_TYPE.union: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/pic-union_b2@2x.png)` || ''
          }
          case 1: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/pic-activity_cardp2@2x.png)` || ''
          }
          default: {
            return ''
          }
        }
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

  .union-card-item
    position: relative
    background-color: $color-background-ff
    box-shadow: 1px 8px 21px 0 rgba(179, 187, 218, 0.23)
    border-radius: 3px
    overflow: hidden
    .wrap
      position: relative
      height: 0
      padding-top: 39.855072463768%
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
          .delete, .editor
            function-button()
          .total, .check
            function-button($color-assist-47)
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
