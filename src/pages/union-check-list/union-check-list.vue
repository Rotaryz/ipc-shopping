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
        <div class="ad-box" v-if="showAd">
          <div class="txt">{{adMsg}}</div>
          <div class="close-icon" :style="closeIcon" @tap="closeAd"></div>
        </div>
        <ul class="box">
          <li :class="['box-item',showAd?'show-ad':'']" v-for="(item, index) in couponInfoList" :key="index">
            <union-check @tap="test"></union-check>
          </li>
        </ul>
      </scroll-view>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import * as wechat from 'common/js/wechat'
  import { ERR_OK } from 'api/config'
  import source from 'common/source'
  import UnionCard from 'components/union-card-item/union-card-item'
  import UnionCheck from 'components/union-check-item/union-check-item'

  export default {
    data () {
      return {
        navList: ['申请中', '待审核', '已通过', '已拒绝'],
        tabFlag: 0,
        couponInfoList: new Array(6),
        showAd: true,
        adMsg: '商家已成功支付，但还未添加优惠券',
        currentActiveId: null
      }
    },
    onShow () {
      this._init()
    },
    methods: {
      changeTab (flag) {
        this.tabFlag = flag
        this._showAd(this.tabFlag)
      },
      closeAd () {
        this.showAd = false
      },
      test () {
      },
      _showAd (flag) {
        if (flag === 0 || flag === 1) {
          this.showAd = true
          console.log(flag)
          flag === 0 && (this.adMsg = `商家已成功支付，但还未添加优惠券`)
          flag === 1 && (this.adMsg = `商家已成功支付，且已经添加优惠券`)
        } else {
          this.showAd = false
        }
      },
      _init () {
        this.currentActiveId = this.$root.$mp.query.activeId
        let data = this._formatReq(this.tabFlag)
        this._rqGetCheckList(data)
      },
      _formatReq (flag) {
        let data = {
          'check_status': 0,
          'has_promotion': 1,
          'activity_alliance_id': this.currentActiveId
        }
        switch (flag) {
          case 0 : {
            data['check_status'] = 0
            data['has_promotion'] = 0
            break
          }
          case 1 : {
            data['check_status'] = 0
            data['has_promotion'] = 1
            break
          }
          case 2 : {
            data['check_status'] = 1
            break
          }
          case 3 : {
            data['check_status'] = 1
            break
          }
        }
        return data
      },
      _rqGetCheckList (data) {
        api.uckGetCheckList(data)
          .then(json => {
            wechat.hideLoading()
            if (json.error !== ERR_OK) {
              return ''
            }
            console.log(json)
            // let list = this._formatResData(json)
            // console.log(list)
            // this.couponInfoList = list
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 格式化请求列表
      _formatResData (json) {
        let arr = []
        let res = json.data
        res.map(item => {
          arr.push({
            id: item.id,
            title: item.name,
            endDate: `${item.end_at}到期`,
            sales: item.sale_count, // 销量
            chargeOff: item.verification_power, // 核销
            statusCode: item.status,
            statusStr: item.status === 1 ? '报名中' : (item.status === 2 ? '已上架' : '已下架')
          })
        })
        return arr
      }
    },
    computed: {
      isEmpty () {
        return this.couponInfoList.length <= 0
      },
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
        .ad-box
          z-index: 9
          position: fixed
          top: $nav-height
          left: 0
          right: 0
          height: 34px
          box-sizing: border-box
          padding-right: 15px
          layout(row, block, no-wrap)
          justify-content: space-between
          align-items: center
          background: $color-background-e9
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
            padding: 0 15px
            background-repeat: no-repeat
            background-position: right center
            background-size: 12px
        .box
          box-sizing: border-box
          .box-item
            padding-bottom: 10px
            &:first-child
              padding-top: 10px
            &:last-child
              padding-bottom: 20px
          .show-ad:first-child
            padding-top: 34px


</style>
