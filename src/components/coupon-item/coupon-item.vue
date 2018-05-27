<template>
  <div class="coupon-item">
    <!--商家模式-->
    <article class="wrap" v-if="useModel === constUseModel.shop">
      <img class="logo-box" mode="aspectFill" :src="couponInfo.image_url" v-if="couponInfo.image_url"/>
      <section class="info-box">
        <div class="title">
          <div class="type">{{couponInfo.promotion_type_cn}}</div>
          <div class="name">{{couponInfo.title}}</div>
        </div>
        <div class="scope">{{couponInfo.scope}}</div>
        <div class="date">有效期:{{couponInfo.end_at}}</div>
      </section>
      <section class="fun-box check-model" @tap="checkHandler(couponInfo)" v-if="useType === constUseType.check">
        <img class="circle checked" :hidden="!isCheck" :src="backgroundCheckImg" v-if="backgroundCheckImg"/>
        <div class="circle" :hidden="isCheck"></div>
      </section>
    </article>
    <!--盟主模式-->
    <article class="wrap" v-if="useModel === constUseModel.union">
      <section class="logo-box">
        <img class="logo-box-pic" mode="aspectFill" :src="couponInfo.image_url" v-if="couponInfo.image_url">
        <div class="l-b-shop-name">{{couponInfo.shopName}}</div>
      </section>
      <section class="info-box" @tap="lookOverHandler(couponInfo)">
        <div class="title">
          <div class="type">{{couponInfo.type}}</div>
          <div class="name">{{couponInfo.name}}</div>
        </div>
        <div class="scope">{{couponInfo.scope}}</div>
        <div class="date">{{couponInfo.useLife}}</div>
        <div class="look-over">
          <div class="txt">查看</div>
          <img class="pic" :src="backgroundLookOverImg" v-if="backgroundLookOverImg"/>
        </div>
      </section>
    </article>
    <article class="union-sort" v-if="sortDownStyle" @tap="sortDownHandler(couponInfo)">
      <img class="u-s-pic" :src="backgroundSortDownImg" v-if="backgroundSortDownImg"/>
    </article>
    <article class="union-sort" v-if="sortUpStyle" @tap="sortUpHandler(couponInfo)">
      <img class="u-s-pic" :src="backgroundSortUpImg" v-if="backgroundSortUpImg"/>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import {baseURL} from 'api/config'
  // import source from 'common/source'

  // 使用场景默认值
  const DEFAULT_USE_TYPE = {
    normal: 0, // 默认样式
    check: 1, // 选择样式
    isCheck: false,
    shop: 1, // 商家模式,
    union: 0, // 盟主模式
    sort: 1, // 排序
    sortUp: 10, // 升
    sortDown: 11 // 降
  }

  const DEFAULT_INFO = {
    type: '代金券',
    name: '100元代金券',
    scope: '限国颐堂(天河店)使用',
    useLife: '有效期:2018-01-01至2018-08-01',
    sortType: 0,
    shopName: '国颐堂(天河店)国颐堂(天河店)'
  }

  export default {
    props: {
      constUseType: {
        type: Object,
        default: DEFAULT_USE_TYPE
      },
      constUseModel: {
        type: Object,
        default: DEFAULT_USE_TYPE
      },
      useType: {
        type: Number,
        default: DEFAULT_USE_TYPE.normal
      },
      isCheck: {
        type: Boolean,
        default: false
      },
      useModel: {
        type: Number,
        default: DEFAULT_USE_TYPE.shop
      },
      couponInfo: {
        type: Object,
        default: DEFAULT_INFO
      }
    },
    data() {
      return {
        imageUri: baseURL.image
      }
    },
    methods: {
      checkHandler(couponInfo) {
        this.$emit('checkHandler', couponInfo)
      },
      lookOverHandler(couponInfo) {
        this.$emit('lookOverHandler', couponInfo)
      },
      sortDownHandler(couponInfo, sortType) {
        this.$emit('sortDownHandler', couponInfo, sortType)
      },
      sortUpHandler(couponInfo, sortType) {
        this.$emit('sortUpHandler', couponInfo, sortType)
      }
    },
    computed: {
      sortUpStyle() {
        return (this.useType === this.constUseType.sort && this.couponInfo.sortType === this.constUseType.sortUp)
      },
      sortDownStyle() {
        return (this.useType === this.constUseType.sort && this.couponInfo.sortType === this.constUseType.sortDown)
      },
      isNormal() {
        return this.useType === this.constUseType.normal
      },
      backgroundCheckImg() {
        const img = `icon-activity_select@2x.png`
        return `${this.imageUri}/defaults/ipc-shopping/common/${img}`
      },
      backgroundLookOverImg() {
        const img = `icon-union_jt@2x.png`
        return `${this.imageUri}/defaults/ipc-shopping/common/${img}`
      },
      backgroundSortDownImg() {
        const img = `icon-union_down1@2x.png`
        return `${this.imageUri}/defaults/ipc-shopping/common/${img}`
      },
      backgroundSortUpImg() {
        const img = `icon-union_up1@2x.png`
        return `${this.imageUri}/defaults/ipc-shopping/common/${img}`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .union-sort
    position: relative
    height: 100px
    width: 46px
    layout()
    justify-content: center
    align-items: center
    .u-s-pic
      height: 16px
      width: 16px

  .coupon-item
    position: relative
    layout(row, block, nowrap)
    .wrap
      width: 100%
      flex: 1
      position: relative
      height: 100px
      border-radius: 3px
      background-color: $color-background-ff
      border: 0.5px solid $color-cut-line-ed
      box-sizing: border-box
      padding-left: 15px
      layout(row, block, no-wrap)
      align-items: center
      justify-content: space-around
      .logo-box
        height: 70px
        width: 70px
        box-sizing: border-box
        border-radius: 2px
        border: 0.5px solid $color-cut-line-ed
        position: relative
        .logo-box-pic
          position: absolute
          top: 0
          left: 0
          height: 100%
          width: 100%
        .l-b-shop-name
          position: absolute
          bottom: 0
          left: 0
          right: 0
          height: 15px
          background-color: rgba(0, 0, 0, 0.60)
          font-family: $font-family-light
          font-size: $font-size-small-s
          color: $color-background-ff
          line-height: 15px
          text-align: center
      .info-box
        flex: 1
        height: 100%
        box-sizing: border-box
        padding: 15px 0 15px 15px
        layout()
        justify-content: space-around
        .title
          layout(row, inline, no-wrap)
          align-items: center
          .type
            font-family: $font-family-light
            font-size: $font-size-small-ss
            color: $color-assist-27
            coupon-icon()
            margin-right: 4px
          .name
            font-family: $font-family-regular
            font-size: $font-size-medium
            color: $color-text-2d
            line-height: $font-size-medium
            no-wrap()
        .e-box
          height: 5px
        .scope
          flex: 1
          layout()
          justify-content: flex-end
          font-family: $font-family-light
          color: $color-text-2d
          font-size: $font-size-small-s
          line-height: $font-size-small-s
          no-wrap()
          padding-bottom: 5px
        .date
          font-family: $font-family-light
          color: $color-text-2d
          font-size: $font-size-small-s
          line-height: $font-size-small-s
          no-wrap()
        .look-over
          align-self: flex-end
          height: 100%
          width: 46.5px
          layout(row)
          align-items: center
          justify-content: center
          .txt
            display: inline-block
            padding-right: 2px
            font-family: $font-family-light
            font-size: $font-size-small-s
            color: $color-dot-4a
          .pic
            width: 9px
            height: 9px
      .fun-box
        height: 100%
        box-sizing: border-box
      .check-model
        width: 56px
        border-left: 0.5px dashed $color-col-line-cd
        layout()
        justify-content: center
        align-items: center
        .circle
          width: 17px
          height: 17px
          box-sizing: border-box
          border-radius: 50%
          border: 0.5px solid $color-text-a4
          &.checked
            width: 20px
            height: 20px
            border: 0.5px solid transparent
      .sort-model
        width: 46px
        height: 100%
        background-color: transparent

</style>
