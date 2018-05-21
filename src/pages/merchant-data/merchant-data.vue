<template>
  <div class="data-box">
    <div class="data-tab">
      <div class="tab-merchant " :class="bigBtn === 'merchant' ? 'active' : '' " @tap="clickTab('merchant')">商家版</div>
      <div class="tab-merchant" :class="bigBtn === 'staff' ? 'active' : '' " @tap="clickTab('staff')">员工榜</div>
    </div>
    <div class="tab-merchant-box" v-if="bigBtn === 'merchant'">
      <div class="merchant-title">
        <div class="merchant-title-tab" :class="merchantBtn === 'self' ? 'active' : '' "
             @tap="clickMerchantTab('self')">国颐堂榜
        </div>
        <div class="merchant-title-tab" :class="merchantBtn === 'all' ? 'active' : '' " @tap="clickMerchantTab('all')">
          总榜
        </div>
      </div>
      <div class="self-merchant" v-if="merchantBtn === 'self'">
        <div class="self-top">
          <div class="data-title">
            <div class="text">时间</div>
            <div class="text">售卡数</div>
            <div class="text">他店核销数</div>
            <div class="text">联盟力</div>
          </div>
          <div class="data-content">
            <scroll-view class="content-scroll" @scrolltolower="scrollSelfShop" scroll-y="true">
              <div class="data-all" v-if="selfShopList.length !== 0">
                <div class="self-merchant-list" v-for="(item, index) in selfShopList" v-bind:key="index">
                  <div class="selft-merchant-list-box">{{item.date}}</div>
                  <div class="selft-merchant-list-box">{{item.sale_count}}</div>
                  <div class="selft-merchant-list-box">{{item.other_verification}}</div>
                  <div class="selft-merchant-list-box">{{item.alliance_power}}</div>
                </div>
              </div>
              <div class="data-null" v-if="selfShopList.length === 0">暂无数据～</div>
            </scroll-view>
            <div class="all-box">
              <div class="text">总计</div>
              <div class="text">{{selfListAll.sale_count || 0}}</div>
              <div class="text">{{selfListAll.other_verification || 0}}</div>
              <div class="text">{{selfListAll.alliance_power || 0}}</div>
            </div>
          </div>
        </div>
        <div class="self-bottom">
          <img :src="image + '/defaults/ipc-shopping/activitydata/pic-activity_banner01@2x.png'" v-if="image">
          <div class="moeny-box">
            <div class="number-box">
              <div class="icon">¥</div>
              <div class="number">{{allotMoney || 0}}</div>
            </div>
            <div class="text">正在等待抢钱</div>
          </div>
        </div>
      </div>
      <div class="all-merchant" v-if="merchantBtn === 'all'">
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
                <div class="self-merchant-list" v-for="(item, index) in allShopList" v-bind:key="index"
                     @tap="test(item)">
                  <div class="selft-merchant-list-box">{{item.merchant_id}}</div>
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
            <ec-canvas class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-staff-box" v-if="bigBtn === 'staff'">
      <div class="merchant-title">
        <div class="merchant-title-tab" :class="staffBtn === 'self' ? 'active' : '' " @tap="clickStaffTab('self')">
          国颐堂榜
        </div>
        <div class="merchant-title-tab" :class="staffBtn === 'all' ? 'active' : '' " @tap="clickStaffTab('all')">总榜
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
                  <div class="self-staff-list-box">{{item.nickname}}</div>
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
    </div>
    <div class="page-bg"></div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import {baseURL, DEVICE_INFO, ERR_OK} from 'api/config'
  import * as wechat from 'common/js/wechat'
  import {mapGetters} from 'vuex'
  import {ROLE} from 'common/js/contants'
  import wx from 'wx'
  import api from 'api'
  import Toast from '@/components/toast/toast'

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
      data: [{
        value: 55,
        name: '锋味粉-55'
      }, {
        value: 20,
        name: '海底捞-20'
      }, {
        value: 10,
        name: '自然醉鹅-10'
      }, {
        value: 20,
        name: '星巴克-20'
      }, {
        value: 38,
        name: '牛肉火锅-38'
      }, {
        value: 58,
        name: '太二酸菜鱼-58'
      }, {
        value: 28,
        name: '旋转寿司-28'
      }, {
        value: 38,
        name: '味千拉面-38'
      }, {
        value: 38,
        name: '澄海烧鹅-38'
      }, {
        value: 38,
        name: '鸡公煲-38'
      }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  }
  const Baroptions = {
    color: ['#40A1AE'],
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
          rotate: 25
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
    data() {
      return {
        ec: {
          options: options
        },
        ecBra: {
          options: Baroptions
        },
        image: baseURL.image,
        bigBtn: 'merchant',
        merchantBtn: 'self',
        staffBtn: 'self',
        shopsSene: 0,
        staffScene: 2,
        preScene: null,
        activeId: 1, // 活动Id
        allotMoney: null,
        selfShopList: [], // 单店数据参数
        selfShopPage: 1,
        isAllSelfShop: false,
        selfListAll: {},
        allShopList: [], // 商店总榜数据参数
        allfShopPage: 1,
        isAllShop: false,
        fristAllShop: false,
        selfStaffList: [], // 商店员工参数
        selfStaffPage: 1,
        isAllselfStaff: false,
        fristselfStaff: false,
        allStaffList: [], // 商店总榜总榜数据参数
        allStaffTwoList: [],
        fristAllStaff: false
      }
    },
    mounted() {
      let system = DEVICE_INFO.system
      this.ios = system.search('iOS') !== -1
      if (!this.ios) {
        this.ecBra.options.xAxis[0].axisLabel.rotate = 0
      }
      console.log(this.ecBra.options.xAxis[0].axisLabel.rotate)
      this.activeId = this.$root.$mp.query.id
      this._getSelfShop()
      this._getAllotMoney()
      this._getSelfShopAll()
    },
    onPullDownRefresh() {
      if (this.shopsSene === 0 && this.preScene === 0) {
        this.selfShopPage = 1
        this.selfShopList = []
        this.isAllSelfShop = false
        this._getSelfShop()
        this._getAllotMoney()
        this._getSelfShopAll()
      } else if (this.shopsSene === 1 && this.preScene === 0) {
        this.allfShopPage = 1
        this.allShopList = []
        this.isAllShop = false
        this._getAllfShop()
        this._getCake()
      } else if (this.staffScene === 2 && this.preScene === 1) {
        this.selfStaffPage = 1
        this.selfStaffList = []
        this.isAllselfStaff = false
        this._getSelfStaff()
        this._getBar()
      } else if (this.staffScene === 3 && this.preScene === 1) {
        this.allStaffList = []
        this.allStaffTwoList = []
        this._getAllfStaff()
      }
      wx.stopPullDownRefresh()
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
      clickTab(value) {
        this.bigBtn = value
        if (this.bigBtn === 'staff') {
          this.preScene = 1
          if (this.fristselfStaff) return
          this._getSelfStaff()
          this._getBar()
          this.fristselfStaff = true
        } else {
          this.preScene = 0
        }
        console.log(this.preScene)
      },
      clickMerchantTab(value) {
        this.merchantBtn = value
        if (this.merchantBtn === 'all') {
          this.shopsSene = 1
          if (this.fristAllShop) return
          this._getAllfShop()
          this._getCake()
          this.fristAllShop = true
        } else {
          this.shopsSene = 0
        }
      },
      clickStaffTab(value) {
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
      // 商家单店数据
      _getSelfShop() {
        api.dataSelfShop(this.activeId, this.selfShopPage).then(res => {
          console.log(res, '商家单店数据```````````')
          if (res.error === ERR_OK) {
            this.selfShopList.push(...res.data)
            wechat.hideLoading()
            this._isAllSelfShop(res)
            console.log(this.isAllSelfShop)
            this.selfShopPage++
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      _getSelfShopAll() {
        api.dataSelfShopAllData(this.activeId).then(res => {
          console.log(res)
          if (res.error === ERR_OK) {
            this.selfListAll = res.data
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      },
      scrollSelfShop() {
        if (this.isAllSelfShop) return
        this._getSelfShop()
      },
      _isAllSelfShop(res) {
        if (this.selfShopList.length >= res.meta.total * 1) {
          this.isAllSelfShop = true
        }
      },
      _getAllotMoney() {
        api.dataAllotMoney(this.activeId).then(res => {
          console.log(res)
          if (res.error === ERR_OK) {
            this.allotMoney = res.data.share_money
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
        })
      },
      // 商家总榜数据
      _getAllfShop() {
        api.dataAllShop(this.activeId, this.allfShopPage).then(res => {
          console.log(res, '````````商家总榜数据')
          if (res.error === ERR_OK) {
            this.allShopList.push(...res.data)
            wechat.hideLoading()
            this._isAllALLShop(res)
            console.log(this.isAllSelfShop)
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
          } else {
            this.$refs.toast.show(res.message)
          }
          console.log(res)
          wechat.hideLoading()
        })
      },
      // 商家单店员工数据
      _getSelfStaff() {
        api.dataSelfStaff(this.activeId, this.selfStaffPage).then(res => {
          console.log(res)
          if (res.error === ERR_OK) {
            this.selfStaffList.push(...res.data)
            wechat.hideLoading()
            this._isAllSelfStaff(res)
            console.log(this.isAllselfStaff)
            this.selfStaffPage++
          } else {
            this.$refs.toast.show(res.message)
          }
          wechat.hideLoading()
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
    },
    components: {
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .data-box
    padding-bottom: 30px

  .page-bg
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    background: #1A1D3D

  .data-tab
    border: .5px solid #3460EC
    layout(row)
    width: 264px
    margin: 10px auto 27px
    border-radius: 3px
    .tab-merchant
      font-family: $font-family-light
      font-size: $font-size-medium
      color: $color-text-95
      text-align: center
      height: 27px
      line-height: 27px
      flex: 1
    .active
      background: $color-assist-34
      color: $color-background-ff

  .merchant-title
    layout(row)
    justify-content: center
    margin-bottom: 12px
    .merchant-title-tab
      no-wrap()
      width: 100px
      text-align: center
      font-family: $font-family-light
      font-size: $font-size-medium
      color: $color-text-95
      padding-bottom: 10px
      position: relative
    .active
      color: $color-background-ff
      cut-off-rule-bottom(35px, 35px, $color-assist-34, 2px)

  .self-merchant /* 个人店铺 */
    padding: 0 12px
    .self-top
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
          height: 128.5px
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
              &:last-child
                text-align: right
                position: relative
                right: 30px
      .all-box
        layout(row)
        font-size: $font-size-medium-x
        font-family: DINAlternate-Bold
        height: 50px
        line-height: 50px
        color: $color-background-ff
        border-bottom-left-radius: 3px
        border-bottom-right-radius: 3px
        cut-off-rule-top(0, 0, rgba(255, 255, 255, 0.16), 0.5px)
        .text
          flex: 1
          &:first-child
            font-family: $font-family-meddle
            font-size: $font-size-medium
            color: $color-assist-34
          &:last-child
            text-align: right
            position: relative
            right: 30px
    .self-bottom
      position: relative
      margin-top: 10px
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
      height: 247.5px
      img
        width: 100%
        height: 100%
        display: block
      .moeny-box
        width: 100%
        left: 0
        right: 0
        top: 40px
        text-align: center
        position: absolute
        .number-box
          layout(row)
          justify-content: center
          align-items: flex-end
          .icon
            font-family: $font-family-regular
            color: #FFFE5C
            font-size: $font-size-medium
            line-height: 1
          .number
            line-height: 1
            font-family: DINAlternate-Bold
            color: #FFFE5C
            font-size: 30px
        .text
          margin-top: 8px
          line-height: 1
          font-family: $font-family-regular
          color: $color-background-ff
          font-size: $font-size-medium

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
      ec-canvas
        width: 400px
        height: 179px

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
