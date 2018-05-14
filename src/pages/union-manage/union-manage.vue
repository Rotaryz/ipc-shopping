<template>
  <article class="union-manage">
    <header class="tab">
      <div :class="['t-item',tabFlag === 0 ? 'hit':'']" @tap.stop="changeTab(0)">报名中</div>
      <div :class="['t-item',tabFlag === 1 ? 'hit':'']" @tap.stop="changeTab(1)">已上架</div>
      <div :class="['t-item',tabFlag === 2 ? 'hit':'']" @tap.stop="changeTab(2)">已下架</div>
    </header>
    <section :class="['empty',isEmpty?'':'display-none']">
      <img class="empty-pic" v-if="imageUri" :src="imageUri + '/defaults/ipc-shopping/aliance/pic-union_empty@2x.png'"/>
      <div class="empty-txt">暂无活动</div>
    </section>
    <section class="apply">
      <div class="test">
        <union-card :useType="0" :cardInfo="cardInfoList[0]" @checkHandler="test"></union-card>
      </div>
      <div class="test">
        <active-card :useType="0" @previewHandler="test"></active-card>
      </div>
      <div class="test2">
        <coupon  @previewHandler="test"></coupon>
      </div>
    </section>
    <footer class="btn" @tap.stop="toCreateActive(0)">新建</footer>
  </article>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import UnionCard from 'components/union-card-item/union-card-item'
  import ActiveCard from 'components/active-card-item/active-card-item'
  import Coupon from 'components/coupon-item/coupon-item'
  // 状态常量默认值
  // const DEFAULT_CONST_STATUS = {
  //   apply: 0, // 报名,
  //   up: 1, // 上线
  //   down: 2 // 下线
  // }
  // const DEFAULT_USE_TYPE = {
  //   union: 0, // 联盟管理
  //   unionApplying: 1, // 联盟报名
  //   shop: 10, // 活动管理
  //   shopApplying: 11 // 活动2
  // }

  // 卡券信息的默认值-盟主管理
  const DEFAULT_CARD_INFO_UNION = {
    title: '异业联盟卡',
    endDate: '2018-01-17到期',
    sales: '100', // 销量
    chargeOff: '60', // 核销
    statusCode: 1,
    statusStr: '已上架'
  }

  export default {
    data () {
      return {
        imageUri: api.image,
        tabFlag: 1,
        isEmpty: false,
        cardInfoList: [DEFAULT_CARD_INFO_UNION]
      }
    },
    methods: {
      test (obj) {
        // console.log(obj)
        // console.log(111)
        const url = `/pages/union-check-list/union-check-list`
        this.$router.push(url)
      },
      changeTab (flag) {
        this.tabFlag = flag
        DEFAULT_CARD_INFO_UNION.statusCode = flag
        this.cardInfoList = [DEFAULT_CARD_INFO_UNION]
      },
      toCreateActive () {
        const url = `/pages/union-create-active/union-create-active`
        this.$router.push(url)
      }
    },
    watch: {
      checkHandler () {
        console.log(22)
      }
    },
    computed: {},
    components: {
      UnionCard,
      ActiveCard,
      Coupon
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  $nav-height = 40px // 导航栏高度

  .empty
    fill-box()
    layout()
    top: 131.5px
    align-items: center
    &.display-none
      display: none
    .empty-pic
      width: 86px
      height: 75.5px
    .empty-txt
      padding-top: 10.5px
      text-align: center
      font-family: $font-family-light
      font-size: $font-size-small
      color: $color-assist-27

  .btn
    position: fixed
    bottom: 0
    left: 0
    right: 0
    normal-button-default()
    border-radius: 3px 3px 0 0

  .union-manage
    position: relative
    min-height: 100vh
    .tab
      position: relative
      height: $nav-height
      padding: 0 40px
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
    .apply
      position: relative
      .test
        padding: 10px 15px
      .test2
        padding :10px 32.5px

</style>
