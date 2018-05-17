<template>
  <div class="coupon-box">
    <div class="coupon-con">
      <div class="title" v-if="couponList.length !== 0">可报名服务</div>
      <div class="list-data" v-if="couponList.length !== 0">
        <div class="box-list" v-for="(iteam, index) in couponList" v-bind:key="index">
          <coupon  :useType="1" :couponInfo="iteam"></coupon>
        </div>
      </div>
      <div class="list-null" v-if="couponList.length === 0">
        <img :src="image + '/defaults/ipc-shopping/home/pic-union_empty@2x.png'" class="null-img" v-if="image" mode="widthFix">
        <div class="text">暂无活动</div>
      </div>
    </div>
    <footer class="btn">保存</footer>
    <div class="page-bg"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'
  import Coupon from 'components/coupon-item/coupon-item'
  import * as wechat from 'common/js/wechat'
  import {mapGetters} from 'vuex'
  import {ROLE} from 'common/js/contants'
  import wx from 'wx'
  import api from 'api'

  export default {
    data() {
      return {
        image: baseURL.image,
        couponList: []
      }
    },
    mounted() {
      console.log(this.$root.$mp.query.id)
      this._rqManageDetails()
    },
    beforeMount() {
      this._init()
    },
    methods: {
      ...mapGetters(['role']),
      _init() {
        // let role = this.role()
        // this.currentRole = role
        // this.currentRole = role
        // 伪代码
        this.currentRole = ROLE.UNION_ID
        // wx.setStorageSync('merchantId', merchantId)
        wx.setStorageSync('userType', ROLE.UNION_ID)
        console.log(this.currentRole)
      },
      _rqManageDetails() {
        api.merCouponList().then(res => {
          console.log(res.data)
          this.couponList = res.data
          wechat.hideLoading()
        })
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
  .coupon-con
    padding: 0 15px
    box-sizing: border-box
    padding-bottom: 60px
    .title
      height: 50px
      line-height: 50px
      font-family: $font-family-regular
      font-size: $font-size-medium-x
      color: $color-text-2d
    .coupon-list
      width: 100%
      margin-bottom: 10px
  .btn
    position: fixed
    bottom: 0
    left: 0
    right: 0
    normal-button-default()
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
  .box-list
    margin-bottom: 10px
</style>
