<template>
  <div class="union-sort">
    <ul class="content">
      <li :class="['c-item',isShowSave?'show-sort':'']" v-for="(item,index) in couponList" :key="index">
        <coupon
          :useModel="0"
          :useType="couponUseType"
          :couponInfo="item"
          @sortDownHandler="sortDownHandler"
          @sortUpHandler="sortUpHandler"
        ></coupon>
      </li>
    </ul>
    <footer class="btn" @tap="toSortBtn" v-if="!isShowSave">排序</footer>
    <footer class="btn-group" v-if="isShowSave">
      <div class="btn-cancel" @tap="checkModelBtn(0)">取消</div>
      <div class="btn-save" @tap="checkModelBtn(1)">保存</div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Coupon from 'components/coupon-item/coupon-item'
  import util from 'common/js/util'
  import api from 'api'
  import * as wechat from 'common/js/wechat'
  import { ERR_OK } from 'api/config'
  import wx from 'wx'

  const obj1 = {
    id: 100,
    type: '代金券',
    name: '100元代金券',
    scope: '限国颐堂(天河店)使用',
    useLife: '有效期:2018-01-01至2018-08-01',
    sortType: 10
  }
  const obj2 = {
    id: 11,
    type: '代金券2',
    name: '100元代金券',
    scope: '限国颐堂(天河店)使用',
    useLife: '有效期:2018-01-01至2018-08-01',
    sortType: 10
  }
  const obj3 = {
    id: 22,
    type: '代金券3',
    name: '100元代金券',
    scope: '限国颐堂(天河店)使用',
    useLife: '有效期:2018-01-01至2018-08-01',
    sortType: 10
  }
  const arr = [obj1, obj2, obj3]
  arr[0].sortType = 11

  const LIMIT_DEF = 20

  export default {
    data () {
      return {
        currentActiveId: null,
        couponList: arr,
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
      data.limit = Math.max(this.checkInfoList.length, LIMIT_DEF)
      this._rqGetCheckList(data, false)
        .then(json => {
          let list = this._formatResData(json)
          this.checkInfoList = list
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
            this.couponList = list
            this._isAll(json)
          })
      },
      _rqGetCheckList (data, loading) {
        return new Promise(resolve => {
          api.uckGetCheckList(data, loading)
            .then(json => {
              wechat.hideLoading()
              if (json.error !== ERR_OK) {
                return ''
              }
              console.log(json)
              debugger
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
          'check_status': 1,
          'has_promotion': 1,
          'activity_alliance_id': this.currentActiveId,
          limit: this.limit,
          page: this.page
        }
        return data
      },
      // id: 11,
      // type: '代金券2',
      // name: '100元代金券',
      // scope: '限国颐堂(天河店)使用',
      // useLife: '有效期:2018-01-01至2018-08-01',
      // sortType: 10
      // 格式化请求列表
      _formatResData (json) {
        let arr = []
        let res = json.data
        res.map(item => {
          arr.push({
            id: item.id,
            shopImg: item.merchant_data.logo_image,
            name: item.merchant_data.shop_name,
            location: item.merchant_data.address,
            sales: item.count,
            money: item.total,
            statusCode: this.tabFlag
          })
        })
        console.log(arr)
        return arr
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
            this._isAll(json)
          })
      },
      toSortBtn () {
        this.isShowSave = true
        this.oldCouponList = util.objDeepCopy(this.couponList)
      },
      checkModelBtn (type) {
        switch (type) {
          case 0: { // 取消
            this.couponList = this.oldCouponList
            break
          }
          case 1: {
            console.log(2)
          }
        }
        this.isShowSave = false
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
