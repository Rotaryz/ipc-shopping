<template>
  <div class="data-box">
    <div class="merchant-title">
      <div class="merchant-title-tab" :class="bigBtn === 'merchant' ? 'active' : '' " @tap="clickTab('merchant')">商家总榜
      </div>
      <div class="merchant-title-tab" :class="bigBtn === 'staff' ? 'active' : '' " @tap="clickTab('staff')">员工总榜</div>
    </div>
    <div class="all-merchant" v-if="bigBtn === 'merchant'">
      <div class="all-top">
        <div class="data-title">
          <div class="text">门店</div>
          <div class="text">售卡数/总数</div>
          <div class="text">他店核销数</div>
          <div class="text">联盟力</div>
        </div>
        <div class="data-content">
          <scroll-view class="content-scroll" @scrolltolower="scrollAllShop" scroll-y="true">
            <div class="data-all" v-if="allShopList.length !== 0">
              <div class="self-merchant-list" v-for="(item, index) in allShopList" v-bind:key="index">
                <div class="selft-merchant-list-box">{{item.merchant_data.shop_name}}</div>
                <div class="selft-merchant-list-box">{{item.sale_count}}/{{item.init_stock}}</div>
                <div class="selft-merchant-list-box">{{item.other_verification}}</div>
                <div class="selft-merchant-list-box">{{item.alliance_power}}</div>
              </div>
            </div>
            <div class="data-null" v-if="allShopList.length === 0">暂无数据～</div>
          </scroll-view>
        </div>
      </div>
      <div class="data-pie">
        <div class="pie-title">
          <div class="icon">¥</div>
          <div class="money">{{allotMoney || 0}}</div>
          <div class="text">正在等待分钱</div>
        </div>
        <div class="ec-box">
          <div class="ec-null" v-if="!isOffline">正在等待分钱</div>
          <ec-canvas class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec" v-if="isOffline"></ec-canvas>
        </div>
      </div>
    </div>
    <div class="all-staff" v-if="bigBtn === 'staff'">
      <div class="all-staff-box">
        <div class="rank-list">
          <img v-if="image" :src="image + '/defaults/ipc-shopping/activitydata/bg-activity_lizi@2x.png'"
               class="rank-bg" mode="widthFix">
          <div class="rank-box rank-two">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_second@2x.png'" v-if="image"
                   class="hard-img-crown">
              <img v-if="allStaffList.length" :src="allStaffList[1].avatar_url"  class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_second2@2x.png'" v-if="image"
                   class="img">
              <div class="name"  v-if="allStaffList.length" >{{allStaffList[1].nickname}}</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">总收益</div>
              <div class="right-text"  v-if="allStaffList.length" >{{allStaffList[1].commission}}</div>
            </div>
          </div>
          <div class="rank-box rank-two rank-one">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_first@2x.png'" v-if="image"
                   class="hard-img-crown">
              <img  v-if="allStaffList.length" :src="allStaffList[0].avatar_url" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_first1@2x.png'" v-if="image"
                   class="img">
              <div class="name first-name"  v-if="allStaffList.length" >{{allStaffList[0].nickname}}</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">总收益</div>
              <div class="right-text"  v-if="allStaffList.length" >{{allStaffList[0].commission}}</div>
            </div>
          </div>
          <div class="rank-box rank-two">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_third@2x.png'" v-if="image"
                   class="hard-img-crown">
              <img  v-if="allStaffList.length" :src="allStaffList[2].avatar_url" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_third3@2x.png'" v-if="image"
                   class="img">
              <div class="name thr-name"  v-if="allStaffList.length" >{{allStaffList[2].nickname}}</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">总收益</div>
              <div class="right-text"  v-if="allStaffList.length" >{{allStaffList[2].commission}}</div>
            </div>
          </div>
        </div>
        <div class="data-content">
          <div class="self-merchant-list" v-for="(item, index) in allStaffTwoList" v-bind:key="index">
            <div class="self-staff-list-box user-box">
              <div class="number">{{index + 4}}</div>
              <img class="img" :src="item.avatar_url" v-if="item">
            </div>
            <div class="self-staff-list-box">{{item.nickname}}</div>
            <div class="self-staff-list-box">{{item.sale_count}}</div>
            <div class="self-staff-list-box money-box">
              <div class="icon">¥</div>
              <div class="money">{{item.commission}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-bg"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {baseURL, ERR_OK} from 'api/config'
  import * as wechat from 'common/js/wechat'
  import {mapGetters} from 'vuex'
  import api from 'api'
  import wx from 'wx'

  const options = {
    // color: ['#8941AF', '#A740AE', '#AE4077', '#B16544', '#B44343', '#5EAD83', '#40A1AE', '#4778C0', '#2843C3', '#57876E', '#128787', '#728AEC', '#1B6FBD', '#8941AF', '#A740AE', '#AE4077', '#B16544', '#B44343', '#5EAD83', '#40A1AE', '#4778C0', '#2843C3', '#57876E', '#128787', '#728AEC', '#1B6FBD'],
    color: ['#6D42E6', '#4778C0', '#47AFC0', '#40A1AE', '#8941AF', '#4644DF'],
    series: [{
      label: {
        normal: {
          fontSize: 10,
          color: '#959dbd'
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['25%', '60%'],
      data: [],
      itemStyle: {
        emphasis: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  }
  export default {
    data() {
      return {
        ec: {
          // 传 options
          options: options
        },
        image: baseURL.image,
        bigBtn: 'merchant',
        activeId: 1,
        allotMoney: null,
        allShopList: [], // 商店总榜数据参数
        allfShopPage: 1,
        isAllShop: false,
        fristAllShop: false,
        isOffline: false,
        allStaffList: [
          {
            avatar_url: null,
            sale_count: null,
            nickname: null
          },
          {
            avatar_url: null,
            sale_count: null,
            nickname: null
          },
          {
            avatar_url: null,
            sale_count: null,
            nickname: null
          }
        ], // 商店总榜总榜数据参数
        allStaffTwoList: [],
        fristAllStaff: false
      }
    },
    onPullDownRefresh() {
      if (this.staffScene === 2) {
        this.selfStaffPage = 1
        this.selfStaffList = []
        this.isAllselfStaff = false
        this._getSelfStaff()
        this._getBar()
      } else {
        this.allStaffList = []
        this.allStaffTwoList = []
        this._getAllfStaff()
      }
      wx.stopPullDownRefresh()
    },
    mounted() {
      this._dataInit()
      this.activeId = this.$root.$mp.query.id
      this._getAllfShop()
      this._getCake()
    },
    methods: {
      ...mapGetters(['role']),
      _init() {
        let role = this.role()
        this.currentRole = role
      },
      _dataInit() {
        this.bigBtn = 'merchant'
        this.selfStaffPage = 1
        this.selfStaffList = []
        this.isAllselfStaff = false
        this.fristAllStaff = false
      },
      clickTab(value) {
        this.bigBtn = value
        if (this.bigBtn === 'staff') {
          this.staffScene = 3
          if (this.fristAllStaff) return
          this._getAllfStaff()
          this.fristAllStaff = true
        } else {
          this.staffScene = 2
        }
      },
      // 商家总榜数据
      _getAllfShop() {
        api.dataAllShop(this.activeId, this.allfShopPage).then(res => {
          if (res.error === ERR_OK) {
            this.allShopList.push(...res.data)
            this._isAllALLShop(res)
            this.allfShopPage++
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      },
      scrollAllShop() {
        if (this.isAllShop) return
        this._getAllfShop()
      },
      _isAllALLShop(res) {
        if (this.allShopList.length >= res.meta.total * 1) {
          this.isAllShop = true
        }
      },
      _getCake() {
        api.dataCake(this.activeId).then(res => {
          if (res.error === ERR_OK) {
            this.ec.options.series.data = res.data.detail
            this.isOffline = res.data.is_offline
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      },
      _getAllotMoney() {
        api.dataAllotMoney(this.activeId).then(res => {
          if (res.error === ERR_OK) {
            this.allotMoney = res.data.share_money
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      },
      // 商家员工总榜数据
      _getAllfStaff() {
        api.dataAllStaff(this.activeId, this.allfStaffPage).then(res => {
          if (res.error === ERR_OK) {
            this.allStaffList = res.data.slice(0, 3)
            this.allStaffTwoList = res.data.slice(3)
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .data-box
    padding-top: 25.5px
    padding-bottom: 30px

  .page-bg
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    background: #1A1D3D

  .merchant-title
    layout(row)
    justify-content: center
    margin-bottom: 12px
    .merchant-title-tab
      no-wrap()
      width: 150px
      text-align: center
      font-family: $font-family-light
      font-size: $font-size-medium
      color: $color-text-95
      padding-bottom: 10px
      position: relative
    .active
      color: $color-background-ff
      cut-off-rule-bottom(60px, 60px, $color-assist-34, 2px)

  .all-staff /* 员工总榜 */
    padding: 0 12px
    .all-staff-box
      background: $color-assist-27
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
      border-radius: 3px
      padding-bottom: 24.5px
      position: relative
      .rank-list
        layout(row)
        padding: 0 20px
        cut-off-rule-bottom(0, 0, rgba(255, 255, 255, 0.16), 0.5px)
        height: 172px
        .rank-box
          flex: 1
          layout()
        .rank-two
          padding-top: 66px
          .rank-two-hard
            position: relative
            .hard-img-crown
              position: absolute
              top: -14px
              left: 0
              right: 0
              margin: 0 auto
              width: 25px
              height: 16px
              z-index: 0
            .hard-img
              position: relative
              z-index: 1
              width: 39px
              height: 39px
              display: block
              margin: 0 auto
              border-radius: 50%
              border: 2px solid $color-assist-27
          .rank-two-text
            layout(row)
            align-items: center
            justify-content: center
            margin: 5px 0
            .img
              width: 12px
              height: 12px
              display: block
              margin-right: 2px
            .name
              font-family: $font-family-light
              font-size: $font-size-small
              color: $color-assist-7c
            .thr-name
              color: #C9826B
            .first-name
              color: #FFD708
          .rank-two-bottom
            layout(row)
            align-items: center
            justify-content: center
            .left-text
              font-family: $font-family-light
              font-size: $font-size-small-s
              color: $color-text-95
              margin-right: 5px
            .right-text
              font-family: DINAlternate-Bold
              font-size: $font-size-medium-x
              color: $color-background-ff
        .rank-one
          padding-top: 45.5px
          .rank-two-hard
            .hard-img-crown
              width: 40px
              height: 25.5px
              top: -21.5px
            .hard-img
              width: 55px
              height: 55px
        .rank-bg
          width: 80%
          left: 0
          right: 0
          top: 40px
          z-index: 0
          margin: auto
          position: absolute
      .data-content
        padding-left: 15px
        .self-merchant-list
          layout(row)
          font-family: DINAlternate-Bold
          font-size: $font-size-medium
          color: $color-text-95
          height: 40px
          line-height: 40px
          cut-off-rule-bottom(0, 0, rgba(255, 255, 255, 0.16), 0.5px)
          .self-staff-list-box
            flex: 1
            &:nth-of-type(2)
              font-size: $font-size-small
              no-wrap()
            &:last-child
              text-align: right
              position: relative
              right: 30px
          .user-box
            align-items: center
            justify-content: space-between
            layout(row)
            .number
              font-family: DINAlternate-Bold
              font-size: $font-size-medium-x
              color: #959DBD
              position: relative
              left: 5px
            .img
              position: relative
              right: 15px
              width: 24px
              height: 24px
              border-radius: 50%
              display: block
              border: 0.5px solid $color-cut-line-ff16
          .money-box
            align-items: flex-end
            justify-content: flex-end
            layout(row)
            .money
              font-family: DINAlternate-Bold
              color: $color-background-ff
              font-size: $font-size-medium
            .icon
              font-family: $font-family-light
              color: $color-background-ff
              font-size: 9px

  .all-merchant /* 店铺总榜 */
    padding: 0 12px
    .all-top
      background: $color-assist-27
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
      border-radius: 3px
      height: 219px
      .data-title
        layout(row)
        padding-left: 15px
        font-size: $font-size-small
        background: #333F6C
        height: 40px
        line-height: 40px
        color: $color-background-ff
        border-top-left-radius: 3px
        border-top-right-radius: 3px
        .text
          flex: 1
          &:last-child
            text-align: right
            position: relative
            right: 30px
      .data-content
        padding-left: 15px
        .content-scroll
          height: 164.5px
          .self-merchant-list
            layout(row)
            font-family: DINAlternate-Bold
            font-size: $font-size-medium
            color: $color-text-95
            height: 40px
            line-height: 40px
            cut-off-rule-bottom(0, 0, rgba(255, 255, 255, 0.16), 0.5px)
            .selft-merchant-list-box
              flex: 1
              &:first-child
                no-wrap()
              &:last-child
                text-align: right
                position: relative
                right: 30px
    .data-pie
      background: $color-assist-27
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
      border-radius: 3px
      height: 247.5px
      margin-top: 10px
      .pie-title
        layout(row)
        background: #333F6C
        border-top-left-radius: 3px
        border-top-right-radius: 3px
        padding-left: 15px
        color: $color-background-ff
        height: 40px
        line-height: 40px
        font-family: $font-family-light
        font-size: $font-size-medium
        .icon
          font-size: $font-size-small
        .money
          font-size: $font-size-medium-x
          font-family: DINAlternate-Bold

  .ec-box
    height: 207.5px
    .ec-null
      line-height: 207.5px
      text-align: center
      font-family: $font-family-light
      font-size: $font-size-small
      color: #959DBD
    ec-canvas
      width: 400px
      height: 179px

  .data-null
    text-align: center
    font-family: $font-family-light
    font-size: $font-size-small
    color: #959DBD
    line-height: 128.5px
</style>
