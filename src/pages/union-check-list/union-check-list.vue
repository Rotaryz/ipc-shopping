<template>
  <article class="union-check-list">
    <header class="tab">
      <nav
        v-for="(item,index) in navList"
        :key="index"
        :class="['t-item',tabFlag === index ? 'hit':'']"
        @tap.stop="changeTab(index)"
      >
        {{item}}
      </nav>
    </header>
    <section class="content">
      <article class="empty" v-if="isEmpty">
        <div class="empty-pic" :style="emptyImg"/>
        <div class="empty-txt">暂无活动</div>
      </article>
      <scroll-view class="scroll" scroll-y v-if="!isEmpty">
        <dl class="box">
          <dt class="ad-box" v-if="showAd">
            <div class="txt">商家已成功支付，且已经添加优惠券</div>
            <div class="close-icon" :style="closeIcon" @tap="closeAd"></div>
          </dt>
          <dd class="box-item" v-for="(item, index) in cardInfoList" :key="index">
            <union-check @previewHandler="test"></union-check>
          </dd>
        </dl>
      </scroll-view>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
  // import api from 'api'
  import source from 'common/source'
  import UnionCard from 'components/union-card-item/union-card-item'
  import UnionCheck from 'components/union-check-item/union-check-item'

  export default {
    data () {
      return {
        navList: ['申请中', '待审核', '已通过', '已拒绝'],
        tabFlag: 1,
        isEmpty: false,
        cardInfoList: new Array(6),
        showAd: true
      }
    },
    methods: {
      changeTab (flag) {
        this.isEmpty = !this.isEmpty
        this.tabFlag = flag
        // console.log(this.cardInfoList)
        // DEFAULT_CARD_INFO_UNION.statusCode = flag
        // this.cardInfoList = [DEFAULT_CARD_INFO_UNION]
      },
      closeAd () {
        this.showAd = false
      }
    },
    computed: {
      emptyImg () {
        return source.imgEmptyActive()
      },
      closeIcon () {
        return source.imgCloseIcon()
      }
    },
    components: {
      UnionCard,
      UnionCheck
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  $nav-height = 40px // 导航栏高度

  .union-check-list
    position: relative
    height: 100vh
    .tab
      position: fixed
      top: 0
      left: 0
      right: 0
      height: $nav-height
      padding: 0 26px
      box-sizing: border-box
      layout(row)
      justify-content: space-between
      align-items: center
      background-color: $color-main-1a
      font-family: $font-family-light
      font-size: $font-size-medium
      color: $color-text-95
      .t-item
        position: relative
        height: $nav-height
        line-height: $nav-height
        transition: 0.3 all
        &.hit
          color: $color-background-ff
          cut-off-rule-bottom(6px, 6px, $color-assist-34, 2px)
    .content
      height: 100%
      padding-top: $nav-height
      box-sizing: border-box
      .empty
        box-sizing: border-box
        height: 100%
        padding-top: 34.9%
        layout()
        align-items: center
        &.display-none
          display: none
        .empty-pic
          width: 86px
          height: 75.5px
          background-size: 100%
        .empty-txt
          padding-top: 10.5px
          text-align: center
          font-family: $font-family-light
          font-size: $font-size-small
          color: $color-assist-27
      .scroll
        height: 100%
        background: $color-background-f6
        .box
          box-sizing: border-box
          .ad-box
            height: 34px
            box-sizing: border-box
            layout(row, block, no-wrap)
            justify-content: space-between
            align-items: center
            background: rgba(52, 96, 236, 0.06)
            .txt
              flex: 1
              box-sizing: border-box
              padding: 0 15px
              font-family: $font-family-light
              font-size: $font-size-small
              color: $color-assist-34
              no-wrap()
            .close-icon
              height: 34px
              width: 34px
              padding-left: 50px
              background-repeat: no-repeat
              background-position: center
              background-size: 12px
          .box-item
            padding-bottom: 10px
            &:last-child
              padding-bottom: 20px

</style>
