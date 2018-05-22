<template>
  <div>
    <div class="list-box"  v-if="staffList.length !== 0">
      <div class="box-top" v-for="(item, index) in pageList" v-bind:key="index">
        <active-card :useType="100" @addHandCode="jumpCode" @addHandData="jumpData" :cardInfo="item"></active-card>
      </div>
    </div>
    <div class="list-null" v-if="staffList.length === 0">
      <img :src="image + '/defaults/ipc-shopping/home/pic-union_empty@2x.png'" class="null-img" v-if="image"
           mode="widthFix">
      <div class="text">暂无活动</div>
    </div>
    <div class="page-bg"></div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import {baseURL, ERR_OK} from 'api/config'
  import ActiveCard from 'components/active-card-item/active-card-item'
  import {mapGetters} from 'vuex'
  import {ROLE} from 'common/js/contants'
  import api from 'api'
  import * as wechat from 'common/js/wechat'
  import wx from 'wx'
  import Toast from '@/components/toast/toast'

  export default {
    data() {
      return {
        image: baseURL.image,
        staffList: [],
        isAllActive: false,
        pageList: {
          page: 1,
          limit: 10
        }
      }
    },
    mounted() {
      this._getStaff(this.pageList)
    },
    beforeMount() {
      this._init()
    },
    onPullDownRefresh() {
      this.staffList = []
      this.isAllActive = false
      this.pageList.page = 1
      this._getStaff(this.pageList)
    },
    onReachBottom() {
      if (this.isAllActive) return
      this._getStaff(this.pageList)
    },
    methods: {
      ...mapGetters(['role']),
      _init() {
        let role = this.role()
        this.currentRole = role
      },
      _getStaff() {
        api.merStaffList().then(res => {
          if (res.error === ERR_OK) {
            this.staffList.push(...this._formatRqData(res))
            this._isAllActive(res)
            this.pageList.page++
          } else {
            this.$refs.toast.show(res.message)
          }
          console.log(res)
          wechat.hideLoading()
        })
      },
      // 格式化服务器数据
      _formatRqData(res) {
        if (res.data && res.data.length === 0) return []
        let arr = []
        res.data.map(item => {
          let status = 101
          let statusStr = '已上架'
          if (item.activity_alliance.status === 2) {
            status = 101
          } else if (item.activity_alliance.status === 3) {
            status = 102
            statusStr = '已下架'
          }
          arr.push({
            name: item.activity_alliance.name,
            end_at: item.activity_alliance.end_at,
            store: item.stock,
            // status: status,
            statusStr: statusStr,
            statusCode: status
          })
        })
        return arr
      },
      // 检查是否已经查询完毕
      _isAllActive(res) {
        if (this.staffList.length >= res.meta.total * 1) {
          this.isAllActive = true
        }
      },
      jumpCode(cardInfo) {
        console.log(cardInfo.id)
        const url = `/pages/staff-code/staff-code?id=${cardInfo.id}`
        console.log(url)
        this.$router.push(url)
      },
      jumpData(cardInfo) {
        console.log(cardInfo.id)
        const url = `/pages/staff-data/staff-data?id=${cardInfo.id}`
        console.log(url)
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

  .list-box
    padding: 0 15px
    .box-top
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
