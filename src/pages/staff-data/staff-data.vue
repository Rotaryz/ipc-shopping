<template>
  <div class="data-box">
    <div class="merchant-title">
      <div class="merchant-title-tab" :class="staffBtn === 'self' ? 'active' : '' " @tap="clickStaffTab('self')">{{shopName}}</div>
      <div class="merchant-title-tab" :class="staffBtn === 'all' ? 'active' : '' " @tap="clickStaffTab('all')">总榜</div>
      <div class="line-wrapper" :style="'transform:translate3d('+ 100*tabFlag + '%, 0, 0)'">
        <div class="line"></div>
      </div>
    </div>
    <div class="self-staff" v-if="staffBtn === 'self'">
      <div class="all-top">
        <div class="data-title">
          <div class="text">排名</div>
          <div class="text">名称</div>
          <div class="text">数量</div>
          <div class="text">总收益(元)</div>
        </div>
        <div class="data-content">
          <scroll-view class="content-scroll" @scrolltolower="scrollSelfStaff" scroll-y="true">
            <div class="data-all" v-if="selfStaffList.length !== 0">
              <div class="self-merchant-list" v-for="(item, index) in selfStaffList" v-bind:key="index">
                <div class="self-staff-list-box user-box">
                  <div class="number">{{index + 1}}</div>
                  <img class="img" :src="item.avatar_url" v-if="image">
                </div>
                <div class="self-staff-list-box user-name">{{item.nickname}}</div>
                <div class="self-staff-list-box">{{item.sale_count}}</div>
                <div class="self-staff-list-box money-box">
                  <div class="icon">¥</div>
                  <div class="money">{{item.commission}}</div>
                </div>
              </div>
            </div>
            <div class="data-null" v-if="selfStaffList.length === 0">暂无数据～</div>
          </scroll-view>
        </div>
      </div>
      <div class="data-bra">
        <div class="bra-title">
          <div class="text">核销统计图</div>
        </div>
        <div class="ecbra-box">
          <div class="ecbra-text">
            <div class="text">售卡数</div>
            <div class="number">{{barDetails.sale_count}}</div>
          </div>
          <div class="ecbra-text">
            <div class="text">本店核销数</div>
            <div class="number">{{barDetails.self_verification}}</div>
          </div>
          <div class="ecbra-text">
            <div class="text">异业核销数</div>
            <div class="number">{{barDetails.other_verification}}</div>
          </div>
        </div>
        <div class="ecbra-bottom">向左滑动图表查看更多数据</div>
        <div class="ec-box" v-if="showBra">
          <ec-canvas class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ecBra"></ec-canvas>
        </div>
      </div>
    </div>
    <div class="all-staff" v-if="staffBtn === 'all'">
      <div class="all-staff-box">
        <div class="rank-list">
          <img v-if="image" :src="image + '/defaults/ipc-shopping/activitydata/bg-activity_lizi@2x.png'"
               class="rank-bg" mode="widthFix">
          <div class="rank-box rank-two">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_second@2x.png'" v-if="image"
                   class="hard-img-crown">
              <img v-if="allStaffList.length" :src="allStaffList[1].avatar_url" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_second2@2x.png'" v-if="image"
                   class="img">
              <div class="name" v-if="allStaffList.length">{{allStaffList[1].nickname}}</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">总收益</div>
              <div class="right-text" v-if="allStaffList.length">{{allStaffList[1].commission}}</div>
            </div>
          </div>
          <div class="rank-box rank-two rank-one">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_first@2x.png'" v-if="image"
                   class="hard-img-crown">
              <img v-if="allStaffList.length" :src="allStaffList[0].avatar_url" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_first1@2x.png'" v-if="image"
                   class="img">
              <div class="name first-name" v-if="allStaffList.length">{{allStaffList[0].nickname}}</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">总收益</div>
              <div class="right-text" v-if="allStaffList.length">{{allStaffList[0].commission}}</div>
            </div>
          </div>
          <div class="rank-box rank-two">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_third@2x.png'" v-if="image"
                   class="hard-img-crown">
              <img v-if="allStaffList.length" :src="allStaffList[2].avatar_url" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_third3@2x.png'" v-if="image"
                   class="img">
              <div class="name thr-name" v-if="allStaffList.length">{{allStaffList[2].nickname}}</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">总收益</div>
              <div class="right-text" v-if="allStaffList.length">{{allStaffList[2].commission}}</div>
            </div>
          </div>
        </div>
        <div class="data-content">
          <div class="self-merchant-list" v-for="(item, index) in allStaffTwoList" v-bind:key="index">
            <div class="self-staff-list-box user-box">
              <div class="number">{{index + 4}}</div>
              <img class="img" :src="item.avatar_url" v-if="item">
            </div>
            <div class="self-staff-list-box user-name">{{item.nickname}}</div>
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
  import { baseURL, DEVICE_INFO, ERR_OK } from 'api/config'
  import * as wechat from 'common/js/wechat'
  import { mapGetters } from 'vuex'
  import api from 'api'
  import wx from 'wx'

  const Baroptions = {
    color: ['#40A1AE'],
    // tooltip: {
    //   trigger: 'axis',
    //   axisPointer: {
    //     type: 'line'
    //   }
    // },
    dataZoom: [{
      type: 'inside',
      throttle: '30',
      minValueSpan: 5,
      start: 0,
      end: 32,
      zoomLock: true
    }],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.16)'
          }
        },
        axisLabel: {
          interval: 0,
          color: '#959DBD',
          fontSize: 10,
          rotate: 20
        }
      }
    ],
    yAxis: [
      {
        max: 5,
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.16)'
          }
        },
        axisLabel: {
          color: '#959DBD',
          fontSize: 10
        },
        splitLine: {
          show: false,
          color: 'rgba(255,255,255,0.16)'
        }
      }
    ],
    series: [
      {
        name: '员工总榜数据',
        type: 'bar',
        label: {
          normal: {
            show: true,
            fontSize: 10,
            position: 'top'
          }
        },
        barWidth: '15',
        data: [0]
      }
    ]
  }
  export default {
    data () {
      return {
        ecBra: {
          // 传 options
          options: Baroptions
        },
        image: baseURL.image,
        staffScene: 2,
        staffBtn: 'self',
        activeId: 1,
        selfStaffList: [], // 商店员工参数
        selfStaffPage: 1,
        isAllselfStaff: false,
        shopName: null,
        barDetails: {
          sale_count: 0,
          self_verification: 0,
          other_verification: 0
        },
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
        fristAllStaff: false,
        showBra: false,
        tabFlag: 0
      }
    },
    onPullDownRefresh () {
      if (this.staffScene === 2) {
        this.selfStaffPage = 1
        this.isAllselfStaff = false
        this._getNewSelfStaff(false)
        this._getBar(false)
      } else {
        this.allStaffList = []
        this.allStaffTwoList = []
        this._getAllfStaff(false)
      }
      wx.stopPullDownRefresh()
    },
    onShow () {
      this.showBra = false
      this._getBar()
      setTimeout(() => {
        this.showBra = true
      }, 500)
      this.shopName = wx.getStorageSync('shopName')
      if (!this.shopName) {
        this.shopName = '我的店'
      } else {
        this.shopName = this.shopName + '榜'
      }
      this._dataInit()
      let system = DEVICE_INFO.system
      this.ios = system.search('iOS') !== -1
      if (!this.ios) {
        this.ecBra.options.xAxis[0].axisLabel.rotate = 0
      }
      this.activeId = this.$root.$mp.query.id
      this._getNewSelfStaff()
    },
    methods: {
      ...mapGetters(['role']),
      _init () {
        let role = this.role()
        this.currentRole = role
      },
      _dataInit () {
        this.selfStaffPage = 1
        this.selfStaffList = []
        this.isAllselfStaff = false
        this.fristAllStaff = false
        this.staffBtn = 'self'
        this.tabFlag = 0
      },
      clickStaffTab (value) {
        this.staffBtn = value
        if (this.staffBtn === 'all') {
          this.staffScene = 3
          this.tabFlag = 1
          if (this.fristAllStaff) return
          this._getAllfStaff()
          this.fristAllStaff = true
        } else {
          this.staffScene = 2
          this.tabFlag = 0
        }
      },
      // 商家单店员工数据
      _getSelfStaff () {
        api.dataSelfStaff(this.activeId, this.selfStaffPage).then(res => {
          if (res.error === ERR_OK) {
            this.selfStaffList.push(...res.data)
            this._isAllSelfStaff(res)
            this.selfStaffPage++
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      },
      // 商家单店员工数据
      _getNewSelfStaff (loading) {
        api.dataSelfStaff(this.activeId, this.selfStaffPage, loading).then(res => {
          if (res.error === ERR_OK) {
            this.selfStaffList = res.data
            this._isAllSelfStaff(res)
            this.selfStaffPage++
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      },
      scrollSelfStaff () {
        if (this.isAllselfStaff) return
        this._getSelfStaff()
      },
      _isAllSelfStaff (res) {
        if (this.selfStaffList.length >= res.meta.total * 1) {
          this.isAllselfStaff = true
        }
      },
      _getBar (loading) {
        api.dataBar(this.activeId, loading).then(res => {
          if (res.error === ERR_OK) {
            this.ecBra.options.xAxis[0].data = res.data.shop_names
            this.ecBra.options.series[0].data = res.data.verification_counts
            this.barDetails = res.data.detail
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      },
      // 商家员工总榜数据
      _getAllfStaff (loading) {
        api.dataAllStaff(this.activeId, loading).then(res => {
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
    position: relative
    width: 300px
    margin: 0 auto 12px
    .merchant-title-tab
      no-wrap()
      width: 150px
      text-align: center
      font-family: $font-family-light
      font-size: $font-size-medium
      color: rgba(255, 255, 255, 0.4)
      padding-bottom: 10px
      position: relative
    .active
      color: $color-background-ff
      font-family: $font-family-regular
      font-size: $font-size-medium-x
    .line-wrapper
      position: absolute
      left: 0
      bottom: 2px
      display: flex
      justify-content: center
      width: 50%
      height: 2px
      transition: all .3s
      transform: translate3d(0, 0, 0)
      .line
        width: 30px
        height: 2px
        background: $color-background-ff

  .self-staff /* 店铺员工 */
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
            .self-staff-list-box
              flex: 1
              &:nth-of-type(2)
                font-size: $font-size-small
                no-wrap()
                font-family: $font-family-light
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
            .user-name
              no-wrap()
              padding-right: 5px
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
                margin-right: 2px
                color: $color-background-ff
                line-height: 35px
                font-size: $font-size-small-ss
          .self-merchant-list
            &:nth-of-type(1)
              .user-box
                .number
                  color: #FFD708
            &:nth-of-type(2)
              .user-box
                .number
                  color: #7CC1E7
            &:nth-of-type(3)
              .user-box
                .number
                  color: #C9826B
            .user-name
              no-wrap()
              padding-right: 5px
    .data-bra
      background: $color-assist-27
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
      border-radius: 3px
      height: 247.5px
      margin-top: 10px
      position: relative
      .bra-title
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
          margin-right: 2px
        .money
          font-size: $font-size-medium-x
          font-family: DINAlternate-Bold
      .ecbra-box
        layout(row)
        position: absolute
        z-index: 2
        left: 0
        top: 40px
        height: 40px
        line-height: 40px
        width: 100%
        .ecbra-text
          layout(row)
          align-items: center
          flex: 1
          &:first-child
            position: relative
            left: 15px
          .text
            margin-right: 5px
            font-family: $font-family-light
            font-size: $font-size-small
            color: $color-text-95
          .number
            font-family: DINAlternate-Bold
            font-size: $font-size-medium
            color: $color-background-ff
      .ecbra-bottom
        position: absolute
        width: 100%
        bottom: 10px
        left: 0
        text-align: center
        font-family: $font-family-light
        font-size: $font-size-small-s
        color: $color-background-ff
    .ec-box
      height: 209px
      ec-canvas
        width: 400px
        height: 179px

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
            align-items: flex-end
            justify-content: center
            height: $font-size-medium-x
            .left-text
              font-family: $font-family-light
              font-size: $font-size-small-s
              color: $color-text-95
              margin-right: 5px
              line-height: 1
            .right-text
              font-family: DINAlternate-Bold
              font-size: $font-size-medium-x
              color: $color-background-ff
              line-height: 1
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
              margin-right: 2px
              line-height: 35px
              font-size: $font-size-small-ss

  .data-null
    text-align: center
    font-family: $font-family-light
    font-size: $font-size-small
    color: #959DBD
    line-height: 128.5px
</style>
