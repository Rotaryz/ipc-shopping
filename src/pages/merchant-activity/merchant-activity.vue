<template>
  <form class="activity-content" @submit="formSubmit" report-submit='true'>
    <div class="activity-detail">
      <img :src="image + '/defaults/ipc-shopping/merchant/pic-activity_banner02@2x.png'" class="detail-bg" v-if="image">
      <div class="detail-money">
        <div class="money">
          <div class="icnon">¥</div>
          <div class="number">{{allotMoney || 0}}</div>
        </div>
        <div class="text">正在等待抢钱</div>
      </div>
      <div class="detail-canvas">
        <div class="canvas-box">
          <img :src="image + '/defaults/ipc-shopping/merchant/bg-activity_card@2x.png'" class="canvas-bg" v-if="image">
          <div class="canvas-text">
            <div class="title">
              <div class="tilte-left">{{activityData.name}}</div>
              <div class="tilte-right" @tap="jumpPreview">
                <div class="text">预览活动</div>
                <img :src="image + '/defaults/ipc-shopping/home/icon-mhome_j@2x.png'" class="right" v-if="image">
              </div>
            </div>
            <div class="cavas-list">
              <div class="left">活动时间</div>
              <div class="right">{{activityData.start_at}}至{{activityData.end_at}}</div>
            </div>
            <div class="cavas-list">
              <div class="left">活动费用</div>
              <div class="right">
                <div class="icon">¥</div>
                <div class="number">{{activityData.apply_price}}</div>
              </div>
            </div>
            <div class="cavas-list">
              <div class="left">活动地址</div>
              <div class="right">{{activityData.address}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="activity-box">
      <div class="add-number" v-if="status === 0">
        <div class="text">购买数量</div>
        <div class="calculate-box">
          <div class="subtract" @tap="subtract">-</div>
          <input type="number" class="number" v-model="addNumber">
          <div class="add" @tap="add">+</div>
        </div>
      </div>
      <div :class="['activity-rules', showRule ? '' : 'activity-hide']">
        <div class="rules-top">
          <div class="text">活动规则</div>
          <img
            :src=" showRule ? image + '/defaults/ipc-shopping/home/icon-activity_up@2x.png' : image + '/defaults/ipc-shopping/home/icon-activity_down@2x.png' "
            class="down" v-if="image">
          <div class="click-box" @tap="showRules"></div>
        </div>
        <div class="rules-con">
          <div class="rules-one rules-line">
            <div class="title">活动奖励</div>
            <!--<div class="text">凡成功参与该活动的商家，可以到的的好处：</div>-->
            <!--<div class="text">1. 商家以及员工，每销售一张卡券，得到50元的奖励。</div>-->
            <!--<div class="text">2. 商家销售卡的用户，到其他门店使用一次，得到联盟力10分奖励。（可以分全部联盟商家报名该活 动的报名金）</div>-->
            <!--<div class="text">3. 商家可以得到该活动全部商家的异业客户引流客户。</div>-->
            <div class="text">{{activityData.award_note}}</div>
          </div>
          <div class="rules-one rules-line">
            <div class="title">活动要求</div>
            <!--<div class="text">凡报名参加活动的商家，需同意以下活动要求：</div>-->
            <!--<div class="text">1. 用户购买异业联盟卡后，提供商品给用户。</div>-->
            <!--<div class="text">2. 添加商家自己的固定数量的免费优惠券。</div>-->
            <!--<div class="text">3. 支持平台提供的10元代金券，小程序买单的使用。</div>-->
            <div class="text">{{activityData.claim_note}}</div>
          </div>
          <div class="rules-one">
            <div class="title">活动明细</div>
            <!--<div class="text">凡成功参与该活动的商家，可以到的的好处：</div>-->
            <!--<div class="text">1. 本活动仅在XX商圈内开展。</div>-->
            <!--<div class="text">2. 该活动需要商家付费参加，如果报名没有通过， 会立刻原路退款。</div>-->
            <!--<div class="text">3. 本次活动的最终解释权归赞播所有。</div>-->
            <div class="text">{{activityData.detail_note}}</div>
          </div>
        </div>
      </div>
      <div class="apply-box" v-if="status === 1">
        <div class="box-top">
          <img :src="image + '/defaults/ipc-shopping/home/icon-activity_pass@2x.png'" class="img" v-if="image">
          <div class="text">支付成功</div>
        </div>
        <div class="box-text">恭喜您支付成功，请尽快添加优惠券!</div>
      </div>
      <div class="coupon-up" v-if="status === 2 || status === 4">
        <div class="rules-top">
          <div class="text">优惠券信息</div>
        </div>
        <div class="coupon-info">
          <coupon :useModel="1" :useType="0" :couponInfo="coupon"></coupon>
        </div>
      </div>
      <div class="coupon-up" v-if="status === 3">
        <div class="rules-top">
          <div class="text">已上传</div>
          <div class="right">请更换更有折扣的商品</div>
        </div>
        <div class="coupon-info">
          <coupon :useModel="1" :useType="0" :couponInfo="coupon"></coupon>
        </div>
      </div>
      <div class="apply-box apply-fails" v-if="status > 4">
        <div class="box-top">
          <img :src="image + '/defaults/ipc-shopping/home/icon-activity_fail@2x.png'" class="img" v-if="image">
          <div class="text">报名失败</div>
        </div>
        <div class="box-text">sorry，因为这次报名商家过多，您的活动申请无法通过。您可以申请退款或者申请排队，不退款申请排队的商家，下次活动拥有优先通过的权利！</div>
      </div>
    </div>
    <button class="btn" v-if="status === 0" @tap="appSubmit" form-type="submit">报名(支付{{activityData.apply_price *
      addNumber}}元）
    </button>
    <footer class="btn" v-if="status === 1 || status === 3" @tap="chooseCoupon">{{couponText}}</footer>
    <footer class="btn no-select" v-if="status === 2 || status === 4 || status > 5">{{btnText}}</footer>
    <footer class="btn-box" v-if="status === 5">
      <div class="btn-refunds btn-one" @tap.stop="applyRefund">申请退款</div>
      <div class="btn-refunds" @tap.stop="applyLine">申请排队</div>
    </footer>
    <model :show="showTitle" :title="title" @confirm="applyConfirm" @cancel="applyCancel"></model>
    <div class="page-bg"></div>
    <toast ref="toast"></toast>
  </form>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import { baseURL, ERR_OK } from 'api/config'
  import Coupon from 'components/coupon-item/coupon-item'
  import model from 'components/confirm-msg/confirm-msg'
  import * as wechat from 'common/js/wechat'
  import { mapGetters } from 'vuex'
  import wx from 'wx'
  import Toast from '@/components/toast/toast'

  export default {
    data () {
      return {
        image: baseURL.image,
        showRule: false,
        btnText: '审核中',
        couponText: '添加优惠券',
        status: null, // 页面状态 （0为未报名,1为未添加优惠券,2为未审核中,3为更换优惠券,4为未审核成功,5为未审核失败,6为退款成功,7为退款失败,8为排队中）
        activityData: {},
        addNumber: 1,
        applyLock: false,
        coupon: {},
        title: '确定排队？',
        showTitle: false,
        modelNumber: null,
        applyId: null,
        activeId: 1,
        allotMoney: null
      }
    },
    onShow () {
      this._getFromMsgTpl()
      this.addNumber = 1
      this.activeId = this.$root.$mp.query.id
      console.log(this.activeId, '```````````````')
      this._rqManageDetails(this.activeId)
    },
    beforeMount () {
      this._init()
    },
    methods: {
      ...mapGetters(['role']),
      _getFromMsgTpl () {
        console.log(this.$root.$mp.appOptions.scene, '`````````````scene')
        if (this.$root.$mp.appOptions.scene === 1014) {
          let token = this.$root.$mp.query.token
          let entryRole = this.$root.$mp.query.entryRole
          let merchantId = this.$root.$mp.query.merchantId
          token && wx.setStorageSync('userType', token)
          entryRole && wx.setStorageSync('token', entryRole)
          merchantId && wx.setStorageSync('merchantId', merchantId)
          console.log(token, '`````````````token')
        }
      },
      _init () {
        let role = this.role()
        this.currentRole = role
      },
      _getAllotMoney () {
        api.dataAllotMoney(this.activeId).then(res => {
          console.log(res)
          if (res.error === ERR_OK) {
            this.allotMoney = res.data.share_money
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      },
      formSubmit (e) {
        let formId = e.mp.detail.formId
        let data = {'form_ids': [formId]}
        api.homeCollectFormId(data)
      },
      // 显示规则
      showRules () {
        this.showRule = !this.showRule
      },
      jumpPreview () {
        const url = `/pages/activity-detail/activity-detail?activityId=${this.activeId}`
        this.$router.push(url)
      },
      // 获取商家活动详情
      _rqManageDetails (id) {
        this.showRule = false
        api.merManageDetails(id).then(res => {
          console.log(res.data)
          if (res.error === ERR_OK) {
            this.activityData = res.data
            if (res.data.alliance_merchant_apply.length === 0) {
              this.status = 0
              this.showRule = true
            } else {
              this.applyId = res.data.alliance_merchant_apply.id
              if (parseInt(res.data.alliance_merchant_apply.promotion_id) === 0) {
                this.status = 1
                this.couponText = '添加优惠券'
              } else {
                api.merCouponDetails(res.data.alliance_merchant_apply.promotion_id).then(res => {
                  console.log(res)
                  this.coupon = {
                    image_url: res.data.promotion_image_data[0].image_url,
                    promotion_type_cn: res.data.promotion_type_cn,
                    title: res.data.title,
                    end_at: res.data.end_at,
                    id: res.data.id
                  }
                })
                if (res.data.alliance_merchant_apply.check_status * 1 === 0) {
                  this.status = 2
                  this.btnText = '审核中'
                } else if (res.data.alliance_merchant_apply.check_status * 1 === 1) {
                  this.status = 4
                  this.btnText = '报名成功'
                } else if (res.data.alliance_merchant_apply.check_status * 1 === 3) {
                  this.status = 3
                  this.couponText = '更换优惠券'
                } else {
                  if (res.data.alliance_merchant_apply.refund_status * 1 === 0) {
                    this.status = 5
                  } else if (res.data.alliance_merchant_apply.refund_status * 1 === 1) {
                    this.status = 6
                    this.btnText = '退款成功'
                  } else if (res.data.alliance_merchant_apply.refund_status * 1 === 2) {
                    this.status = 7
                    this.btnText = '退款失败'
                  } else if (res.data.alliance_merchant_apply.refund_status * 1 === 3) {
                    this.status = 8
                    this.btnText = '排队中'
                  }
                }
                console.log(this.status, '当前页面的状态')
              }
            }
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      },
      subtract () {
        if (parseInt(this.addNumber) <= 1) {
          return
        }
        this.addNumber--
      },
      add () {
        this.addNumber++
      },
      appSubmit () {
        // 下单调取支付
        if (!this.addNumber) return
        if (this.addNumber < 1) {
          return this.$refs.toast.show('数量不小于1')
        }
        if (this.applyLock) return
        this.applyLock = true
        setTimeout(() => {
          this.applyLock = false
        }, 3000)
        wechat.login().then(res => {
          let code = res.code
          let that = this
          // 调起支付
          api.merApplyPay(this.addNumber, this.activityData.id, code).then(res => {
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
                  that.$router.go(-2)
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
        })
      },
      chooseCoupon () {
        let activityId = this.applyId
        let selectId = this.coupon.id
        let url = `/pages/upload-coupon/upload-coupon?activityId=${activityId}&selectId=${selectId}`
        this.$router.push(url)
        console.log(url)
      },
      applyRefund () {
        this.showTitle = true
        this.title = '确定退款？'
        this.modelNumber = 1
      },
      applyLine () {
        this.showTitle = true
        this.title = '确定排队？'
        this.modelNumber = 2
      },
      applyCancel () {
        this.showTitle = false
      },
      applyConfirm () {
        if (this.modelNumber === 1) {
          // 报名申请退款
          api.merRefund(this.applyId).then(res => {
            console.log(res, '报名申请退款`````')
            if (res.error === ERR_OK) {
              this.$refs.toast.show('申请退款成功')
              this.$router.back(1)
            } else {
              this.$refs.toast.show(res.message)
            }
            wechat.hideLoading()
            this.showTitle = false
          })
        } else {
          // 报名申请排队
          api.merQueueUp(this.applyId).then(res => {
            console.log(res, '报名申请排队`````')
            if (res.error === ERR_OK) {
              this.$refs.toast.show('申请申请排队')
              this.$router.back(1)
            } else {
              this.$refs.toast.show(res.message)
            }
            wechat.hideLoading()
            this.showTitle = false
          })
        }
      }
    },
    components: {
      Coupon,
      model,
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .page-bg
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    background: #F6F7FA

  .activity-content
    background: #F6F7FA

  .activity-detail
    position: relative
    padding-bottom: 27%
    .detail-bg
      width: 100%
    .detail-money
      width: 100%
      left: 0
      top: 19.5px
      text-align: center
      position: absolute
      .money
        layout(row)
        justify-content: center
        align-items: flex-end
        .icnon
          margin-right: 2px
          font-family: $font-family-regular
          font-size: $font-size-medium
          color: #FFFE5C
        .number
          line-height: 1
          color: #FFFE5C
          font-family: DINAlternate-Bold
          font-size: 30px
      .text
        margin-top: 5px
        font-family: $font-family-regular
        font-size: $font-size-medium
        color: $color-background-ff

    .detail-canvas
      box-sizing: border-box
      position: absolute
      top: 38%
      width: 100%
      padding: 0 15px
      left: 0
      .canvas-box
        width: 100%
        position: relative
        .canvas-bg
          width: 100%
        .canvas-text
          box-sizing: border-box
          top: 0
          left: 0
          padding-left: 15px
          position: absolute
          width: 100%
          .title
            layout(row)
            box-sizing: border-box
            justify-content: space-between
            width: 100%
            line-height: 45px
            height: 45px
            padding-right: 8px
            cut-off-rule-bottom(0, 0, rgba(255, 255, 255, 0.16), 0.5px)
            .tilte-left
              font-family: $font-family-regular
              font-size: $font-size-medium-x
              color: $color-background-ff
            .tilte-right
              layout(row)
              font-family: $font-family-light
              font-size: $font-size-small
              color: $color-background-ff
              align-items: center
              .right
                height: 18px
                display: block
                margin-left: 5px
                width: 15px
          .cavas-list
            layout(row)
            align-items: center
            margin-top: 18px
            &:first-child
              margin-top: 15px
            .left
              margin-right: 14px
              font-family: $font-family-light
              font-size: $font-size-medium
              color: rgba(255, 255, 255, 0.60)
            .right
              layout(row)
              font-family: $font-family-light
              font-size: $font-size-medium
              color: $color-background-ff
              align-items: flex-end
              .icon
                margin-right: 2px
                font-size: $font-size-small-ss
                height: $font-size-small-ss
                font-family: $font-family-light
                line-height: 7px
              .number
                font-size: $font-size-medium
                font-family: $font-family-light
                line-height: $font-size-medium
                height: $font-size-medium

  .activity-box
    padding: 0 15px 60px
    .add-number
      vertical-line()
      height: 50px
      border-radius: 3px
      padding: 0 15px
      background: $color-background-ff
      layout(row)
      justify-content: space-between
      align-items: center
      .text
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-text-2d
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
    .activity-rules
      margin-top: 10px
      border-radius: 3px
      background: $color-background-ff
      .rules-top
        vertical-line()
        height: 50px
        border-radius: 3px
        padding: 0 15px
        layout(row)
        justify-content: space-between
        align-items: center
        .text
          font-family: $font-family-regular
          font-size: $font-size-medium-x
          color: $color-text-2d
        .down
          width: 14px
          height: 14px
          display: block
        .click-box
          position: absolute
          right: 0
          top: 0
          width: 60px
          height: 100%
      .rules-con
        padding-left: 15px
        .rules-one
          padding: 15px 18px 17px 0
          .title
            font-family: $font-family-regular
            font-size: $font-size-medium
            color: $color-text-2d
            line-height: 1
            margin-bottom: 17.5px
          .text
            font-family: $font-family-light
            font-size: $font-size-medium
            color: $color-text-2d
        .rules-line
          cut-off-rule-bottom(0, 0, #EDEDED)
    .activity-hide
      height: 50px
      overflow: hidden
    .apply-box
      padding: 17px 15px
      border-radius: 3px
      background: $color-background-ff
      margin-top: 10px
      height: 137px
      .box-top
        align-items: center
        layout(row)
        .img
          width: 15px
          height: 15px
          margin-right: 5px
          display: block
        .text
          font-family: $font-family-meddle
          font-size: $font-size-medium-x
          color: $color-text-2d
      .box-text
        margin-top: 16.5px
        font-family: $font-family-light
        font-size: $font-size-medium
        color: $color-text-2d
    .coupon-up
      margin-top: 10px
      background: $color-background-ff
      border-radius: 3px
      .rules-top
        vertical-line()
        height: 50px
        border-radius: 3px
        padding: 0 15px
        layout(row)
        justify-content: space-between
        align-items: center
        .text
          font-family: $font-family-regular
          font-size: $font-size-medium-x
          color: $color-text-2d
        .right
          font-family: $font-family-regular
          font-size: $font-size-small
          color: #a4a4a4
      .coupon-info
        padding: 0 15px 12.5px 15px

  .btn
    position: fixed
    bottom: 0
    left: 0
    right: 0
    normal-button-default()
    border-radius: 0

  .no-select
    normal-button-default(#959DBD)
    border-radius: 0

  .btn-box
    position: fixed
    bottom: 0
    left: 0
    right: 0
    layout(row)
    .btn-refunds
      flex: 1
      normal-button-default()
      border-radius: 0
    .btn-one
      normal-button-default(#273156)
      border-radius: 0
</style>
