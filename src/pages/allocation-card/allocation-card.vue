<template>
  <div class="card-box">
    <div class="box-top">
      <active-card :useType="1" @previewHandler="test" :cardInfo="info"></active-card>
    </div>
    <div class="merchant-box" @tap="showBox()">
      <div class="box-left">
        <img :src="merchant.logo_image" class="box-img">
        <div class="text">{{merchant.shop_name}}</div>
      </div>
      <div class="box-right">
        <div class="text">
          <text v-if="merchant.sale_count !== 0">{{merchant.sale_count}}/</text>
          {{merchant.stock}}
        </div>
        <img :src="image + '/defaults/ipc-shopping/aliance/icon-union_j@2x.png'" v-if="image" class="box-img">
      </div>
    </div>
    <div class="staff-box" v-for="(item, index) in staffList" v-bind:key="index">
      <div class="staff-list">
        <div class="box-left">
          <img :src="item.avatar_url" v-if="image" class="box-img">
          <div class="text">{{item.nickname}}</div>
        </div>
        <div class="box-right">
          <div class="text">
            <text v-if="item.sale_count !== 0">{{item.sale_count}}/</text>
            {{item.stock}}
          </div>
          <img :src="image + '/defaults/ipc-shopping/aliance/icon-union_j@2x.png'" v-if="image" class="box-img">
        </div>
      </div>
      <div class="show-model" @tap="showBox(item)"></div>
    </div>
    <div class="model-box" v-if="modelCon">
      <div class="model-con">
        <div class="model-top">
          <div class="top-title">{{upName}}</div>
          <div class="add-number">
            <div class="text">数量</div>
            <div class="calculate-box">
              <div class="subtract" @tap="subtract">-</div>
              <input type="number" class="number" v-model="upNumber">
              <div :class="['add',upNumber >= info.store ?  'add-noselet' : '']" @tap="add">+</div>
            </div>
          </div>
        </div>
        <div class="model-bg">
          <div v-if="upNumber > info.store">数量超过范围</div>
        </div>
        <div class="bottom-btn">
          <div class="btn" @tap="cancel">取消</div>
          <div class="btn" @tap="sumbit">保存</div>
        </div>
      </div>
    </div>
    <div class="page-bg"></div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import {baseURL} from 'api/config'
  import ActiveCard from 'components/active-card-item/active-card-item'
  import api from 'api'
  import * as wechat from 'common/js/wechat'
  import {mapGetters} from 'vuex'
  import {ROLE} from 'common/js/contants'
  import wx from 'wx'
  import Toast from '@/components/toast/toast'

  export default {
    data() {
      return {
        image: baseURL.image,
        modelCon: false,
        dataId: {
          activity_alliance_id: 1
        },
        upName: 'eleven',
        upId: 0,
        stockNumber: 3,
        upNumber: 0,
        preNumber: 0,
        staffList: [],
        merchant: {
          shop_name: 'eleven',
          logo_image: 'https://img.jerryf.cn/defaults/ipc-shopping/activitydata/timg.jpg',
          stock: 100,
          sale_count: 0
        },
        info: {
          title: 'eleven',
          endDate: '2018-10-10',
          store: 3
        }
      }
    },
    mounted() {
      this.dataId.activity_alliance_id = this.$root.$mp.query.id
      this.getAllocation()
      this.getAllotDetals()
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
        this._test()
        this.currentRole = ROLE.UNION_ID
        // wx.setStorageSync('merchantId', merchantId)
        wx.setStorageSync('userType', ROLE.UNION_ID)
        console.log(this.currentRole)
      },
      _test() {
        wx.setStorageSync('token', ROLE.testToken)
      },
      showRules() {
        this.showRule = !this.showRule
      },
      getAllocation() {
        api.merAllotList(this.dataId).then(res => {
          if (res.error === 0) {
            this.merchant = res.data.merchant
            this.staffList = res.data.employees
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
          console.log(res)
        })
      },
      getAllotDetals() {
        api.merManageDetails(this.dataId.activity_alliance_id).then(res => {
          if (res.error === 0) {
            console.log(res)
            this.info.title = res.data.name
            this.info.endDate = res.data.end_at
            this.info.store = res.data.stock
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      showBox(item) {
        // let number = item.stock - item.sale_count
        // this.upId = item.customer_id
        // this.upName = item.nickname
        // this.upNumber = number
        // this.preNumber = number
        this.modelCon = !this.modelCon
      },
      cancel() {
        this.modelCon = !this.modelCon
      },
      subtract() {
        if (parseInt(this.upNumber) <= 1) {
          return
        }
        this.upNumber--
      },
      add() {
        if (this.upNumber >= this.info.store) return
        this.upNumber++
      },
      sumbit() {
        if (this.upNumber > this.info.store) {
          this.$refs.toast.show('数量超过范围')
          return
        }
        let number = this.upNumber - this.preScene
        api.merAllotStock(this.dataId.activity_alliance_id, this.upId, number).then(res => {
          console.log(res)
          if (res.error === 0) {
            this.$refs.toast.show('分配成功')
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
          this.modelCon = !this.modelCon
        })
      }
    },
    components: {
      ActiveCard,
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

  .box-top
    padding: 10px 15px

  .merchant-box
    height: 54px
    background: $color-background-ff
    layout(row)
    justify-content: space-between
    align-items: center
    padding: 0 15px
    position: relative
    .box-left
      layout(row)
      align-items: center
      .box-img
        display: block
        width: 34px
        height: 34px
        border-radius: 50%
      .text
        margin-left: 10px
        font-family: $font-family-light
        font-size: $font-size-medium
        color: $color-text-2d
    .box-right
      font-family: $font-family-light
      font-size: $font-size-small
      color: $color-assist-34
      layout(row)
      align-items: center
      .input-text
        height: 20px
        width: 40px
      .box-img
        width: 12px
        height: 15px
        display: block

    .show-model
      position: absolute
      right: 0
      height: 100%
      top: 0
      width: 40%

  .staff-box
    margin-top: 10px
    padding-left: 15px
    background: $color-background-ff
    position: relative
    .staff-list
      layout(row)
      height: 54px
      background: $color-background-ff
      justify-content: space-between
      align-items: center
      padding-right: 15px
      cut-off-rule-bottom()
      &:last-child
        cut-off-rule-bottom(50%, 50%)
      .box-left
        layout(row)
        align-items: center
        .box-img
          display: block
          width: 34px
          height: 34px
          border-radius: 50%
        .text
          margin-left: 10px
          font-family: $font-family-light
          font-size: $font-size-medium
          color: $color-text-2d
      .box-right
        font-family: $font-family-light
        font-size: $font-size-small
        color: $color-assist-34
        layout(row)
        align-items: center
        .input-text
          height: 20px
          width: 40px
        .box-img
          width: 12px
          height: 15px
          display: block

    .show-model
      position: absolute
      right: 0
      height: 100%
      top: 0
      width: 40%

  .model-box
    position: fixed
    width: 100%
    height: 100%
    left: 0
    top: 0
    z-index: 2
    background: rgba(0, 0, 0, .7)
    .model-con
      position: absolute
      width: 100%
      left: 0
      bottom: 0
      .model-top
        background: $color-background-ff
        padding-left: 15px
        .top-title
          font-family: $font-family-light
          font-size: $font-size-medium
          color: #464646
          cut-off-rule-bottom()
          line-height: 45px
          height: 45px
        .add-number
          height: 45px
          border-radius: 3px
          padding-right: 15px
          background: $color-background-ff
          layout(row)
          justify-content: space-between
          align-items: center
          .text
            font-family: $font-family-light
            font-size: $font-size-medium
            color: $color-text-46
          .calculate-box
            layout(row)
            .subtract
              border: 0.5px solid #EDEDED
              width: 22px
              height: 22px
              color: $color-assist-34
              text-align: center
              line-height: 22px
              background: #FFFFFF
              border-radius: 1px
            .number
              width: 48px
              height: 22px
              min-height: 22px
              margin: 0 2.5px
              display: block
              text-align: center
              font-family: $font-family-light
              font-size: $font-size-medium
              color: $color-text-2d
              border: 0.5px solid #EDEDED
            .add
              border: 0.5px solid #3460EC
              width: 22px
              height: 22px
              color: $color-background-ff
              text-align: center
              line-height: 22px
              background: #3460EC
              border-radius: 1px
            .add-noselet
              background: #959DBD
              border: 0px
      .model-bg
        padding-right: 15px
        padding-top: 9.5px
        text-align: right
        height: 187px
        font-family: $font-family-light
        font-size: $font-size-small-s
        color: #F2633E
        background: #F6F7FA
      .bottom-btn
        layout(row)
        .btn
          flex: 1
          normal-button-default()
          border-radius: 0
          &:first-child
            normal-button-default(#273156)
</style>
