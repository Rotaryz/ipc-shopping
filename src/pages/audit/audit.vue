<template>
  <div class="employee">
    <div :class="emListStyle">
      <div class="em-list-await">
        <div class="em-list-await-title">商家信息</div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">商家名称</div>
          </div>
          <div class="await-list-right">{{awaitList.shop_name}}
          </div>
        </div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">行业类型</div>
          </div>
          <div class="await-list-right">{{awaitList.shop_type}}
          </div>
        </div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">地址</div>
          </div>
          <div class="await-list-right">{{awaitList.address}}
          </div>
        </div>
      </div>
      <div class="em-list-succeed">
        <div class="em-list-await-title">订单详情</div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">单价</div>
          </div>
          <div class="await-list-right">{{awaitList.price}}元/个
          </div>
        </div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">购买数量</div>
          </div>
          <div class="await-list-right">{{awaitList.count}}个
          </div>
        </div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">实付金额</div>
          </div>
          <div class="await-list-right moneys">
            <span class="money">¥</span>{{awaitList.money}}
          </div>
        </div>
      </div>
      <div class="em-list-succeed" v-if="btnSta == 1 || btnSta === 2">
        <div class="em-list-await-title">优惠券信息</div>
        <div class="await-list-items info">
          <coupon :useModel="0" :couponInfo="couponInfo" @lookOverHandler="lookOverHandler"></coupon>
        </div>
      </div>
    </div>
    <form class="floorAdd" v-if="btnSta === 0 " @submit="formSubmit" report-submit='true'>
      <div class="addEmployee">
        <button class="refuse" @tap="refuse" form-type="submit">拒绝</button>
        <button class="pass" @tap="remind" form-type="submit">提醒(添加优惠券)</button>
      </div>
    </form>
    <form class="floorAdd" v-if="btnSta === 1 " @submit="formSubmit" report-submit='true'>
      <div class="addEmployee">
        <article class="change btn-1" @tap="changeCoupon" form-type="submit">
          <img class="img" v-if="imageUrl" :src="imageUrl+'/defaults/ipc-shopping/common/icon-union_yhj@2x.png'">
          <div class="txt">更换优惠券</div>
        </article>
        <button class="refuse btn-1" @tap="refuse" form-type="submit">拒绝</button>
        <button class="pass" @tap="accept" form-type="submit">通过</button>
      </div>
    </form>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import Coupon from 'components/coupon-item/coupon-item'
  import {baseURL, ERR_OK} from 'api/config'
  import Toast from '@/components/toast/toast'
  import wx from 'wx'
  import api from 'api'
  import * as wechat from 'common/js/wechat'

  const BTN = ['审核中', '待审核', '已审核', '已拒绝']

  export default {
    data() {
      return {
        imageUrl: baseURL.image,
        awaitList: {
          shop_name: '',
          shop_type: '',
          address: '',
          price: '',
          count: '',
          money: ''
        },
        couponInfo: {
          id: '',
          type: '',
          name: '',
          shopName: '',
          scope: '',
          useLife: '',
          image_url: '',
          appId: '',
          appPath: '',
          merchantId: ''
        },
        show: false,
        title: '',
        btnSta: 1,
        currentActiveId: null
      }
    },
    onLoad() {
    },
    onShow() {
      this._init()
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    methods: {
      _init() {
        let query = this.$root.$mp.query
        this.currentActiveId = query.checkId
        this.btnSta = query.tabFlag * 1
        if (this.currentActiveId && this.btnSta >= 0) {
          wx.setNavigationBarTitle({title: BTN[this.btnSta]})
          this._rqGetDetail({id: this.currentActiveId})
        }
      },
      formSubmit(e) {
        let formId = e.mp.detail.formId
        let data = {'form_ids': [formId]}
        api.homeCollectFormId(data)
      },
      _rqGetDetail(data, loading) {
        api.uckGetCheckDetail(data, loading)
          .then(json => {
            wechat.hideLoading()
            if (json.error !== ERR_OK) {
              this.$refs.toast.show(json.message)
              return false
            }
            this._renderData(json)
          })
          .catch(err => {
            console.info(err)
          })
      },
      _renderData(json) {
        let res = json.data
        this.awaitList.shop_name = res.merchant_data.shop_name
        this.awaitList.shop_type = res.merchant_data.industry
        this.awaitList.address = res.merchant_data.address
        this.awaitList.price = res.order.price
        this.awaitList.count = res.order.count
        this.awaitList.money = res.order.total
        if (res.promotion.id) {
          this.couponInfo.id = res.promotion.id
          this.couponInfo.type = res.promotion.promotion_type_cn
          this.couponInfo.name = res.promotion.title
          this.couponInfo.shopName = res.merchant_data.shop_name
          this.couponInfo.scope = `限${res.merchant_data.shop_name}使用`
          this.couponInfo.useLife = `有效期:${res.promotion.start_at}至${res.promotion.end_at}`
          this.couponInfo.image_url = res.promotion.image_url
          this.couponInfo.appId = res.app_id
          this.couponInfo.appPath = res.path
          this.couponInfo.merchantId = res.merchant_id
        }
      },
      _rqCheckApply(data, loading) {
        api.uckCheckApply(data, loading)
          .then(json => {
            wechat.hideLoading()
            if (json.error !== ERR_OK) {
              this.$refs.toast.show(json.message)
              return
            }
            this.$router.back()
          })
          .catch(err => {
            console.info(err)
          })
      },
      _formatReq(flag) {
        // 1通过 2拒绝 3替换 4提醒
        return {check_status: flag, apply_id: this.currentActiveId}
      },
      // 跳C端预览
      _toMpC(json) {
        wx.navigateToMiniProgram({
          appId: json.appId,
          path: json.path,
          extraData: {},
          envVersion: baseURL.jumpVersion,
          success(res) {
            // 打开成功
            console.info(res)
          }
        })
      },
      // 查看跳C端
      lookOverHandler(obj) {
        const id = obj.id
        const appId = obj.appId
        const merchantId = obj.merchantId
        const path = `${obj.appPath}?type=1&id=${id}&currentMerchant=${merchantId}`
        this._toMpC({appId, path})
      },
      changeCoupon() { // 提醒更换优惠券
        let data = this._formatReq(3)
        api.uckCheckApply(data)
          .then(json => {
            wechat.hideLoading()
            if (json.error !== ERR_OK) {
              this.$refs.toast.show(json.message)
              return
            }
            wx.setStorageSync('changeCoupon', 'success')
            this.$router.back()
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 拒绝
      refuse() {
        let data = this._formatReq(2)
        api.uckCheckApply(data)
          .then(json => {
            wechat.hideLoading()
            if (json.error !== ERR_OK) {
              this.$refs.toast.show(json.message)
              return
            }
            wx.setStorageSync('refuse', 'success')
            this.$router.back()
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 通过
      accept() {
        let data = this._formatReq(1)
        api.uckCheckApply(data)
          .then(json => {
            wechat.hideLoading()
            if (json.error !== ERR_OK) {
              this.$refs.toast.show(json.message)
              return
            }
            wx.setStorageSync('accept', 'success')
            this.$router.back()
          })
          .catch(err => {
            console.info(err)
          })
      },
      remind() {
        let data = this._formatReq(3) // 提醒添加优惠券
        api.uckCheckApply(data)
          .then(json => {
            wechat.hideLoading()
            if (json.error !== ERR_OK) {
              this.$refs.toast.show(json.message)
              return
            }
            wx.setStorageSync('remind', 'success')
            this.$router.back()
          })
          .catch(err => {
            console.info(err)
          })
      }
    },
    computed: {
      emListStyle() {
        return this.btnSta === 2 ? 'em-list em-list-2' : 'em-list'
      }
    },
    components: {
      // ConfirmMsg,
      Coupon,
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'

  .employee
    background-color: $color-background-f6
    min-height: 100vh
    overflow-y: auto

  .em-list
    padding-bottom: 65px
    &.em-list-2
      padding-bottom: 0px
    .em-list-await
      padding-left: 15px
      background-color: $color-background-ff
    .em-list-await-title
      height: 42px
      line-height: 42px
      text-indent: 8px
      vertical-line()
      font-family: $font-family-regular
      font-size: $font-size-medium
      color: $color-text-2d
    .await-list-item
      height: 45px
      justify-content: space-between
      display: flex
      cut-off-rule-bottom(0, 0, $color-cut-line-ed)
      &:last-child
        border-none()
    .await-list-item
      align-items: center
      .await-list-left
        display: flex
        align-items: center
        .left-image
          width: 34px
          height: 34px
          border-radius: 100%
          border: .5px solid $color-text-2d
          margin-right: 10px
        .left-name
          display: inline-block
          font-family: $font-family-light
          font-size: $font-size-medium
          color: $color-text-2d
          width: 100px
          no-wrap()
      .await-list-right
        display: flex
        align-items: center
        height: 99%
        font-family: $font-family-light
        font-size: $font-size-medium
        color: $color-text-00
        margin-right: 15px
        text-align: right
      .await-list-right.moneys
        font-family: $font-family-meddle
        font-size: $font-size-medium-x
        color: $color-text-2d
        .money
          font-family: $font-family-regular
          font-size: $font-size-small-s
          margin-top: 4px
          margin-right: 2px
    .await-list-items.info
      margin-left: -15px
      padding: 0 15px
      padding-bottom: 15px
    .em-list-succeed
      padding-left: 15px
      margin-top: 10px
      background-color: $color-background-ff

  .floorAdd
    position: fixed
    z-index: 1
    bottom: 0px
    left: 0
    right: 0
    height: 45px
    background-color: $color-background-ff
    .addEmployee
      display: flex
      flex-direction: row
      .change
        width: 78px
        height: 100%
        border-radius: 3px 0 0 0
        cut-off-rule-top()
        layout()
        justify-content: space-between
        align-items: center
        box-sizing: border-box
        padding-top: 9.5px
        &.btn-1
          border: none
        .img
          width: 17.5px
          height: 12.5px
          margin-bottom: 5px
          &.btn-1
            margin-bottom: 0
        .txt
          font-family: $font-family-light
          font-size: $font-size-small-s
          color: $color-text-2d
      .refuse
        text-align center
        flex: 1
        line-height: 45px
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-background-ff
        letter-spacing: 0.64px
        background-color: $color-assist-27
        border-radius: 3px 0 0 0
        &.btn-1
          border-radius: 0
      .pass
        text-align center
        flex: 1
        line-height: 45px
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-background-ff
        letter-spacing: 0.64px
        background-color: $color-assist-34
        border-radius: 0 3px 0 0


</style>
