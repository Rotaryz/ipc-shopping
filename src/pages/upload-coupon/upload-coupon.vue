<template>
  <form class="coupon-box" @submit="formSubmit" report-submit='true'>
    <div class="coupon-con">
      <div class="title" v-if="couponList.length !== 0">可报名服务</div>
      <div class="list-data" v-if="couponList.length !== 0">
        <div class="box-list" v-for="(item, index) in couponList" v-bind:key="index">
          <coupon :useModel="1" :useType="1" :couponInfo.sync="item" :isCheck="item.isCheck"
                  @checkHandler="clickSelect"></coupon>
        </div>
      </div>
      <div class="list-null" v-if="couponList.length === 0">
        <img :src="image + '/defaults/ipc-shopping/home/pic-union_empty@2x.png'" class="null-img" v-if="image"
             mode="widthFix">
        <div class="text">暂无活动</div>
      </div>
    </div>
    <button :class="['btn',selectId !== 0? '' : 'no-select']" @tap='upCoupon' form-type="submit">保存</button>
    <div class="page-bg"></div>
    <toast ref="toast"></toast>
  </form>
</template>

<script type="text/ecmascript-6">
  import {baseURL, ERR_OK} from 'api/config'
  import Coupon from 'components/coupon-item/coupon-item'
  import * as wechat from 'common/js/wechat'
  import {mapGetters} from 'vuex'
  import {ROLE} from 'common/js/contants'
  import wx from 'wx'
  import api from 'api'
  import Toast from '@/components/toast/toast'

  const LIMIT_DEF = 10
  export default {
    data() {
      return {
        image: baseURL.image,
        couponList: [],
        preIdx: -1,
        selectId: null,
        activityId: null,
        objId: {
          id: null
        },
        couponData: {
          page: 1,
          limit: LIMIT_DEF
        },
        isAll: false
      }
    },
    onPullDownRefresh() {
      this.couponData.page = 1
      this.couponList = []
      this.isAll = false
      this._rqManageDetails()
      wx.stopPullDownRefresh()
    },
    mounted() {
      this.selectId = this.$root.$mp.query.selectId
      if (!this.selectId) {
        this.selectId = 0
      }
      this.objId.id = this.selectId
      console.log(this.objId)
      console.log(this.$root.$mp.query.selectId, '---------')
      this.activityId = this.$root.$mp.query.activityId
      console.log(this.$root.$mp.query.activityId, '---------')
      this._rqManageDetails()
    },
    onReachBottom() {
      if (this.isAll) return
      this._rqManageDetails()
    },
    beforeMount() {
      this._init()
    },
    methods: {
      ...mapGetters(['role']),
      _init() {
        let role = this.role()
        this.currentRole = role
      },
      formSubmit (e) {
        let formId = e.mp.detail.formId
        let data = {'form_ids': [formId]}
        api.homeCollectFormId(data)
      },
      _rqManageDetails() {
        api.merCouponList(this.couponData).then(res => {
          console.log(res.data)
          this.couponList.push(...res.data)
          this.clickSelect(this.objId)
          this._isAllActive(res)
          this.couponData.page++
          wechat.hideLoading()
        })
      },
      clickSelect(obj) {
        console.log(obj.id, '-------')
        let index = this.couponList.findIndex(val => val.id === obj.id)
        if (this.preIdx === index) return
        if (this.preIdx > -1) {
          this.couponList[this.preIdx].isCheck = false
        }
        this.couponList[index].isCheck = true
        this.preIdx = index
        this.selectId = obj.id
      },
      _isAllActive(res) {
        if (this.couponList.length >= res.meta.total * 1) {
          this.isAll = true
        }
      },
      upCoupon() {
        if (!this.selectId) return
        let data = {}
        data.promotion_id = this.selectId
        data.apply_id = this.activityId
        api.merAddCoupon(data).then(res => {
          if (res.error === ERR_OK) {
            this.$router.back(1)
          } else {
            this.$refs.toast.show(res.message)
          }
          console.log(res.data)
          wechat.hideLoading()
        })
      }
    },
    components: {
      Coupon,
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

  .no-select
    normal-button-default(#959DBD)

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
