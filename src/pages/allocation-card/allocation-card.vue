<template>
  <div class="card-box">
    <div class="box-top">
      <active-card :useType="1" @previewHandler="jumpPreview" :cardInfo="info"></active-card>
    </div>
    <div class="merchant-box" v-for="(item, index) in merchantList" v-bind:key="index">
      <div class="box-left">
        <img :src="item.logo_image" class="box-img">
        <div class="text">{{item.shop_name}}</div>
      </div>
      <div class="box-right">
        <div class="text" v-if="item.stock > 0">
          <text v-if="item.sale_count !== 0">{{item.sale_count}}/</text>
          {{item.stock}}
        </div>
        <img :src="image + '/defaults/ipc-shopping/aliance/icon-union_j@2x.png'" v-if="image" class="box-img">
        <div class="show-model" @tap="showBox(item, 'shop')"></div>
      </div>
    </div>
    <div class="staff-box" v-for="(item, index) in staffList" v-bind:key="index">
      <div class="staff-list">
        <div class="box-left">
          <img :src="item.avatar_url" v-if="image" class="box-img">
          <div class="text">{{item.nickname}}</div>
        </div>
        <div class="box-right">
          <div class="text" v-if="item.stock > 0">
            <text v-if="item.sale_count !== 0">{{item.sale_count}}/</text>
            {{item.stock}}
          </div>
          <img :src="image + '/defaults/ipc-shopping/aliance/icon-union_j@2x.png'" v-if="image" class="box-img">
        </div>
      </div>
      <div class="show-model" @tap="showBox(item, 'customer')"></div>
    </div>
    <div class="model-box" v-if="modelCon">
      <div class="model-bgbtn" @tap="cancel"></div>
      <div class="model-con">
        <div class="model-top">
          <div class="top-title">{{upName}}</div>
          <div class="add-number top-line">
            <div class="text">已锁定数/已销售数/总数</div>
            <div class="text">{{blockStore}}/{{sellStore}}/{{allStore}}</div>
          </div>
          <div class="add-number">
            <div class="text">数量</div>
            <div class="calculate-box">
              <div class="subtract" @tap="subtract">-</div>
              <input type="number" class="number" v-model="upNumber">
              <div :class="['add',upNumber * 1 + blockStore >= bigStore ?  'add-noselet' : '']" @tap="add">+</div>
            </div>
          </div>
        </div>
        <div class="model-bg">
          <div v-if="upNumber * 1 + blockStore > bigStore">数量超过范围</div>
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
  import { baseURL, ERR_OK } from 'api/config'
  import ActiveCard from 'components/active-card-item/active-card-item'
  import api from 'api'
  import * as wechat from 'common/js/wechat'
  import { mapGetters } from 'vuex'
  import Toast from '@/components/toast/toast'

  export default {
    data () {
      return {
        image: baseURL.image,
        modelCon: false,
        dataId: {
          activity_alliance_id: 1
        },
        upName: 'eleven',
        upCustomerId: 0,
        upShopId: 0,
        stockNumber: 3,
        upNumber: 0,
        preNumber: 0,
        sumbitType: 'shop',
        staffList: [],
        merchantList: [],
        merchant: {
          shop_name: 'eleven',
          logo_image: 'https://img.jerryf.cn/defaults/ipc-shopping/activitydata/timg.jpg',
          stock: 100,
          sale_count: 0
        },
        info: {
          title: 'eleven',
          endDate: '2018-10-10',
          store: ''
        },
        store: 0,
        blockStore: 0,
        sellStore: 0,
        allStore: 0,
        bigStore: 0
      }
    },
    mounted () {
      this.staffList = []
      this.merchantList = []
      this.dataId.activity_alliance_id = this.$root.$mp.query.id
      if (!this.dataId.activity_alliance_id) {
        this.dataId.activity_alliance_id = 1
      }
      this.getAllotDetals()
    },
    beforeMount () {
      this._init()
    },
    methods: {
      ...mapGetters(['role']),
      _init () {
        let role = this.role()
        this.currentRole = role
      },
      showRules () {
        this.showRule = !this.showRule
      },
      getAllotDetals () {
        api.merAllotDetail(this.dataId.activity_alliance_id).then(res => {
          if (res.error === ERR_OK) {
            this.info.title = res.data.activity_alliance.name
            this.info.id = res.data.activity_alliance_id
            this.info.endDate = res.data.activity_alliance.end_at
            this.info.store = res.data.alliance_merchant_report.allot_stock
            this.store = res.data.alliance_merchant_report.allot_stock
            this.getAllocation()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getAllocation () {
        // this.store = this.info.store
        api.merAllotList(this.dataId).then(res => {
          if (res.error === ERR_OK) {
            this.merchantList = res.data.merchant
            // for (var i = 0; i < res.data.merchant.length; i++) {
            //   this.info.store = this.info.store - res.data.merchant[i].stock
            // }
            this.staffList = res.data.employees
            // for (var s = 0; s < res.data.employees.length; s++) {
            //   this.info.store = this.info.store - res.data.employees[s].stock
            // }
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      },
      showBox (item, index) {
        this.sumbitType = index
        let number
        if (this.sumbitType === 'shop') {
          number = item.stock - item.sale_count
          this.upShopId = item.id
          this.upName = item.shop_name
          this.blockStore = item.blocked_stock
          this.sellStore = item.sale_count
          this.allStore = item.stock
        } else {
          number = item.stock - item.sale_count
          this.upCustomerId = item.customer_id
          this.upName = item.nickname
          this.blockStore = item.blocked_stock
          this.sellStore = item.sale_count
          this.allStore = item.stock
        }
        this.bigStore = number + this.info.store
        this.upNumber = number - this.blockStore
        this.preNumber = number
        this.modelCon = !this.modelCon
      },
      cancel () {
        this.modelCon = !this.modelCon
      },
      subtract () {
        if (parseInt(this.upNumber) <= 0) {
          return
        }
        this.upNumber--
      },
      add () {
        if (this.upNumber * 1 + this.blockStore >= this.bigStore) return
        this.upNumber++
      },
      // 提交分配
      sumbit () {
        if (this.upNumber * 1 + this.blockStore > this.bigStore) {
          this.$refs.toast.show('数量超过范围')
          return
        }
        if (this.upNumber * 1 + this.blockStore * 1 === this.preNumber * 1) {
          this.$refs.toast.show('请先修改分配')
          return
        }
        let number = this.upNumber * 1 - this.preNumber + this.blockStore
        // 判断是商家分配还是员工分配
        if (this.sumbitType === 'shop') {
          this.upCustomerId = 0
        } else {
          this.upShopId = 0
        }
        api.merAllotStock(this.dataId.activity_alliance_id, this.upCustomerId, number, this.upShopId).then(res => {
          if (res.error === ERR_OK) {
            this.$refs.toast.show('分配成功')
            this.getAllotDetals()
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
          this.modelCon = !this.modelCon
        })
      },
      jumpPreview (cardInfo) {
        const url = `/pages/activity-detail/activity-detail?activityId=${cardInfo.id}`
        this.$router.push(url)
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
    .model-bgbtn
      position: absolute
      width: 100%
      height: 100%
      left: 0
      bottom: 0
      z-index: 3
      background: rgba(0, 0, 0, .7)
      opacity: 0.7
    .model-con
      position: absolute
      width: 100%
      left: 0
      bottom: 0
      z-index: 4
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
        .top-line
          cut-off-rule-bottom()
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
