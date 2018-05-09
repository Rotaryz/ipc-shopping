<template>
  <div class="withdraw">
    <div class="top">
      <div class="left">银行卡</div>
      <div class="right">{{bankCard}}</div>
    </div>
    <!--<div class="top">-->
      <!--<div class="left">账户余额</div>-->
      <!--<div class="right"><text class="small">¥</text>{{canUse}}</div>-->
    <!--</div>-->
    <div class="content">
      <div class="top">
        <div class="left">账户余额</div>
        <div class="right">{{canUse}}元</div>
      </div>
      <div class="title">提现金额</div>
      <div class="input-box">
        <div class="txt">¥</div>
        <input type="digit" class="moneyInput" bindinput="moneyChange" :value="money"/>
      </div>
      <div class="foot">
        <div class="left">提现到微信钱包</div>
        <div class="right" @tap="allIn">全部提现</div>
      </div>
      <div class="btn dis" @tap="withDrawMoney">提现</div>
      <div class="withdraw-txt">1-5个工作日到账</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        canUse: '50.00',
        money: '',
        bankCard: '绑定银行卡'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'

  .withdraw
    height: 100vh
    display: flex
    flex-direction: column
    background-color: $color-background-f6
    >.top
      background: $color-background-ff
      height: 45px
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0 15px
      .left
        font-family:$font-family-light
        font-size: $font-size-medium
        color: $color-text-2d
      .right
        font-family:$font-family-light
        font-size: $font-size-small
        color: $color-text-a4

    .content
      margin-top: 10px
      flex: 1
      padding: 0 0px 0px 15px
      background: $color-background-ff
      .top
        background: $color-background-ff
        height: 45px
        display: flex
        justify-content: flex-start
        align-items: center
        padding: 0 15px 0px 0px
        cut-off-rule-bottom()
        .left
          font-family:$font-family-light
          font-size: $font-size-small
          color: $color-text-2d
          margin-right: 5px
        .right
          font-family:$font-family-light
          font-size: $font-size-small
          color: $color-assist-34
      .title
        font-size: $font-size-medium
        color: $color-text-2d
        line-height: 28px
      .input-box
        display: flex
        align-items: flex-end
        padding-bottom: 2px
        border-bottom: 1px solid $color-col-line
        .txt
          font-family: PingFangSC-Regular
          font-size: $font-size-large-m
          color: $color-text
          padding-bottom: 3px
          margin-right: 3px
        .moneyInput
          font-size: 34px
          font-family: PingFangSC-Medium
          color: $color-text
          line-height: 34px
          height: 34px
      .foot
        display: flex
        margin-top: 10px
        align-items: center
        justify-content: space-between
        .left
          font-family: $font-family-light
          font-size: $font-size-small
          color: $color-text-a4
        .right
          font-size: $font-size-small
          color: $color-assist-pink
          padding: 5px 0 5px 5px

      .btn
        width: 85.333333333vw
        height: 12vw
        border-radius: 6vw
        line-height: 12vw
        text-align: center
        margin: 0 auto
        margin-top: 47px
        color: $color-white
        font-size: $font-size-medium-x
        font-family: PingFangSC-Regular
        nomal-icon()
        &:active
          hover-icon()
      .btn.dis
        disable-icon()

      .withdraw-txt
        font-size: $font-size-small
        color: $color-text-tr
        text-align: center
        margin-top: 15px

</style>
