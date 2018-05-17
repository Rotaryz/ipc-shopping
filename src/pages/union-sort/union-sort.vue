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
    <footer class="btn" @tap="toSort" v-if="!isShowSave">排序</footer>
    <footer class="btn-group" v-if="isShowSave">
      <div class="btn-cancel" @tap="checkModel(0)">取消</div>
      <div class="btn-save" @tap="checkModel(1)">保存</div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Coupon from 'components/coupon-item/coupon-item'
  import util from 'common/js/util'
  // import api from 'api'
  // import * as wechat from 'common/js/wechat'
  // import {ERR_OK} from 'api/config'

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

  export default {
    data() {
      return {
        currentActiveId: null,
        couponList: arr,
        oldCouponList: null,
        isShowSave: false // 是否显示保存按钮
      }
    },
    methods: {
      _init() {
        this.currentActiveId = this.$root.$mp.query.activeId
      },
      toSort() {
        this.isShowSave = true
        this.oldCouponList = util.objDeepCopy(this.couponList)
      },
      checkModel(type) {
        this.isShowSave = !this.isShowSave
        switch (type) {
          case 0: {
            this.couponList = this.oldCouponList
            break
          }
        }
      },
      sortUpHandler(obj) {
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
      sortDownHandler(obj) {
        if (this.couponList.length < 1) return
        let toUp = this.couponList[1]
        let toDown = this.couponList[0]
        toUp.sortType = 11
        toDown.sortType = 10
        this.couponList.splice(0, 2, toUp, toDown)
      }
    },
    computed: {
      couponUseType() {
        console.log(this.isShowSave ? 1 : 0, '=========')
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
