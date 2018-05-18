<template>
  <div class="manage-con">
    <header class="tab">
      <div :class="['t-item',tabFlag === 0 ? 'hit':'']" @tap.stop="changeTab(0)">活动管理</div>
      <div :class="['t-item',tabFlag === 2 ? 'hit':'']" @tap.stop="changeTab(2)">活动池</div>
    </header>
    <div class="manage-list" v-if="tabFlag === 0">
      <div class="list-data" v-if="activeList.length !== 0">
        <div class="box-list" v-for="(iteam, index) in activeList" v-bind:key="index">
          <active-card :useType="0" @previewHandler="iteam" :cardInfo="iteam.activity_alliance"></active-card>
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

  export default {
    data() {
      return {
        image: baseURL.image,
        tabFlag: 0,
        pondList: [],
        activeList: []
      }
    },
    mounted() {
      this._rqGetActiveList()
      this._rqManageGetActiveList()
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
        this.currentRole = ROLE.UNION_ID
        // wx.setStorageSync('merchantId', merchantId)
        wx.setStorageSync('userType', ROLE.UNION_ID)
        console.log(this.currentRole)
      },
      changeTab(flag) {
        this.tabFlag = flag
      },
      _rqGetActiveList() {
        api.merPondActiveList().then(res => {
          console.log(res)
          this.pondList = res.data
          wechat.hideLoading()
        })
      },
      _rqManageGetActiveList() {
        api.merManageActiveList().then(res => {
          console.log(res)
          this.activeList = res.data
          wechat.hideLoading()
        })
      },
      jumpApply(cardInfo) {
        const url = `/pages/merchant-activity/merchant-activity?id=${cardInfo.id}`
        console.log(url)
        this.$router.push(url)
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

  .tab
    position: relative
    height: $nav-height
    padding: 0 40px
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
