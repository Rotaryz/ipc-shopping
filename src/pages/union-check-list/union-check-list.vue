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
        <img class="empty-pic" :src="emptyImg" v-if="emptyImg"/>
        <div class="empty-txt">暂无信息</div>
      </article>
      <article class="scroll" v-if="!isEmpty">
        <div class="ad-box" v-if="showAd">
          <div class="txt">{{adMsg}}</div>
          <div class="close-icon" @tap="closeAd">
            <img :src="closeIcon" v-if="closeIcon"/>
          </div>
        </div>
        <ul class="box">
          <li :class="['box-item',showAd?'show-ad':'']" v-for="(item, index) in checkInfoList" :key="index">
            <union-check :shopItem="item" @lookOverHandler="lookOverHandler"></union-check>
          </li>
        </ul>
      </article>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import * as wechat from 'common/js/wechat'
  import {ERR_OK} from 'api/config'
  import source from 'common/source'
  import wx from 'wx'
  import UnionCard from 'components/union-card-item/union-card-item'
  import UnionCheck from 'components/union-check-item/union-check-item'

  const LIMIT_DEF = 10

  export default {
    data() {
      return {
        navList: ['申请中', '待审核', '已通过', '已拒绝'],
        tabFlag: 0,
        checkInfoList: [],
        showAd: true,
        adMsg: '商家已成功支付，但还未添加优惠券',
        currentActiveId: null,
        isAll: false,
        page: 1,
        limit: LIMIT_DEF
      }
    },
    onShow() {
      this._init()
    },
    onPullDownRefresh() {
      this._resetConfig()
      let data = this._formatReq()
      data.paga = 1
      data.limit = Math.max(this.checkInfoList.length, LIMIT_DEF)
      this._rqGetCheckList(data, false)
        .then(json => {
          let list = this._formatResData(json)
          this.checkInfoList = list
          this._isAll(json)
          wx.stopPullDownRefresh()
        })
    },
    onReachBottom() {
      this.getMoreList()
    },
    methods: {
      changeTab(flag) {
        if (this.tabFlag === flag) return
        this.tabFlag = flag
        this._resetConfig()
        let data = this._formatReq()
        this._rqGetCheckList(data)
          .then(json => {
            let list = this._formatResData(json)
            this.checkInfoList = list
            this._isAll(json)
            wx.stopPullDownRefresh()
          })
        this._showAd()
      },
      closeAd() {
        this.showAd = false
      },
      lookOverHandler(obj) {
        const url = `/pages/audit/audit?checkId=${obj.id}&tabFlag=${this.tabFlag}`
        this.$router.push(url)
      },
      _showAd(flag) {
        flag = this.tabFlag
        if (flag === 0 || flag === 1) {
          this.showAd = true
          flag === 0 && (this.adMsg = `商家已成功支付，但还未添加优惠券`)
          flag === 1 && (this.adMsg = `商家已成功支付，且已经添加优惠券`)
        } else {
          this.showAd = false
        }
      },
      _init() {
        if (!(this.currentActiveId * 1 === this.$root.$mp.query.activeId * 1)) {
          this.tabFlag = 0
          this._resetConfig()
        }
        this.currentActiveId = this.$root.$mp.query.activeId
        let data = this._formatReq()
        this._rqGetCheckList(data)
          .then(json => {
            let list = this._formatResData(json)
            this.checkInfoList = list
            this._isAll(json)
          })
      },
      _formatReq(flag) {
        flag = this.tabFlag
        let data = {
          'check_status': 0,
          'has_promotion': 1,
          'activity_alliance_id': this.currentActiveId,
          limit: this.limit,
          page: this.page
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
            data['check_status'] = 2
            break
          }
        }
        return data
      },
      _rqGetCheckList(data, loading) {
        return new Promise(resolve => {
          api.uckGetCheckList(data, loading)
            .then(json => {
              wechat.hideLoading()
              if (json.error !== ERR_OK) {
                return ''
              }
              resolve(json)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      _isAll(json) {
        let total = json.meta.total
        this.isAll = (this.checkInfoList.length >= total)
        return this.isAll
      },
      _resetConfig() {
        this.isAll = false
        this.page = 1
        this.limit = LIMIT_DEF
      },
      // 格式化请求列表
      _formatResData(json) {
        let arr = []
        let res = json.data
        res.map(item => {
          arr.push({
            id: item.id,
            shopImg: item.merchant_data.logo_image,
            name: item.merchant_data.shop_name,
            location: item.merchant_data.address,
            sales: item.count,
            money: item.total,
            statusCode: this.tabFlag,
            checkStatus: item.check_status * 1,
            refundStatus: item.refund_status
          })
        })
        return arr
      },
      getMoreList() {
        if (this.isAll) return
        let data = this._formatReq()
        data.page++
        this._rqGetCheckList(data)
          .then(json => {
            let list = this._formatResData(json)
            this.checkInfoList.push(...list)
            this._isAll(json)
          })
      }
    },
    computed: {
      isEmpty() {
        return this.checkInfoList.length <= 0
      },
      emptyImg() {
        return source.imgEmptyInfo('img')
      },
      closeIcon() {
        return source.imgCloseIcon('img')
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
      z-index: 9
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
            layout()
            justify-content: center
            align-items: center
            background-repeat: no-repeat
            background-position: right center
            background-size: 12px
            .c-i-pic
              height: 12px
              width: 12px
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
