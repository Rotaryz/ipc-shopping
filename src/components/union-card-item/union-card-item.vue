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
              <span class="txt" :style="arrowImg">预览</span>
            </section>
          </div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constObject.up">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn delete" @tap="editorHandler(cardInfo)">编辑</div>
          <div class="btn total" @tap="totalHandler(cardInfo)">统计</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constObject.down">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn delete" @tap="deleteHandler(cardInfo)">删除</div>
          <div class="btn total" @tap="totalHandler(cardInfo)">统计</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constObject.apply">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn total" @tap="checkHandler(cardInfo)">审查</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constObject.applying">
          <section class="shop-list-item" v-for="(item,index) in cardInfo.shopList" :key="index">
            <div class="shop-icon" :style="shopImg"></div>
            <div class="shop-name">{{item}}</div>
          </section>
        </article>
      </div>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import source from 'common/source'

  const DEFAULT_CONST_OBJECT = {
    up: 0,
    down: -1,
    apply: 10,
    applying: 100
  }

  const DEFAULT_CARD_INFO = {
    title: '异业联盟卡',
    endDate: '2018-01-17到期',
    sales: '100',
    chargeOff: '60',
    statusCode: DEFAULT_CONST_OBJECT.applying,
    statusStr: '已上架',
    shopList: new Array(4).fill('国颐堂国颐堂')
  }

  export default {
    props: {
      cardInfo: {
        type: Object,
        default: DEFAULT_CARD_INFO
      },
      constObject: {
        type: Object,
        default: DEFAULT_CONST_OBJECT
      },
      useType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        imageUri: api.image,
        bgImgType: this.useType // 背景图片类型
      }
    },
    beforeMount() {
      console.log(this.cardInfo)
    },
    mounted() {
    },
    methods: {
      editorHandler(cardInfo) {
        this.$emit('editorHandler', cardInfo)
      },
      totalHandler(cardInfo) {
        this.$emit('totalHandler', cardInfo)
      },
      deleteHandler(cardInfo) {
        this.$emit('deleteHandler', cardInfo)
      },
      checkHandler(cardInfo) {
        this.$emit('checkHandler', cardInfo)
      }
    },
    computed: {
      backgroundImg() {
        switch (this.bgImgType) {
          case 0: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/pic-union_b@2x.png?flag=1)` || ''
          }
          case 1: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/pic-activity_cardp@2x.png)` || ''
          }
          default: {
            return ''
          }
        }
      },
      iconImg() {
        switch (this.bgImgType) {
          case 0: {
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
      arrowImg() {
        return source.imgArrowRight()
      },
      shopImg() {
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
                .i-item
                  notice-icon()
                  margin-right: 6px
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
