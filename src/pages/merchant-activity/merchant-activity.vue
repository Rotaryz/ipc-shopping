<template>
  <div class="activity-content">
    <div class="activity-detail" v-if="showRule">
      <img :src="image + '/defaults/ipc-shopping/merchant/pic-activity_banner02@2x.png'" class="detail-bg" v-if="image">
      <div class="detail-money">
        <div class="money">
          <div class="icnon">¥</div>
          <div class="number">10000</div>
        </div>
        <div class="text">正在等待抢钱</div>
      </div>
      <div class="detail-canvas">
        <div class="canvas-box">
          <img :src="image + '/defaults/ipc-shopping/merchant/bg-activity_card@2x.png'" class="canvas-bg" v-if="image">
          <div class="canvas-text">
            <div class="title">
              <div class="tilte-left">异业联盟卡</div>
              <div class="tilte-right">
                <div class="text">预览活动</div>
                <img :src="image + '/defaults/ipc-shopping/home/icon-union_j@2x.png'" class="right" v-if="image">
              </div>
            </div>
            <div class="cavas-list">
              <div class="left">活动时间</div>
              <div class="right">2018-04-10至2018-05-10</div>
            </div>
            <div class="cavas-list">
              <div class="left">活动费用</div>
              <div class="right"><div class="icon">¥</div><div class="number">100</div></div>
            </div>
            <div class="cavas-list">
              <div class="left">活动地址</div>
              <div class="right">广州市白云区市桥商圈</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="activity-box">
      <div class="add-number">
        <div class="text">购买数量</div>
        <div class="calculate-box">
          <div class="subtract">-</div>
          <input type="number" class="number">
          <div class="add">+</div>
        </div>
      </div>
      <div :class="['activity-rules', showRule ? '' : 'activity-hide']">
        <div class="rules-top">
          <div class="text">活动规则</div>
          <img :src=" showRule ? image + '/defaults/ipc-shopping/home/icon-activity_up@2x.png' : image + '/defaults/ipc-shopping/home/icon-activity_down@2x.png' "  class="down" v-if="image">
          <div class="click-box"  @tap="showRules"></div>
        </div>
        <div class="rules-con">
          <div class="rules-one">
            <div class="title">活动奖励</div>
            <div class="text">凡成功参与该活动的商家，可以到的的好处：</div>
            <div class="text">1. 商家以及员工，每销售一张卡券，得到50元的奖励。</div>
            <div class="text">2. 商家销售卡的用户，到其他门店使用一次，得到联盟力10分奖励。（可以分全部联盟商家报名该活 动的报名金）</div>
            <div class="text">3. 商家可以得到该活动全部商家的异业客户引流客户。</div>
          </div>
          <div class="rules-one">
            <div class="title">活动要求</div>
            <div class="text">凡报名参加活动的商家，需同意以下活动要求：</div>
            <div class="text">1. 用户购买异业联盟卡后，提供商品给用户。</div>
            <div class="text">2. 添加商家自己的固定数量的免费优惠券。</div>
            <div class="text">3. 支持平台提供的10元代金券，小程序买单的使用。</div>
          </div>
          <div class="rules-one">
            <div class="title">活动明细</div>
            <div class="text">凡成功参与该活动的商家，可以到的的好处：</div>
            <div class="text">1. 本活动仅在XX商圈内开展。</div>
            <div class="text">2. 该活动需要商家付费参加，如果报名没有通过， 会立刻原路退款。</div>
            <div class="text">3. 本次活动的最终解释权归赞播所有。</div>
          </div>
        </div>
      </div>
      <div class="apply-box" v-if="showRule">
        <div class="box-top">
          <img :src="image + '/defaults/ipc-shopping/home/icon-activity_pass@2x.png'" class="img" v-if="image">
          <div class="text">支付成功</div>
        </div>
        <div class="box-text">恭喜您支付成功，请尽快添加优惠券!</div>
      </div>
      <div class="apply-box apply-fails" v-if="showRule">
        <div class="box-top">
          <img :src="image + '/defaults/ipc-shopping/home/icon-activity_fail@2x.png'" class="img" v-if="image">
          <div class="text">报名失败</div>
        </div>
        <div class="box-text">sorry，因为这次报名商家过多，您的活动申请无法通过。您可以申请退款或者申请排队，不退款申请排队的商家，下次活动拥有优先通过的权利！</div>
      </div>
      <div class="coupon-up">
        <div class="rules-top">
          <div class="text">优惠卷信息</div>
        </div>
        <div class="coupon-info">
          <coupon></coupon>
        </div>
      </div>
      <div class="coupon-up">
        <div class="rules-top">
          <div class="text">已上传</div>
          <div class="right">请更换更有折扣的商品</div>
        </div>
        <div class="coupon-info">
          <coupon></coupon>
        </div>
      </div>
    </div>
    <footer class="btn">{{btnText}}</footer>
    <div class="page-bg"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import Coupon from 'components/coupon-item/coupon-item'

  export default {
    data() {
      return {
        image: api.image,
        showRule: false,
        btnText: '添加优惠券'
      }
    },
    methods: {
      showRules() {
        this.showRule = !this.showRule
      }
    },
    components: {
      Coupon
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
            cut-off-rule-bottom(0, 0, rgba(255,255,255,0.16), 0.5px)
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
            margin-top: 18px
            &:first-child
              margin-top: 15px
            .left
              margin-right: 14px
              font-family: $font-family-light
              font-size: $font-size-medium
              color: rgba(255,255,255,0.60)
            .right
              layout(row)
              font-family: $font-family-light
              font-size: $font-size-medium
              color: $color-background-ff
              align-items: flex-end
              .icon
                font-size: 9px
              .number
                line-height: 1
  .activity-box
    padding: 0 15px
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
          cut-off-rule-bottom(0, 0, #EDEDED)
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
</style>
