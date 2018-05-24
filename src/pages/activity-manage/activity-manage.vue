<template>
  <div class="manage-con">
    <header class="tab">
      <div :class="['t-item',tabFlag === 0 ? 'hit':'']" @tap.stop="changeTab(0)">活动管理</div>
      <div :class="['t-item',tabFlag === 2 ? 'hit':'']" @tap.stop="changeTab(2)">活动池</div>
    </header>
    <div class="manage-list" v-if="tabFlag === 0">
      <div class="list-data" v-if="activeList.length !== 0">
        <div class="box-list" v-for="(iteam, index) in activeList" v-bind:key="index">
          <active-card :useType="0" @buyHandler="resetBuy" @allocHandler="jumpAllot" @applyHandler="jumpApply" @previewHandler="jumpPreview" @totalHandler="jumpData" :cardInfo="iteam"></active-card>
        </div>
      </div>
      <div class="list-null" v-if="activeList.length === 0">
        <img :src="image + '/defaults/ipc-shopping/home/pic-union_empty@2x.png'" class="null-img" v-if="image"
             mode="widthFix">
        <div class="text">暂无活动</div>
      </div>
    </div>
    <div class="manage-list" v-if="tabFlag === 2">
      <div class="list-data" v-if="pondList.length !== 0">
        <div class="box-list" v-for="(iteam, index) in pondList" v-bind:key="index">
          <active-card :useType="0" :cardInfo="iteam" @applyHandler="jumpApply" @previewHandler="jumpPreview"></active-card>
        </div>
      </div>
      <div class="list-null" v-if="pondList.length === 0">
        <img :src="image + '/defaults/ipc-shopping/home/pic-union_empty@2x.png'" class="null-img" v-if="image"
             mode="widthFix">
        <div class="text">暂无活动</div>
      </div>
    </div>
    <div class="model-box" v-if="modelCon">
      <div class="model-bgbtn" @tap="colseModel"></div>
      <div class="model-con">
        <div class="model-top">
          <div class="top-title">
            <div class="left">{{resetName}}</div>
            <div class="right">
              <text>{{resetMoney}}</text>
              <text class="money">元</text>
            </div>
          </div>
          <div class="add-number">
            <div class="text">数量</div>
            <div class="calculate-box">
              <div class="subtract" @tap="subtract">-</div>
              <input type="number" class="number" v-model="upNumber">
              <div class="add" @tap="add">+</div>
            </div>
          </div>
          <div class="top-title">
            <div class="left">总价</div>
            <div class="right all-right">
              <text>{{resetMoney * upNumber}}</text>
              <text class="money">元</text>
            </div>
          </div>
        </div>
        <div class="model-bg">
        </div>
        <div class="bottom-btn">
          <div class="btn" @tap="sumbit">保存</div>
        </div>
      </div>
    </div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import { baseURL, ERR_OK } from 'api/config'
  import ActiveCard from 'components/active-card-item/active-card-item'
  import * as wechat from 'common/js/wechat'
  import { mapGetters } from 'vuex'
  import wx from 'wx'
  import Toast from '@/components/toast/toast'

  const LIMIT_DEF = 10
  export default {
    data () {
      return {
        image: baseURL.image,
        tabFlag: 0,
        pondList: [],
        activeList: [],
        isAllActive: false,
        isAllPond: false,
        PondPage: 1,
        PondLimt: LIMIT_DEF,
        ActiveData: {
          page: 1,
          limit: LIMIT_DEF
        },
        modelCon: false,
        upNumber: 1,
        resetName: '异业联盟卡',
        resetMoney: 100,
        applyLock: false,
        curId: 1
      }
    },
    mounted () {},
    onShow () {
      this._init()
      this.ActiveData.page = 1
      this.activeList = []
      this.isAllActive = false
      this.PondPage = 1
      this.pondList = []
      this.isAllPond = false
      this._rqGetActiveList()
      this._rqManageGetActiveList()
    },
    onPullDownRefresh () {
      if (this.tabFlag === 0) {
        this.ActiveData.page = 1
        this.activeList = []
        this.isAllActive = false
        this._rqManageGetActiveList()
      } else {
        this.PondPage = 1
        this.pondList = []
        this.isAllPond = false
        this._rqGetActiveList()
      }
      wx.stopPullDownRefresh()
    },
    onReachBottom () {
      if (this.tabFlag === 0) {
        console.log(1111)
      } else {
        if (this.isAllPond) return
        this._rqGetActiveList()
        console.log(22)
      }
    },
    methods: {
      ...mapGetters(['role']),
      _init () {
        let role = this.role()
        this.currentRole = role
      },
      changeTab (flag) {
        this.tabFlag = flag
      },
      // 获得活动池的活动
      _rqGetActiveList () {
        api.merPondActiveList(this.PondPage, this.PondLimt).then(res => {
          console.log(res)
          this.pondList.push(...res.data)
          this._isAllPond(res)
          console.log(this.isAllPond)
          this.PondPage++
          wechat.hideLoading()
        })
      },
      // 检查是管理列表的数据
      _rqManageGetActiveList () {
        api.merManageActiveList(this.ActiveData).then(res => {
          console.log(res)
          this.activeList.push(...this._formatRqData(res))
          console.log(this.activeList)
          this._isAllActive(res)
          console.log(this.isAllActive)
          wechat.hideLoading()
        })
      },
      jumpApply (cardInfo) {
        console.log(cardInfo.id)
        const url = `/pages/merchant-activity/merchant-activity?id=${cardInfo.id}`
        console.log(url)
        this.$router.push(url)
      },
      jumpAllot (cardInfo) {
        console.log(cardInfo.id)
        const url = `/pages/allocation-card/allocation-card?id=${cardInfo.id}`
        console.log(url)
        this.$router.push(url)
      },
      jumpPreview (cardInfo) {
        console.log(cardInfo.id)
        const url = `/pages/activity-detai/activity-detai?activityId=${cardInfo.id}`
        console.log(url)
        this.$router.push(url)
      },
      jumpData (cardInfo) {
        console.log(cardInfo.id)
        const url = `/pages/merchant-data/merchant-data?id=${cardInfo.id}`
        console.log(url)
        this.$router.push(url)
      },
      // 格式化服务器数据
      _formatRqData (res) {
        if (res.data && res.data.length === 0) return []
        let arr = []
        res.data.map(item => {
          let status = 1
          let statusStr = '审核中'
          if (item.alliance_merchant_report.length === 0) {
            item.alliance_merchant_report = {
              sale_count: 0,
              verification_power: 0
            }
          }
          if (item.promotion_id === 0 && item.check_status !== 2) {
            status = 0
          } else {
            if (item.check_status === 0) {
              status = 2
            } else if (item.check_status === 1) {
              status = 2
              statusStr = '报名成功'
            } else if (item.check_status === 3) {
              status = 3
            } else {
              if (item.refund_status === 0) {
                status = 2
                statusStr = '报名失败（退款中）'
              } else if (item.refund_status === 1) {
                status = 2
                statusStr = '报名失败（已退款）'
              } else if (item.refund_status === 2) {
                status = 2
                statusStr = '报名失败（退款失败）'
              } else if (item.refund_status === 3) {
                status = 2
                statusStr = '报名失败（排队中）'
              }
            }
          }
          if (item.activity_alliance.status === 2) {
            status = 10
            statusStr = '已上架'
          } else if (item.activity_alliance.status === 3) {
            status = 11
            statusStr = '已下架'
          }
          arr.push({
            name: item.activity_alliance.name,
            end_at: item.activity_alliance.end_at,
            sale_count: item.alliance_merchant_report.sale_count,
            verification_power: item.alliance_merchant_report.verification_power,
            status: status,
            statusStr: statusStr,
            id: item.activity_alliance_id,
            apply_price: item.apply_price
          })
        })
        return arr
      },
      // 检查是否已经查询完毕
      _isAllActive (res) {
        if (this.activeList.length >= res.meta.total * 1) {
          this.isAllActive = true
        }
      },
      // 检查是否已经查询完毕
      _isAllPond (res) {
        if (this.pondList.length >= res.meta.total * 1) {
          this.isAllPond = true
        }
      },
      subtract () {
        if (parseInt(this.upNumber) <= 1) {
          return
        }
        this.upNumber--
      },
      add () {
        this.upNumber++
      },
      sumbit () {
        // console.log(wx.requestPayment)
        if (!this.upNumber) return
        if (this.upNumber < 1) {
          return this.$refs.toast.show('数量不小于1')
        }
        if (this.applyLock) return
        this.applyLock = true
        setTimeout(() => {
          this.applyLock = false
        }, 3000)
        let that = this
        wechat.login().then(res => {
          let code = res.code
          api.merApplyPay(this.upNumber, this.curId, code).then(res => {
            console.log(res.data)
            if (res.error === ERR_OK) {
              let orderId = res.data.order_id
              const {timestamp, nonceStr, signType, paySign} = res.data.pay_info
              wx.requestPayment({
                timeStamp: timestamp,
                nonceStr,
                package: res.data.pay_info.package,
                signType,
                paySign,
                'success': function (res) {
                  that.$refs.toast.show('复购成功')
                  that.modelCon = !this.modelCon
                  console.log(that.modelCon, '```````````````````')
                },
                'fail': function (res) {
                  // 支付失败关闭订单
                  console.log(res, '支付失败关闭订单``````')
                  api.merCloseOrder(orderId).then(res => {
                    console.log(res)
                  })
                  wechat.hideLoading()
                }
              })
            } else {
              this.$refs.toast.show(res.message)
            }
            wechat.hideLoading()
          })
          // 调起支付
        })
      },
      resetBuy (cardInfo) {
        console.log(cardInfo)
        this.modelCon = !this.modelCon
        this.resetName = cardInfo.name
        this.resetMoney = cardInfo.apply_price
        this.curId = cardInfo.id
      },
      colseModel () {
        this.modelCon = !this.modelCon
      }
    },
    components: {
      ActiveCard,
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  $nav-height = 40px // 导航栏高度

  .manage-con
    padding-top: $nav-height
    padding-bottom: 20px

  .tab
    position: fixed
    top: 0
    left: 0
    right: 0
    height: $nav-height
    padding: 0 40px
    z-index: 3
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
      flex: 1
      text-align: center
      &.hit
        color: $color-background-ff
        cut-off-rule-bottom(40%, 40%, $color-assist-34, 2px)

  .manage-list
    padding: 0 15px
    .box-list
      margin-top: 10px

  .list-null
    padding-top: 177px
    text-align: center
    .null-img
      margin: 0 auto
      width: 25%
      display: block
    .text
      margin-top: 7.5px
      font-family: $font-family-light
      font-size: $font-size-small
      color: $color-assist-27

  .model-box
    position: fixed
    width: 100%
    height: 100%
    left: 0
    top: 0
    z-index: 2
    .model-bgbtn
      position: absolute
      width: 100%
      height: 100%
      left: 0
      bottom: 0
      z-index: 3
      background: rgba(0, 0, 0, .7)
      opacity: 0.7
    .model-con
      position: absolute
      width: 100%
      left: 0
      bottom: 0
      z-index: 4
      .model-top
        background: $color-background-ff
        padding-left: 15px
        .top-title
          font-family: $font-family-light
          font-size: $font-size-medium
          color: #464646
          cut-off-rule-bottom()
          line-height: 45px
          height: 45px
          layout(row)
          justify-content: space-between
          padding-right: 15px
          .left
            font-family: $font-family-light
            font-size: $font-size-medium
            color: #464646
          .right
            font-family: $font-family-light
            font-size: $font-size-medium
            color: #464646
            .money
              font-size: $font-size-small-s
          .all-right
            color: #3460EC
        .add-number
          height: 45px
          border-radius: 3px
          padding-right: 15px
          background: $color-background-ff
          layout(row)
          justify-content: space-between
          align-items: center
          .text
            font-family: $font-family-light
            font-size: $font-size-medium
            color: $color-text-46
          .calculate-box
            layout(row)
            .subtract
              border: 0.5px solid #EDEDED
              width: 22px
              height: 22px
              color: $color-assist-34
              text-align: center
              line-height: 22px
              background: #FFFFFF
              border-radius: 1px
            .number
              width: 48px
              height: 22px
              min-height: 22px
              margin: 0 2.5px
              display: block
              text-align: center
              font-family: $font-family-light
              font-size: $font-size-medium
              color: $color-text-2d
              border: 0.5px solid #EDEDED
            .add
              border: 0.5px solid #3460EC
              width: 22px
              height: 22px
              color: $color-background-ff
              text-align: center
              line-height: 22px
              background: #3460EC
              border-radius: 1px
            .add-noselet
              background: #959DBD
              border: 0px
      .model-bg
        padding-right: 15px
        padding-top: 9.5px
        text-align: right
        height: 187px
        font-family: $font-family-light
        font-size: $font-size-small-s
        color: #F2633E
        background: #F6F7FA
      .bottom-btn
        layout(row)
        .btn
          flex: 1
          normal-button-default()
          border-radius: 0
</style>
