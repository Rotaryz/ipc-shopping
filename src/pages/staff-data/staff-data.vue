<template>
  <div class="data-box">
    <div class="merchant-title">
      <div class="merchant-title-tab" :class="staffBtn === 'self' ? 'active' : '' " @tap="clickStaffTab('self')">国颐堂榜</div>
      <div class="merchant-title-tab" :class="staffBtn === 'all' ? 'active' : '' " @tap="clickStaffTab('all')">总榜</div>
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
            <div class="data-all"   v-if="selfStaffList.length !== 0">
              <div class="self-merchant-list" v-for="(item, index) in selfStaffList"  v-bind:key="index">
                <div class="self-staff-list-box user-box">
                  <div class="number">{{index + 1}}</div>
                  <img class="img" :src="item.avatar_url" v-if="image">
                </div>
                <div class="self-staff-list-box">{{item.nickname}}</div>
                <div class="self-staff-list-box">{{item.sale_count}}</div>
                <div class="self-staff-list-box money-box">
                  <div class="icon">¥</div>
                  <div class="money">{{item.commission}}</div>
                </div>
              </div>
            </div>
            <div class="data-null"  v-if="selfStaffList.length === 0">暂无数据～</div>
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
            <div class="number">10</div>
          </div>
          <div class="ecbra-text">
            <div class="text">本店核销数</div>
            <div class="number">10</div>
          </div>
          <div class="ecbra-text">
            <div class="text">异业核销数</div>
            <div class="number">10</div>
          </div>
        </div>
        <div class="ecbra-bottom">向左图表滑动查看更多数据</div>
        <div class="ec-box">
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
              <img :src="allStaffList[1].avatar_url" v-if="image" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_second2@2x.png'" v-if="image"
                   class="img">
              <div class="name">{{allStaffList[1].nickname}}</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">核销力</div>
              <div class="right-text">{{allStaffList[1].sale_count}}</div>
            </div>
          </div>
          <div class="rank-box rank-two rank-one">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_first@2x.png'" v-if="image"
                   class="hard-img-crown">
              <img :src="allStaffList[0].avatar_url" v-if="image" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_first1@2x.png'" v-if="image"
                   class="img">
              <div class="name first-name">{{allStaffList[0].nickname}}</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">核销力</div>
              <div class="right-text">{{allStaffList[0].sale_count}}</div>
            </div>
          </div>
          <div class="rank-box rank-two">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_third@2x.png'" v-if="image"
                   class="hard-img-crown">
              <img :src="allStaffList[2].avatar_url" v-if="image" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_third3@2x.png'" v-if="image"
                   class="img">
              <div class="name thr-name">{{allStaffList[0].nickname}}</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">核销力</div>
              <div class="right-text">{{allStaffList[2].sale_count}}</div>
            </div>
          </div>
        </div>
        <div class="data-content">
          <div class="self-merchant-list" v-for="(item, index) in allStaffTwoList" v-bind:key="index">
            <div class="self-staff-list-box user-box">
              <div class="number">{{index + 4}}</div>
              <img class="img" :src="item.avatar_url" v-if="image">
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
  import {baseURL, DEVICE_INFO, ERR_OK} from 'api/config'
  import * as wechat from 'common/js/wechat'
  import {mapGetters} from 'vuex'
  import {ROLE} from 'common/js/contants'
  import wx from 'wx'
  import api from 'api'

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
        data: ['锋味粉', '海底捞', '自然醉鹅', '星巴克', '牛肉火锅', '太二酸菜鱼', '旋转寿司', '海底捞', '自然醉鹅', '星巴克', '牛肉火锅', '太二酸菜鱼', '旋转寿司', '海底捞', '自然醉鹅', '星巴克', '牛肉火锅', '太二酸菜鱼', '旋转寿司'],
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
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
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#959DBD',
          fontSize: 10
        },
        splitLine: {
          show: false
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
        data: [20, 52, 20, 34, 39, 10, 52, 20, 334, 390, 10, 52, 20, 33, 30, 10, 52, 20, 34]
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
        allStaffList: [], // 商店总榜总榜数据参数
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
    },
    mounted() {
      let system = DEVICE_INFO.system
      this.ios = system.search('iOS') !== -1
      if (!this.ios) {
        this.ecBra.options.xAxis[0].axisLabel.rotate = 0
      }
      this.activeId = this.$root.$mp.query.id
      this._getSelfStaff()
      this._getBar()
    },
    methods: {
      ...mapGetters(['role']),
      _init() {
        let role = this.role()
        this.currentRole = role
      },
      clickStaffTab (value) {
        this.staffBtn = value
        if (this.staffBtn === 'all') {
          this.staffScene = 3
          if (this.fristAllStaff) return
          this._getAllfStaff()
          this.fristAllStaff = true
        } else {
          this.staffScene = 2
        }
      },
      // 商家单店员工数据
      _getSelfStaff() {
        api.dataSelfStaff(this.activeId, this.selfStaffPage).then(res => {
          if (res.error === ERR_OK) {
            this.selfStaffList.push(...res.data)
            wechat.hideLoading()
            this._isAllSelfStaff(res)
            console.log(this.isAllselfStaff)
            this.selfStaffPage++
          } else {
            this.$refs.toast.show(res.message)
          }
          console.log(res)
        })
      },
      scrollSelfStaff() {
        if (this.isAllselfStaff) return
        this._getAllfShop()
      },
      _isAllSelfStaff(res) {
        if (this.selfStaffList.length >= res.meta.total * 1) {
          this.isAllselfStaff = true
        }
      },
      _getBar() {
        api.dataBar(this.activeId).then(res => {
          if (res.error === ERR_OK) {
            console.log(this.ecBra.options.xAxis[0].data, '11111111111`````````````')
            this.ecBra.options.xAxis[0].data = res.data.shop_names
            this.ecBra.options.series[0].data = res.data.verification_counts
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
            console.log(this.allStaffList)
            console.log(this.allStaffTwoList)
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
  .data-null
    text-align: center
    font-family: $font-family-light
    font-size: $font-size-small
    color: #959DBD
    line-height: 128.5px
</style>
