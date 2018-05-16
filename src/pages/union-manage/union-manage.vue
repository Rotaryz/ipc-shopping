<template>
  <article class="union-manage">
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
        <ul class="box">
          <li class="box-item" v-for="(item, index) in cardInfoList" :key="item.title+index">
            <union-card :cardInfo="item" :useType="0" @previewHandler="test"></union-card>
          </li>
        </ul>
      </scroll-view>
    </section>
    <footer class="btn" @tap.stop="toCreateActive(0)">新建</footer>
  </article>
</template>

<script type="text/ecmascript-6">
  import source from 'common/source'
  import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import { ROLE } from 'common/js/contants'
  import wx from 'wx'
  import api from 'api'
  import * as wechat from 'common/js/wechat'
  import UnionCard from 'components/union-card-item/union-card-item'
  import ActiveCard from 'components/active-card-item/active-card-item'
  import Coupon from 'components/coupon-item/coupon-item'
  import UnionCheck from 'components/union-check-item/union-check-item'
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
        navList: ['报名中', '已上架', '已下架'],
        currentRole: null,
        tabFlag: 0,
        isEmpty: false,
        cardInfoList: new Array(6).fill(DEFAULT_CARD_INFO_UNION),
        applyList: null,
        upList: null,
        downList: null
      }
    },
    beforeMount () {
      this._init()
    },
    methods: {
      ...mapGetters(['role']),
      _init () {
        // let role = this.role()
        // this.currentRole = role
        // this.currentRole = role
        // 伪代码
        this.currentRole = ROLE.UNION_ID
        // wx.setStorageSync('merchantId', merchantId)
        wx.setStorageSync('userType', ROLE.UNION_ID)
        console.log(this.currentRole)
        this._rqGetActiveList(this.tabFlag + 1)
      },
      // 获取活动列表
      _rqGetActiveList (status) {
        api.umgGetActiveList({status})
          .then(json => {
            if (json.error !== ERR_OK) {
              return ''
            }
            wechat.hideLoading()
            let list = this._formatResData(json)
            console.log(list)
          })
      },
      test (obj) {
        // console.log(obj)
        // console.log(111)
        const url = `/pages/union-check-list/union-check-list`
        this.$router.push(url)
      },
      changeTab (flag) {
        this.isEmpty = !this.isEmpty
        this.tabFlag = flag
        // console.log(this.cardInfoList)
        // DEFAULT_CARD_INFO_UNION.statusCode = flag
        // this.cardInfoList = [DEFAULT_CARD_INFO_UNION]
      },
      toCreateActive () {
        const url = `/pages/union-create-active/union-create-active`
        this.$router.push(url)
      },
      // 格式化请求列表
      _formatResData (json) {
        let arr = []
        let res = json.data
        res.map(item => {
          arr.push({
            id: item.id,
            title: item.name(),
            endDate: `${item.end_at}到期`,
            sales: item.sale_count, // 销量
            chargeOff: item.verification_power, // 核销
            statusCode: 1,
            statusStr: '已上架'
          })
        })
        return arr
      }
    },
    watch: {},
    computed: {
      emptyImg () {
        return source.imgEmptyActive()
      }
    },
    components: {
      UnionCard,
      ActiveCard,
      Coupon,
      UnionCheck
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  $nav-height = 40px // 导航栏高度
  $btn-height = 45px // 按钮高度

  .union-manage
    position: relative
    height: 100vh
    .tab
      position: fixed
      top: 0
      left: 0
      right: 0
      height: $nav-height
      padding: 0 40px
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
      padding: $nav-height 0 $btn-height
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
        .box
          box-sizing: border-box
          .box-item
            padding: 10px 15px
            &:last-child
              padding-bottom: 20px

    .btn
      position: fixed
      left: 0
      right: 0
      bottom: 0
      normal-button-default()
      border-radius: 3px 3px 0 0


</style>
