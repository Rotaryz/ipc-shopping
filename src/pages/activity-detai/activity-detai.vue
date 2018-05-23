<template>
  <div class="center">
    <div class="max-modal" v-for="(item,index1) in infoTop" v-bind:key="index1">
      <div v-for="(items, index2) in item" v-bind:key="index2">
        <div class="max-modal-title" v-if="index2===0">{{types[items.goods_type]}}</div>
        <div class="modal-item">
          <div class="modal-item-img">
            <img :src="items.goods_detail.url"/>
          </div>
          <div class="modal-item-right">
            <div class="right-top">
              <div class="name">{{items.goods_detail.title}}</div>
              <div class="number">× {{items.goods_num}}</div>
            </div>
            <div class="right-bottom">¥{{items.goods_detail.price}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="infoBottom.length > 0" class="max-modal max-modal-y" :class="{hide: hideFlag}" v-bind:style="{height: height}">
      <block v-for="item in infoBottom" v-bind:key="index">
        <div class="max-modal-title" v-if="index===0">{{types[item.goods_type]}}</div>
        <div class="modal-item">
          <div class="modal-item-img">
            <img :src="item.goods_detail.url"/>
            <div class="item-img-txt">{{item.shop_name}}</div>
          </div>
          <div class="modal-item-right">
            <div class="right-top">
              <div class="name">{{item.goods_detail.title}}</div>
              <div class="number">× {{item.goods_num}}</div>
            </div>
            <div class="right-bottom">¥{{item.goods_detail.price}}</div>
          </div>
        </div>
      </block>
      <div class="max-modal-hide" @tap.stop="hideFun">
        <img v-if="imageUri && hideFlag" :src="imageUri + '/defaults/ipc-shopping/page/icon-packup@2x.png'"/>
        <img v-if="imageUri && !hideFlag" :src="imageUri + '/defaults/ipc-shopping/page/icon-deploy@2x.png'"/>
      </div>
    </div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL, ERR_OK } from 'api/config'
  import Toast from '@/components/toast/toast'
  import api from 'api'
  import * as wechat from 'common/js/wechat'

  export default {
    components: {
      Toast
    },
    data () {
      return {
        imageUri: baseURL.image,
        types: [
          '代金券',
          '优惠券',
          '商品'
        ],
        orderInfo: {},
        infoTop: [],
        infoBottom: [],
        promotioId: '1', // 商品id\活动id
        employeesId: 0,
        activityStatus: '',
        userCoupon: '0', // 抵用券的文案
        title: '异业联盟卡',
        price: '0.00',
        stock: 0,
        count: 1,
        hideFlag: false,
        height: 0,
        heightItem: 100
      }
    },
    async onShow (options) {
      // let id = this.$root.$mp.query.id
      console.log(this.$root.$mp)
      console.log(options)
      await this._getActivity(options)
      await this._getActivityCoupon(options)
      await this.heightFun()
    },
    methods: {
      async heightFun () {
        this.height = this.infoBottom.length * 100 + 45 + 'px'
        this.$apply()
      },
      async _getActivity (options) {
        if (options) {
          this.promotioId = options.activityId
        }
        let res = await api.merLinkDetails(this.promotioId)
        console.log(res)
        wechat.hideLoading()
        this.infoTop = []
        let shop = []
        let dai = []
        if (res.error !== ERR_OK) {
          this.$refs.toast.show(res.message)
          return
        }
        res.data.goods.map(item => {
          if (item.goods_type === 0) {
            dai.push(item)
          } else {
            shop.push(item)
          }
        })
        this.infoTop.push(shop)
        this.infoTop.push(dai)
        this.title = res.data.name
        this.price = res.data.price
        this.stock = res.data.stock
        this.$apply()
      },
      async _getActivityCoupon (options) {
        if (options) {
          this.promotioId = options.activityId
        }
        let res = await api.merLinkCouponDetails(this.promotioId)
        wechat.hideLoading()
        if (res.error !== ERR_OK) {
          this.$refs.toast.show(res.message)
          return
        }
        this.infoBottom.push(...res.data)

        this.$apply()
      },
      hideFun () {
        let item = this.infoBottom.length
        this.hideFlag = !this.hideFlag
        if (this.hideFlag) {
          this.height = 145 + 'px'
        } else {
          this.height = item * 100 + 45 + 'px'
        }
        console.log(this.hideFlag)
        this.$apply()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'
  .center
    padding-bottom: 238px
    .max-modal.hide
      transition: all .5s
    .max-modal-y
      padding-bottom: 45px
    .max-modal
      transition: all .5s
      overflow: hidden
      cut-off-rule-bottom(0, 0, $color-col-line)
      background-color: $color-white
      margin-top: 10px
      padding-left: 10px
      cut-off-rule-top(0, 0, $color-col-line)
      .max-modal-title
        height: 45px
        display: flex
        align-items: center
        font-family: $font-family-meddle
        font-size: $font-size-medium
        color: $color-text
        padding-left: 8px
        vertical-line()
      .modal-item
        height: 100px
        display: flex
        flex-direction: row
        align-items: center
        cut-off-rule-top(0, 0, $color-col-line)
        .modal-item-img
          height: 70px
          width: 70px
          border-1px($color-col-line, 2px)
          image
            width: 100%
            height: 100%
          .item-img-txt
            width: 100%
            height: 18px
            line-height: 18px
            text-align: center
            font-family: $font-family-light
            font-size: $font-size-small-s
            color: $color-white
            background: rgba(0, 0, 0, 0.5)
            position: absolute
            left: 0
            bottom: 0

        .modal-item-right
          flex: 1
          display: flex
          flex-direction: column
          justify-content: space-between
          height: 70px
          padding: 0px 10px
          .right-top
            display: flex
            flex-direction: row
            justify-content: space-between
            .name
              font-family: $font-family-meddle
              font-size: $font-size-medium
              color: $color-text
              line-height: 18px
            .number
              font-family: $font-family-meddle
              font-size: $font-size-small
              color: $color-text
              line-height: 18px
          .right-bottom
            font-family: $font-family-light
            font-size: $font-size-medium
            color: $color-text
            letter-spacing: 0
            line-height: 18px
      .max-modal-hide
        height: 45px
        line-height: 45px
        text-align: center
        display: flex
        align-items: center
        justify-content: center
        position: absolute !important
        width: 100%
        bottom: 1px
        z-index: 2
        background-color: $color-white
        cut-off-rule-top(0, 0, $color-col-line)
        transition: all .5s
        image
          width: 12px
          height: 7px
          border-radius: 2px
    .bottom-order
      height: 228px
      display: flex
      flex-direction: column
      position: fixed
      bottom: 0px
      z-index: 2
      background-color: $color-background
      width: 100vw
      .bot-title, .bot-number, .bot-total
        background-color: $color-white
        height: 40px
        padding: 0px 10px
        display: flex
        align-items: center
        justify-content space-between
        .right
          display: flex
          flex-direction: row
          align-items: flex-end
          .yuan
            font-family: $font-family-regular
            font-size: $font-size-small-s
            margin-bottom: 2px
            color: $color-text
        .left
          font-family: $font-family-light
          font-size: $font-size-medium
          color: $color-text
      .bot-title
        cut-off-rule-top(0, 0, $color-col-line)
        .right
          font-family: $font-family-regular
          font-size: $font-size-medium
          color: $color-text
      .bot-number
        cut-off-rule-top(0, 0, $color-col-line)
        .number-control
          display: flex
          height: 22px
          .desc
            width: 22px
            height: 22px
            text-align: center
            line-height: 22px
            border-1px($color-col-line, 2px)
            color: $color-button
          .number
            width: 48px
            height: 22px
            margin: 0 2.5px
            text-align: center
            line-height: 22px
            border-1px($color-col-line, 2px)
            color: $color-text
          .add
            width: 22px
            height: 22px
            text-align: center
            line-height: 22px
            border-radius: 2px
            border-1px($color-button, 2px)
            color: $color-white
            background-color: $color-button
      .bot-total
        cut-off-rule-top(0, 0, $color-col-line)
        .right
          font-family: $font-family-meddle
          font-size: $font-size-large
          color: $color-ktv-theme
          .yuan
            font-family: $font-family-regular
            font-size: $font-size-small-s
            margin-bottom: 2px
            color: $color-ktv-theme
      .bot-order
        height: 45px
        background: $color-main
        line-height: 45px
        text-align: center
        position: absolute
        width: 100%
        bottom: 0px
        color: $color-white
        font-family: $font-family-regular
        font-size: $font-size-medium
        letter-spacing: 0.56px

</style>
