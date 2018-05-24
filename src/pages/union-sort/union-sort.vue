<template>
  <div class="union-sort">
    <article class="empty" v-if="isEmpty">
      <div class="empty-pic" :style="emptyImg"/>
      <div class="empty-txt">暂无活动</div>
    </article>
    <ul class="content" v-if="!isEmpty">
      <li :class="['c-item',isShowSave?'show-sort':'']" v-for="(item,index) in couponList" :key="index">
        <coupon
          :useModel="0"
          :useType="couponUseType"
          :couponInfo="item"
          @sortDownHandler="sortDownHandler"
          @sortUpHandler="sortUpHandler"
          @lookOverHandler="lookOverHandler"
        ></coupon>
      </li>
    </ul>
    <footer class="btn" @tap="toSortBtn" v-if="!isShowSave && !isEmpty">排序</footer>
    <footer class="btn-group" v-if="isShowSave && !isEmpty">
      <div class="btn-cancel" @tap="checkModelBtn(0)">取消</div>
      <div class="btn-save" @tap="checkModelBtn(1)">保存</div>
    </footer>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import Coupon from 'components/coupon-item/coupon-item'
  import util from 'common/js/util'
  import api from 'api'
  import * as wechat from 'common/js/wechat'
  import { ERR_OK, baseURL } from 'api/config'
  import wx from 'wx'
  import source from 'common/source'
  import Toast from '@/components/toast/toast'

  const LIMIT_DEF = 20
  // console.log(JSON.stringify(arr))
  export default {
    data () {
      return {
        currentActiveId: null,
        couponList: [],
        oldCouponList: null,
        isShowSave: false, // 是否显示保存按钮
        isAll: false,
        page: 1,
        limit: LIMIT_DEF
      }
    },
    onShow () {
      this._init()
    },
    onPullDownRefresh () {
      if (this.isShowSave) {
        wx.stopPullDownRefresh()
        return
      }
      this._resetConfig()
      let data = this._formatReq()
      data.paga = 1
      data.limit = Math.max(this.couponList.length, LIMIT_DEF)
      this._rqGetCheckList(data, false)
        .then(json => {
          let list = this._formatResData(json)
          this.couponList = list
          this._adjustList()
          this._isAll(json)
          wx.stopPullDownRefresh()
        })
    },
    methods: {
      _init () {
        this.currentActiveId = this.$root.$mp.query.activeId
        this._resetConfig()
        let data = this._formatReq()
        this._rqGetCheckList(data)
          .then(json => {
            let list = this._formatResData(json)
            console.log(list, '------处理')
            console.log(json, '++++++++++处理2')
            this.couponList = list
            this._adjustList()
            this._isAll(json)
          })
      },
      _adjustList () {
        if (this.couponList.length > 0) {
          this.couponList[0].sortType = 11
        }
      },
      // 获取审查列表优惠券
      _rqGetCheckList (data, loading) {
        return new Promise(resolve => {
          api.umgGetCheckList(data, loading)
            .then(json => {
              wechat.hideLoading()
              if (json.error !== ERR_OK) {
                return ''
              }
              console.log(json, '++++++====++++获取优惠券')
              resolve(json)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      _isAll (json) {
        let total = json.meta.total
        this.isAll = (this.couponList.length >= total)
        return this.isAll
      },
      _resetConfig () {
        this.isAll = false
        this.page = 1
        this.limit = LIMIT_DEF
      },
      _formatReq () {
        let data = {
          // 'check_status': 1,
          // 'has_promotion': 1,
          id: this.currentActiveId,
          limit: this.limit,
          page: this.page
        }
        return data
      },
      // 格式化请求列表
      _formatResData (json) {
        let arr = []
        let res = json.data
        console.log(res, '处理前')
        res.map(item => {
          if (item.goods_detail.id) {
            arr.push({
              id: item.goods_detail.id,
              type: item.goods_type * 1 === 0 ? '代金券' : '套餐券',
              name: item.goods_detail.title,
              shopName: item.shop_name,
              scope: `限${item.shop_name}使用`,
              useLife: `有效期:${item.goods_detai.start_at}至${item.goods_detai.end_at}`,
              image_url: item.goods_detail.image_url,
              sortType: 10,
              appId: res.goods_detai.app_id,
              appPath: res.goods_detai.path,
              merchantId: res.merchant_id
            })
          }
        })
        return arr
      },
      _rqSortList (data, loading) {
        let self = this
        return new Promise(resolve => {
          api.umgSortList(data, loading)
            .then(json => {
              wechat.hideLoading()
              if (json.error !== ERR_OK) {
                self.$refs.toast.show(json.message)
                return false
              }
              resolve(json)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      _packData () {
        let arr = []
        this.couponList.map(item => {
          arr.push({id: item.id})
        })
        return {alliance_goods_array: arr}
      },
      // 跳C端预览
      _toMpC (json) {
        wx.navigateToMiniProgram({
          appId: json.appId,
          path: json.path,
          extraData: {},
          envVersion: baseURL.jumpVersion,
          success (res) {
            // 打开成功
            console.log(res)
          }
        })
      },
      getMoreList () {
        if (this.isShowSave) return
        if (this.isAll) return
        let data = this._formatReq()
        data.page++
        this._rqGetCheckList(data)
          .then(json => {
            let list = this._formatResData(json)
            this.couponList.push(...list)
            this._adjustList()
            this._isAll(json)
          })
      },
      lookOverHandler (obj) {
        const id = obj.id
        const appId = obj.appId
        const merchantId = obj.merchantId
        const path = `${obj.appPath}?type=1&id=${id}&currentMerchant=${merchantId}`
        this._toMpC({appId, path})
      },
      toSortBtn () {
        this.isShowSave = true
        this.oldCouponList = util.objDeepCopy(this.couponList)
      },
      checkModelBtn (type) {
        switch (type) {
          case 0: { // 取消
            this.couponList = this.oldCouponList
            this.isShowSave = false
            break
          }
          case 1: {
            let data = this._packData()
            this._rqSortList(data)
              .then(() => {
                this.isShowSave = false
              })
            break
          }
        }
      },
      sortUpHandler (obj) {
        if (this.couponList.length < 1) return
        let index = this.couponList.findIndex(val => val.id === obj.id)
        if (index === 0) return
        let toUp = this.couponList[index]
        let toDown = this.couponList[index - 1]
        if (index === 1) {
          toUp.sortType = 11
          toDown.sortType = 10
        }
        this.couponList.splice(index - 1, 2, toUp, toDown)
      },
      sortDownHandler () {
        if (this.couponList.length < 1) return
        let toUp = this.couponList[1]
        let toDown = this.couponList[0]
        toUp.sortType = 11
        toDown.sortType = 10
        this.couponList.splice(0, 2, toUp, toDown)
      }
    },
    computed: {
      couponUseType () {
        return this.isShowSave ? 1 : 0
      },
      emptyImg () {
        return source.imgEmptyActive()
      },
      isEmpty () {
        return this.couponList.length <= 0
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

  .empty
    box-sizing: border-box
    height: 100%
    padding-top: 34.9%
    layout()
    align-items: center
    &.display-none
      display: none
    .empty-pic
      width: 86px
      height: 75.5px
      background-size: 100%
    .empty-txt
      padding-top: 10.5px
      text-align: center
      font-family: $font-family-light
      font-size: $font-size-small
      color: $color-assist-27

  .union-sort
    min-height: 100vh
    background-color: $color-background-f6
    .content
      padding-bottom: 45px
      .c-item
        padding: 10px 15px 0 15px
        &:last-child
          padding-bottom: 20px
        &.show-sort
          padding-right: 0
    .btn
      normal-button-default()
      position: fixed
      left: 0
      right: 0
      bottom: 0
      border-radius: 3px 3px 0 0
    .btn-group
      position: fixed
      left: 0
      right: 0
      bottom: 0
      layout(row, block, no-wrap)
      .btn-cancel
        flex: 1
        normal-button-default($color-assist-27)
        border-radius: 3px 0 0 0
      .btn-save
        flex: 1
        normal-button-default()
        border-radius: 0 3px 0 0
</style>
