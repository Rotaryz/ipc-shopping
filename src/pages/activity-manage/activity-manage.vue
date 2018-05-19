<template>
  <div class="manage-con">
    <header class="tab">
      <div :class="['t-item',tabFlag === 0 ? 'hit':'']" @tap.stop="changeTab(0)">活动管理</div>
      <div :class="['t-item',tabFlag === 2 ? 'hit':'']" @tap.stop="changeTab(2)">活动池</div>
    </header>
    <div class="manage-list" v-if="tabFlag === 0">
      <div class="list-data" v-if="activeList.length !== 0">
        <div class="box-list" v-for="(iteam, index) in activeList" v-bind:key="index">
          <active-card :useType="0" @previewHandler="iteam" :cardInfo="iteam"></active-card>
        </div>
      </div>
      <div class="list-null" v-if="activeList.length === 0">
        <img :src="image + '/defaults/ipc-shopping/home/pic-union_empty@2x.png'" class="null-img" v-if="image"
             mode="widthFix">
        <div class="text">暂无活动</div>
      </div>
    </div>
    <div class="manage-list" v-if="tabFlag === 2">
      <div class="list-data" v-if="pondList.length !== 0">
        <div class="box-list" v-for="(iteam, index) in pondList" v-bind:key="index">
          <active-card :useType="0" :cardInfo="iteam" @applyHandler="jumpApply"></active-card>
        </div>
      </div>
      <div class="list-null" v-if="pondList.length === 0">
        <img :src="image + '/defaults/ipc-shopping/home/pic-union_empty@2x.png'" class="null-img" v-if="image"
             mode="widthFix">
        <div class="text">暂无活动</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import {baseURL} from 'api/config'
  import ActiveCard from 'components/active-card-item/active-card-item'
  import * as wechat from 'common/js/wechat'
  import {mapGetters} from 'vuex'
  import {ROLE} from 'common/js/contants'
  import wx from 'wx'

  const LIMIT_DEF = 10
  export default {
    data() {
      return {
        image: baseURL.image,
        tabFlag: 2,
        pondList: [],
        activeList: [],
        isAllActive: false,
        isAllPond: false,
        PondPage: 1,
        PondLimt: LIMIT_DEF,
        ActiveData: {
          page: 1,
          limit: LIMIT_DEF
        }
      }
    },
    mounted() {
      this._rqGetActiveList()
      this._rqManageGetActiveList()
    },
    beforeMount() {
      this._init()
    },
    onPullDownRefresh() {
      if (this.tabFlag === 0) {
        this.ActiveData.page = 1
        this.activeList = []
        this.isAllActive = false
        this._rqManageGetActiveList()
      } else {
        this.PondPage = 1
        this.pondList = []
        this.isAllPond = false
        this._rqGetActiveList()
      }
      wx.stopPullDownRefresh()
    },
    onReachBottom() {
      if (this.tabFlag === 0) {
        console.log(1111)
      } else {
        if (this.isAllPond) return
        this._rqGetActiveList()
        console.log(22)
      }
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
      changeTab(flag) {
        this.tabFlag = flag
      },
      // 获得活动池的活动
      _rqGetActiveList() {
        api.merPondActiveList(this.PondPage, this.PondLimt).then(res => {
          console.log(res)
          this.pondList.push(...res.data)
          this._isAllPond(res)
          console.log(this.isAllPond)
          this.PondPage++
          wechat.hideLoading()
        })
      },
      // 检查是管理列表的数据
      _rqManageGetActiveList() {
        api.merManageActiveList(this.ActiveData).then(res => {
          console.log(res)
          this.activeList.push(...this._formatRqData(res))
          console.log(this.activeList)
          this._isAllActive(res)
          console.log(this.isAllActive)
          wechat.hideLoading()
        })
      },
      jumpApply(cardInfo) {
        const url = `/pages/merchant-activity/merchant-activity?id=${cardInfo.id}`
        console.log(url)
        this.$router.push(url)
      },
      // 格式化服务器数据
      _formatRqData(res) {
        if (res.data && res.data.length === 0) return []
        let arr = []
        res.data.map(item => {
          let status = 1
          let statusStr = '审核中'
          if (item.alliance_merchant_report.length === 0) {
            item.alliance_merchant_report = {
              sale_count: 0,
              verification_power: 0
            }
          }
          if (item.promotion_id === 0) {
            status = 0
          } else {
            if (item.check_status === 0) {
              status = 2
            } else if (item.check_status === 1) {
              status = 2
              statusStr = '报名成功'
            } else if (item.check_status === 3) {
              status = 3
            } else {
              if (item.check_status === 0) {
                status = 2
                statusStr = '报名失败（退款中）'
              } else if (item.check_status === 1) {
                status = 2
                statusStr = '报名失败（已退款）'
              } else if (item.check_status === 2) {
                status = 2
                statusStr = '报名失败（退款失败）'
              } else if (item.check_status === 3) {
                status = 2
                statusStr = '报名失败（排队中）'
              }
            }
          }
          if (item.status === 2) {
            status = 10
            statusStr = '已上架'
          } else if (item.status === 3) {
            status = 11
            statusStr = '已下架'
          }
          arr.push({
            name: item.activity_alliance.name,
            end_at: item.activity_alliance.end_at,
            sale_count: item.alliance_merchant_report.sale_count,
            verification_power: item.alliance_merchant_report.verification_power,
            status: status,
            statusStr: statusStr
          })
        })
        return arr
      },
      // 检查是否已经查询完毕
      _isAllActive(res) {
        if (this.activeList.length >= res.meta.total * 1) {
          this.isAllActive = true
        }
      },
      // 检查是否已经查询完毕
      _isAllPond(res) {
        if (this.pondList.length >= res.meta.total * 1) {
          this.isAllPond = true
        }
      }
    },
    components: {
      ActiveCard
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  $nav-height = 40px // 导航栏高度

  .manage-con
    padding-top: $nav-height
    padding-bottom: 20px

  .tab
    position: fixed
    top: 0
    left: 0
    right: 0
    height: $nav-height
    padding: 0 40px
    z-index: 3
    layout(row)
    justify-content: space-between
    align-items: center
    background-color: $color-main-1a
    font-family: $font-family-light
    font-size: $font-size-medium
    color: $color-text-95
    .t-item
      position: relative
      height: $nav-height
      line-height: $nav-height
      transition: 0.3 all
      flex: 1
      text-align: center
      &.hit
        color: $color-background-ff
        cut-off-rule-bottom(40%, 40%, $color-assist-34, 2px)

  .manage-list
    padding: 0 15px
    .box-list
      margin-top: 10px

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
</style>
