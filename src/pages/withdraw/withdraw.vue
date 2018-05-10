<template>
  <div class="withdraw">
    <div class="top">
      <div class="left">银行卡</div>
      <div class="right" v-on:click="setBank">
        <img class="right-bank-icon" v-if="imageUrl && bankCard !==''" :src="imageUrl +'/defaults/b-image/page/Rectangle @2x.png'" alt="">
        {{bankCard !== '' ? bankCard : '绑定银行卡'}}
        <img class="right-img" v-if="imageUrl" :src="imageUrl +'/defaults/b-image/page/Rectangle @2x.png'" alt="">
      </div>
    </div>
    <div class="content">
      <div class="padding-left">
        <div class="top">
          <div class="left">账户余额</div>
          <div class="right">{{canUse}}<text class="small">元</text></div>
        </div>
        <div class="title">提现金额</div>
        <div class="input-box">
          <div class="txt">¥</div>
          <input type="digit" class="moneyInput" v-on:blur="moneyChange"
                 v-model="money" />
        </div>
        <div class="foot" v-if="!withdrawFlag">
          <div class="left">提现到微信钱包</div>
          <div class="right" v-on:click="allIn">全部提现</div>
        </div>
        <div class="foot" v-if="withdrawFlag">
          <div class="left">手续费¥{{poundage}}</div>
        </div>
      </div>
      <div class="content-withdraw">
        <div class="dis" v-bind:class="{'withdraw-btn':withdrawFlag}" v-on:click="withDrawMoney">提现</div>
      </div>
      <div class="withdraw-txt">微信按提现金额0.1%收取手续费，最低1元，最高10元。</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  export default {
    data () {
      return {
        imageUrl: api.image,
        canUse: '50000.00',
        money: '',
        bankCard: '',
        withdrawFlag: false,
        poundage: ''
      }
    },
    methods: {
      setBank() {
        this.$router.push({
          name: 'BindCard',
          path: '/pages/bind-card/bind-card',
          params: {id: 123}
        })
      },
      moneyChange () {
        if (this.money * 1 > this.canUse * 1) {
          this.money = this.canUse * 1
        }
      },
      allIn () {
        this.money = this.canUse * 1
      },
      withDrawMoney () {
        if (this.checkMoney()) {
          console.log('ok')
        }
      },
      checkMoney() {
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        return reg.test(this.money) && this.money * 1 <= this.canUse * 1
      },
      _caculate() {
        const money = this.money
        if (money / 1000 < 1) {
          this.poundage = 1
        } else if (money / 1000 > 10) {
          this.poundage = 10
        } else {
          this.poundage = (money / 1000).toFixed(2)
        }
      }
    },
    watch: {
      money: function (val) {
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        if (val !== '' && val * 1 > 0 && reg.test(this.money)) {
          this.withdrawFlag = true
          if (val * 1 > this.canUse * 1) {
            this.money = this.canUse * 1
          }
          this._caculate()
        } else {
          this.withdrawFlag = false
        }
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
        .right-bank-icon
          width: 16px
          height: 16px
        .right-img
          width: 8px
          height: 8px
    .content
      margin-top: 10px
      flex: 1
      background: $color-background-ff
      .padding-left
        padding-left: 15px
        .top
          background: $color-background-ff
          height: 45px
          display: flex
          justify-content: space-between
          align-items: center
          padding: 0 15px 0px 0px
          cut-off-rule-bottom()
          .left
            font-family:$font-family-light
            font-size: $font-size-small
            color: $color-text-2d
            margin-right: 5px
          .right
            font-family:$font-family-din
            font-size: $font-size-medium-x
            color: $color-text-a4
            .small
              font-family:$font-family-light
              font-size: $font-size-medium
              color: $color-text-a4
        .title
          font-family: $font-family-light
          font-size: $font-size-small
          color: $color-text-2d
          height: 45px
          line-height: 45px
        .input-box
          display: flex
          align-items: flex-end
          padding-bottom: 2px
          caret-color: $color-assist-34
          .txt
            font-family: PingFangSC-Regular
            font-size: $font-size-large-m
            color: $color-text
            padding-bottom: 3px
            margin-right: 3px
          .moneyInput
            font-size: $font-size-shop
            font-family: $font-family-din
            color: $color-text-2d
            line-height: 34px
            height: 34px
        .foot
          display: flex
          margin-top: 10px
          align-items: center
          justify-content: flex-start
          .left
            font-family: $font-family-light
            font-size: $font-size-small
            color: $color-text-a4
            margin-right: 5px
          .right
            font-size: $font-size-small
            color:$color-assist-34

      .content-withdraw
        padding: 22.5px 14.5px 10px 14.5px
        .dis
          normal-button-default($color-text-95)
        .withdraw-btn
          normal-button-default()
      .withdraw-txt
        font-family: $font-family-light
        font-size: $font-size-small
        color: $color-text-a4
        text-align: center


</style>
