<template>
  <div class="bind-card">
    <div class="form-wrapper">
      <div class="input-wrapper">
        <div class="label">姓名</div>
        <div class="input">
          <input class="input"
                 type="text"
                 placeholder="持卡人姓名"
                 placeholder-style="color: #a4a4a4;font-family: PingFangSC-Light;font-size: 14px"
                 v-model="name"
                 maxlength="4"/>
        </div>
      </div>
      <div class="input-wrapper">
        <picker class="picker" mode="selector" :key="index"
                @change="changeBank" :range="banks" range-key="name">
          <view class="picker-item">
            <div class="label">开户银行</div>
            <div class="picker-input" :class="{checks: depositBank}">{{depositBank !=='' ? depositBank : '选择开户银行'}}</div>
            <div>{{bank}}<img v-if="imageUrl" class="full-image" :src="imageUrl + '/defaults/b-image/page/Rectangle @2x.png'"/>
            </div>
          </view>
        </picker>
      </div>
      <div class="input-wrapper">
        <div class="label">银行卡号</div>
        <input class="input"
               type="number"
               placeholder="持卡人银行卡号"
               v-model="withdrawal_card"
               placeholder-style="color: #a4a4a4; font-family: PingFangSC-Light;font-size: 14px"
               v-on:blur="changeCard"
               maxlength="23"/>
      </div>
    </div>
    <div class="btn-wrapper">
      <div :class="{disable: !checkForm}" class="btn" v-on:click="save">保存</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'

  export default {
    data () {
      return {
        imageUrl: baseURL.image,
        depositBank: '',
        banks: [
          {id: 1, name: '11'},
          {id: 2, name: '21'}
        ],
        banksInput: '',
        name: '',
        withdrawal_card: '',
        checkForm: false
      }
    },
    methods: {
      changeBank (e) {
        const index = e.mp.detail.value
        this.depositBank = this.banks[index].name
      },
      changeCard () {
        let value = this.withdrawal_card
        if (/\S{5}/.test(value)) {
          value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
        }
        this.withdrawal_card = value
      },
      checkFormFun () {
        if (this.name && this.depositBank && this.withdrawal_card) {
          this.checkForm = true
        } else {
          this.checkForm = false
        }
      },
      save () {
        if (!this.checkForm) {
          return
        }
        console.log('...')
      }
    },
    watch: {
      name () {
        this.checkFormFun()
      },
      withdrawal_card () {
        this.checkFormFun()
      },
      depositBank () {
        this.checkFormFun()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'

  .bind-card
    .arrow-right
      width: 10px
      height: 10px
    .form-wrapper
      padding-left: 12px
      .input-wrapper
        display: flex
        align-items: center
        justify-content: space-between
        height: 45px
        padding-right: 12px
        cut-off-rule-bottom()
        .label
          flex: 0 0 91px
          width: 91px
          font-size: $font-size-medium
          color: $color-text-46
          font-family: $font-family-light
        .input
          flex: 1
          font-size: $font-size-medium
          font-family: $font-family-light
          color: $color-text-2d
        .select-wrapper
          display: flex
          align-items: center
          .name
            font-size: $font-size-medium
            color: $color-text
            &.unselected
              color: $color-text-d
        .picker
          width: 100%
          height: 45px
          line-height: 45px
          .picker-item
            display: flex
            flex-direction: row
            justify-content: space-between
            .picker-input
              width: 100%
              font-family: $font-family-light
              font-size: $font-size-medium
              color: $color-text-a4
              &.checks
                color: $color-text-2d
            .full-image
              width: 8px
              height: 8px
              vertical-align: middle
    .btn-wrapper
      margin-top: 20px
      padding: 0 12px
      .btn
        normal-button-default()
        &.disable
          normal-button-default($color-text-95)

</style>
