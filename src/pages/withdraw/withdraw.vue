<template>
  <div class="withdraw">
    <div class="top">
      <div class="left">银行卡</div>
      <div class="right" :class="{check:bankCard!==''}" v-on:click="setBank">
        <img class="right-bank-icon"
             v-if="imageUrl && bankCard !==''" :src="bankCardIcon" alt="">
        {{bankCard !== '' ? bankCard : '绑定银行卡'}}
        <img class="right-img" v-if="imageUrl" :src="imageUrl +'/defaults/b-image/page/Rectangle @2x.png'" alt="">
      </div>
    </div>
    <div class="content">
      <div class="padding-left">
        <div class="top">
          <div class="left">账户余额</div>
          <div class="right">{{remaining}}
            <text class="small">元</text>
          </div>
        </div>
        <div class="title">提现金额</div>
        <div class="input-box">
          <div class="txt">¥</div>
          <input type="digit" class="moneyInput" v-on:blur="moneyChange"
                 v-model="money"/>
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
        <div class="dis" v-bind:class="{'withdraw-btn':withdrawFlag && bankFlag}" v-on:click="withDrawMoney">提现</div>
      </div>
      <div class="withdraw-txt">微信按提现金额0.1%收取手续费，最低1元，最高10元。</div>
    </div>
    <base-modal title="确认信息" ref="baseModal" @confirm="confirm">
      <div class="content" >
        <div class="modal-wrapper" slot="content">
          <div class="item-wrapper border-bottom-1px">
            <div class="left">到账金额：</div>
            <div class="right">¥{{caculateRealMoney}}</div>
          </div>
          <div class="item-wrapper border-bottom-1px">
            <div class="left">手续费：</div>
            <div class="right">¥{{poundage}}</div>
          </div>
          <div class="item-wrapper">
            <div class="left">余额：</div>
            <div class="right">¥{{caculateBalance}}</div>
          </div>
        </div>
      </div>
    </base-modal>
    <Toast ref="toast"></Toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL, ERR_OK } from 'api/config'
  import api from 'api'
  import * as wechat from 'common/js/wechat'
  import BaseModal from 'components/base-modal/base-modal'
  import Toast from '@/components/toast/toast'

  export default {
    data () {
      return {
        imageUrl: baseURL.image,
        remaining: '100',
        money: '',
        bankCard: '',
        withdrawFlag: false,
        poundage: '',
        bankCardIcon: '',
        withdrawalInfo: '',
        caculateRealMoney: '',
        caculateBalance: '',
        canWithdrawal: false,
        bankFlag: false
      }
    },
    components: {
      BaseModal,
      Toast
    },
    mounted () {
      // this.getInfo()
    },
    onShow () {
      this.getInfo()
    },
    methods: {
      getInfo() {
        this.money = ''
        this._getWithdraw()
        wechat.hideLoading()
      },
      _getWithdraw () {
        let data = {}
        this.bankFlag = false
        api.empGetWithdraw(data).then(res => {
          if (res.error !== ERR_OK) {
            return
          }
          this.remaining = res.data.remaining
          this.canWithdrawal = res.data.can_withdrawal
          let info = res.data.withdrawal_info
          if (info.bank) {
            // let tmp = info.withdrawal_card.substring(info.withdrawal_card.length - 4, info.withdrawal_card.length)
            this.bankCard = info.withdrawal_card // ` ${info.bank} 尾号 ${tmp}`
            this.bankCardIcon = info.image_url
            this.withdrawalInfo = info
            this.bankFlag = true
          }
        }).catch(err => {
          console.log(err)
        })
      },
      setBank () {
        this.$router.push({
          name: 'BindCard',
          path: '/pages/bind-card/bind-card',
          query: this.withdrawalInfo
        })
      },
      moneyChange (e) {
        if (this.money * 1 > this.canUse * 1) {
          this.money = this.remaining * 1
        }
      },
      allIn () {
        this.money = this.remaining * 1
      },
      confirm() {
        let data = {money: this.money}
        api.empSetWithdraw(data).then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.$router.push({
            name: 'WithdrawResult',
            path: '/pages/withdrawal-result/withdrawal-result',
            query: {data: res.message}
          })
        }).catch(err => {
          console.log(err)
        })
        // let res = {message: '1234'}
        // this.$router.push({
        //   name: 'WithdrawResult',
        //   path: '/pages/withdrawal-result/withdrawal-result',
        //   query: {data: res.message}
        // })
      },
      withDrawMoney () {
        if (!this.checkMoney() || this.withdrawalInfo === '') {
          return
        }
        if (!this.canWithdrawal) {
          this.$refs.toast.show('今日提现次数为0')
          return
        }
        this.$refs.baseModal.shows()
      },
      checkMoney () {
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        return reg.test(this.money) && this.money * 1 <= this.remaining * 1 && this.money > 0
      },
      _caculate () {
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
      caculateRealMoney() {
        return Math.abs(this.money) - Math.abs(this.poundage).toFixed(2)
      },
      money: function (val) {
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        if (val !== '' && val * 1 >= 1 && reg.test(this.money)) {
          if (val * 1 > this.remaining * 1) {
            this.money = this.remaining * 1
          }
          this._caculate()
          this.caculateRealMoney = Math.abs(this.money) - Math.abs(this.poundage).toFixed(2)
          this.caculateBalance = Math.abs(this.remaining) - Math.abs(this.money).toFixed(2)
          if (this.withdrawalInfo !== '') {
            this.withdrawFlag = true
          }
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
    > .top
      background: $color-background-ff
      height: 45px
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0 15px
      .left
        font-family: $font-family-light
        font-size: $font-size-medium
        color: $color-text-2d
      .right
        font-family: $font-family-light
        font-size: $font-size-small
        color: $color-text-a4
        display: flex
        align-items: center
        .right-bank-icon
          width: 16px
          height: 16px
          margin-right: 5px
        .right-img
          width: 8px
          height: 8px
          margin-left: 5px
      .right.check
        color: $color-text-46
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
            font-family: $font-family-light
            font-size: $font-size-small
            color: $color-text-2d
            margin-right: 5px
          .right
            font-family: $font-family-din
            font-size: $font-size-medium-x
            color: $color-text-a4
            .small
              font-family: $font-family-light
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
            color: $color-assist-34

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

    .modal-wrapper
      padding: 0 10px
      .item-wrapper
        display: flex
        align-items: center
        height: 44px
        font-size: $font-size-medium
        &:last-child
          .left, .right
            color: $color-text-a4
        .left
          flex: 0 0 75px
          width: 75px
          text-align: right
        .right
          flex: 1
</style>
