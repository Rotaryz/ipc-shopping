<template>
  <article class="home">
    <header class="active">
      <article class="swiper-box">
        <section class="s-b-box">
          <section class="bg-box">
          </section>
          <swiper class="home-swiper" @change="swiperChange" :current="sliderCurrent">
            <block v-for="(item, index) in activeList" :key="index">
              <swiper-item class="home-swiper-item">
                <h-slider-item :item="item" @lookTotalHandler="lookTotalHandler"></h-slider-item>
              </swiper-item>
            </block>
          </swiper>
        </section>
      </article>
      <ul class="swiper-dots-box">
        <li :class="['dot',dotCurrent===index?'dot-hit':'',dotStyle]" v-for="(item,index) in activeList" :key="index"></li>
      </ul>
    </header>
    <form @submit="formSubmit" report-submit='true'>
      <label class="tab-leader" v-if="currentRole===ROLE.UNION_ID" for="btn-form-id">
        <nav class="t-l-nav" :style="leaderImg" @tap="toUnion">联盟管理</nav>
        <nav class="t-l-nav" :style="activeImg" @tap="toShop">活动管理</nav>
        <nav class="t-l-nav" :style="employeeImg" @tap="toEmployee">员工管理</nav>
        <nav class="t-l-nav" :style="incomeImg" @tap="toAsset">收入/提现</nav>
      </label>
      <label class="tab-merchant" v-if="currentRole===ROLE.SHOP_ID" for="btn-form-id">
        <section class="t-m-ad" v-if="noticeList.length>0" @tap="watchActiveHandler">
          <div class="title">公告</div>
          <div class="content">异业联盟卡活动正在等你报名正在等你…</div>
          <div class="watch-btn">查看</div>
        </section>
        <nav class="t-l-nav" :style="activeImg" @tap="toShop">活动管理</nav>
        <nav class="t-l-nav" :style="employeeImg" @tap="toEmployee">员工管理</nav>
        <nav class="t-l-nav" :style="incomeImg" @tap="toAsset">收入/提现</nav>
      </label>
      <label class="tab-employee" v-if="currentRole===ROLE.STAFF_ID" for="btn-form-id">
        <section class="t-e-sales">
          <div class="title">销卡对比</div>
          <article class="content-box">
            <scroll-view class="content" scroll-y="true" v-if="employeeList.length>0">
              <ul class="c-holder">
                <li class="emp-item" v-for="(item,index) in employeeList" :key="index">
                  <article class="emp-item-box">
                    <section class="icon">
                      <img class="icon-pic" :src="item.avatarUrl">
                    </section>
                    <section class="progress">
                      <div class="name-bar">
                        <div class="name">{{item.nickName}}</div>
                        <div class="sales">{{item.saleCount}}/{{item.initStock}}</div>
                      </div>
                      <article class="p-box">
                        <div class="p-pro" :style="'width:'+ item.percentage +'%'"></div>
                      </article>
                    </section>
                    <section class="number">
                      <div class="n-title">销卡</div>
                      <div>80</div>
                      <div>%</div>
                    </section>
                  </article>
                </li>
              </ul>
            </scroll-view>
            <section class="content" v-else-if="employeeList.length<=0">
              <div class="staff-empty">暂无数据～</div>
            </section>
          </article>
        </section>
        <nav class="t-l-nav" :style="activeImg" @tap="toShop">活动管理</nav>
        <nav class="t-l-nav" :style="incomeImg" @tap="toAsset">收入/提现</nav>
      </label>
      <button id="btn-form-id" class="btn-form-id" form-type="submit"></button>
    </form>
    <audit-msg @confirmHandler="staffConfirmHandler" :flag="status"></audit-msg>
  </article>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import { baseURL } from 'api/config'
  import { mapGetters, mapMutations } from 'vuex'
  import { ROLE, SHOP_HELPER } from 'common/js/contants'
  import HSliderItem from 'components/hSlider-item/hSlider-item'
  import wx from 'wx'
  import { ERR_OK, TOKEN_OUT } from '../../api/config'
  import * as wechat from 'common/js/wechat'
  import AuditMsg from 'components/audit-msg/audit-msg'
  import Toast from 'components/toast/toast'

  const ACTIVE_DEF = [{
    title: '异业联盟卡',
    percent: 0,
    isOnline: false,
    saleCard: {
      title: '售卡数',
      number: 0
    },
    currentCard: {
      title: '本店核销数',
      number: 0
    },
    income: {
      title: '员工收入',
      number: 0
    },
    otherCard: {
      title: '异业核销数',
      number: 0
    }
  }]

  export default {
    data () {
      return {
        ROLE, // 角色定义常量值
        currentRole: null, // 当前角色
        imageUri: baseURL.image, // 图片路径
        activeList: [...ACTIVE_DEF, ...ACTIVE_DEF], // 活动列表
        employeeList: [], // 员工列表
        dotCurrent: 0, // dot指示器下标
        sliderCurrent: 0, // swiper指示器下标
        noticeList: [], // 公告列表
        currentActiveId: null, // 当前活动id
        entryRole: ROLE.STAFF_ID, // 进入来的角色
        // onShowCount: 0, // 首页on-show的次数
        currentToken: null, // 当前token
        status: -1, // 员工状态
        backCount: 0, // 回退b端的次数,
        lastEntryRole: null
      }
    },
    created () {
    },
    onShow () {
      this._login()
      console.log(this.$root.$mp, '++++++++++++++++++++++++')
    },
    beforeMount () {
    },
    mounted () {
    },
    methods: {
      ...mapMutations({saveRoleSync: 'ROLE_TYPE'}),
      ...mapGetters(['role']),
      // 登录验证
      _login () {
        wechat.showLoading()
        wx.setStorageSync('scene', this.$root.$mp.appOptions.scene)
        this._loginInit()
      },
      // 上传form-id
      formSubmit (e) {
        let formId = e.mp.detail.formId
        let data = {'form_ids': [formId]}
        api.homeCollectFormId(data)
      },
      // 从消息模板来的数据
      _getFromMsgTpl () {
        if (+this.$root.$mp.appOptions.scene === 1014) {
          let id = this.$root.$mp.query.id
          id && (this.currentActiveId = id)
        }
      },
      // 初始化
      _loginInit () {
        this._getMerchantId()
        this._checkRole()
        if (this._isTokenOut()) return
        this._getToken()
        if (!this.currentToken) return
        this._getCode()
          .then(() => {
            if (this.entryRole === ROLE.STAFF_ID) {
              this._rqCustomerStatus()
                .then(json => {
                  wechat.hideLoading()
                  let status = json.data.status
                  if (status === null || status === 'null') {
                    this.status = -1
                  } else {
                    this.status = status
                  }
                })
            } else {
              this._init()
            }
          })
      },
      // 员工点确定后操作
      staffConfirmHandler () {
        this._init()
      },
      // 检查角色
      _checkRole () {
        this.lastEntryRole = wx.getStorageSync('userType') || ROLE.STAFF_ID
        this.entryRole = this.lastEntryRole
        const entryRole = this.$root.$mp.query.entryRole
        entryRole && (this.entryRole = entryRole)
        this.saveRoleSync(this.entryRole)
        this.currentRole = this.entryRole
        wx.setStorageSync('userType', this.entryRole)
      },
      // 返回商家助手
      _backToB () {
        if (this.backCount > 0) return
        this.backCount++
        console.log('!!!!!!!!!!!!!!!!!!')
        wechat.showLoading()
        let appId = SHOP_HELPER.APPID
        let path = SHOP_HELPER.PATH
        wx.navigateToMiniProgram({
          appId: appId,
          path: path,
          extraData: {},
          envVersion: baseURL.jumpVersion,
          success (res) {
            // 打开成功
            console.log(res)
          }
        })
      },
      // 获取token
      _getToken () {
        let token = null
        if (this.entryRole === ROLE.STAFF_ID) {
          token = wx.getStorageSync('token')
          if (!token && this.lastEntryRole === ROLE.STAFF_ID) {
            let url = `/pages/loading/loading`
            this.$router.replace(url)
          } else if (!token) {
            this._backToB()
          }
        } else {
          // token = wx.getStorageSync('token')
          token = this.$root.$mp.query.token
          if (!token) {
            this._backToB()
          }
        }
        this.currentToken = token
        token && wx.setStorageSync('token', token)
      },
      // 检查token是否过期
      _isTokenOut () {
        let resCode = this.$root.$mp.query.resCode * 1
        // 盟主回退B端
        if (resCode === TOKEN_OUT && this.currentRole === ROLE.STAFF_ID) {
          let url = `/pages/loading/loading`
          this.$router.replace(url)
          return true
        } else if (resCode === TOKEN_OUT) {
          this._backToB()
          return true
        }
        return false
      },
      // 获取临时登录凭证code
      _getCode () {
        return new Promise(resolve => {
          wechat.login()
            .then(res => {
              wx.setStorageSync('code', res.code)
              resolve(res.code)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      // 获取商家ID
      _getMerchantId () {
        const merchantId = this.$root.$mp.query.merchantId
        merchantId && wx.setStorageSync('merchantId', merchantId)
      },
      // 检查员工身份状态
      _rqCustomerStatus () {
        return new Promise(resolve => {
          api.homeCustomerStatus()
            .then(json => {
              if (json.error !== ERR_OK) {
                if (json.message === '凭证已失效') {
                  let url = `/pages/loading/loading`
                  this.$router.replace(url)
                }
                return false
              }
              wechat.hideLoading()
              resolve(json)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      // 项目初始化
      _init () {
        // console.log(this.onShowCount)
        // if (this.onShowCount > 0) return
        // this.onShowCount++
        let code = wx.getStorageSync('code')
        this.setNavTitle({wx_code: code})
        switch (this.currentRole) {
          case ROLE.UNION_ID: {
            this._rqGetUnionAll()
              .then(json => {
                let list = this._formatInfoData(json)
                if (list.length > 0) {
                  this.activeList = list
                  this.currentActiveId = this.activeList[this.dotCurrent].activeId
                  this._getFromMsgTpl()
                }
              })
            break
          }
          case ROLE.SHOP_ID: {
            this._rqGetShopAll()
              .then(json => {
                let list = this._formatInfoData(json)
                if (list.length > 0) {
                  this.activeList = list
                  this.currentActiveId = this.activeList[this.dotCurrent].activeId
                  this._getFromMsgTpl()
                }
              })
            this._rqGetNotice()
              .then(json => {
                let arr = json.data
                this.noticeList = arr
              })
            break
          }
          case ROLE.STAFF_ID: {
            this._rqGetStaffAll()
              .then(json => {
                let list = this._formatInfoData(json)
                if (list.length > 0) {
                  this.activeList = list
                  this.currentActiveId = this.activeList[this.dotCurrent].activeId
                  this._getFromMsgTpl()
                  this._getStaffSale()
                }
              })
            break
          }
        }
      },
      // 保存标题
      setNavTitle (data) {
        this._rqGetGolbalData(data)
          .then(json => {
            let title = json.data.merchant.shop_name
            this.currentRole === ROLE.STAFF_ID && (title = '员工')
            wx.setNavigationBarTitle({title})
          })
      },
      // 获取盟主所有活动信息
      _rqGetUnionAll () {
        return new Promise(resolve => {
          api.homeGetUnion()
            .then(json => {
              if (json.error !== ERR_OK) {
                return false
              }
              wechat.hideLoading()
              resolve(json)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      // 格式化公告
      _formatNotice (json) {
        let arr = []
        let res = json.data
        res.map(item => {
        })
        return arr
      },
      // 格式化活动信息
      _formatInfoData (json) {
        let arr = []
        let res = json.data
        res.map(item => {
          arr.push({
            activeId: item.activity_alliance_id,
            title: item.activity_name,
            percent: item.percentage * 100,
            isOnline: item.is_online,
            saleCard: {
              title: '售卡数',
              number: item.sale_count
            },
            currentCard: {
              title: '本店核销数',
              number: item.self_verification
            },
            income: {
              title: '员工收入',
              number: item.commission
            },
            otherCard: {
              title: '异业核销数',
              number: item.other_verification
            }
          })
        })
        return arr
      },
      // 请求商家信息
      _rqGetShopAll () {
        return new Promise(resolve => {
          api.homeGetShop()
            .then(json => {
              if (json.error !== ERR_OK) {
                return false
              }
              wechat.hideLoading()
              resolve(json)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      // 请求员工信息
      _rqGetStaffAll () {
        return new Promise(resolve => {
          api.homeGetStaff()
            .then(json => {
              if (json.error !== ERR_OK) {
                return false
              }
              wechat.hideLoading()
              resolve(json)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      // 请求公告信息
      _rqGetNotice () {
        return new Promise(resolve => {
          api.homeGetNotice()
            .then(json => {
              if (json.error !== ERR_OK) {
                return false
              }
              wechat.hideLoading()
              resolve(json)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      // 请求员工销卡对比信息
      _rqGetStaffSales (data) {
        return new Promise(resolve => {
          api.homeGetStaffSale(data)
            .then(json => {
              if (json.error !== ERR_OK) {
                return false
              }
              wechat.hideLoading()
              resolve(json)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      // 获取全局数据
      _rqGetGolbalData (data) {
        return new Promise(resolve => {
          api.homeGetGlobalData(data)
            .then(json => {
              if (json.error !== ERR_OK) {
                return false
              }
              wechat.hideLoading()
              resolve(json)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      // 获取员工销卡比信息
      _getStaffSale () {
        if (this.currentRole !== ROLE.STAFF_ID) return
        let data = {activity_alliance_id: this.currentActiveId}
        this._rqGetStaffSales(data)
          .then(json => {
            let list = this._formatStaffData(json)
            this.employeeList = list
          })
      },
      // 格式化员工销卡比信息
      _formatStaffData (json) {
        let arr = []
        let res = json.data
        res.map(item => {
          arr.push({
            customerId: item.customer_id,
            avatarUrl: item.customer.avatar_url,
            nickName: item.customer.nickname,
            saleCount: item.sale_count,
            initStock: item.init_stock,
            percentage: item.percentage
          })
        })
        return arr
      },
      // 查看统计
      lookTotalHandler (obj) {
        let url = ''
        let id = obj.activeId
        switch (this.currentRole) {
          case ROLE.UNION_ID : {
            url = `/pages/leader-data/leader-data?id=${id}`
            break
          }
          case ROLE.SHOP_ID: {
            url = `/pages/merchant-data/merchant-data?id=${id}`
            break
          }
          case ROLE.STAFF_ID: {
            url = `/pages/staff-data/staff-data?id=${id}`
            break
          }
        }
        url && this.$router.push(url)
      },
      // 查看商家活动管理
      watchActiveHandler () {
        const url = `/pages/activity-manage/activity-manage`
        this.$router.push(url)
      },
      // swiper滑动块
      swiperChange (e) {
        let index = e.mp.detail.current
        this.dotCurrent = index
        this.sliderCurrent = index
        this.currentActiveId = this.activeList[this.dotCurrent].activeId
        this._getStaffSale()
      },
      // 去联盟管理
      toUnion () {
        const url = `/pages/union-manage/union-manage`
        this.$router.push(url)
      },
      // 去活动管理
      toShop () {
        let url = ``
        if (this.currentRole === ROLE.STAFF_ID) {
          url = `/pages/staff-activity/staff-activity`
        } else {
          url = `/pages/activity-manage/activity-manage`
        }
        this.$router.push(url)
      },
      // 去员工管理
      toEmployee () {
        const url = `/pages/employee/employee`
        this.$router.push(url)
      },
      // 去收入、提现
      toAsset () {
        const url = `/pages/asset/asset`
        this.$router.push(url)
      }
    },
    computed: {
      dotStyle () {
        return this.activeList.length <= 1 ? 'd-op' : ''
      },
      leaderImg () {
        return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_union@2x.png)` || ''
      },
      activeImg () {
        switch (this.currentRole) {
          case ROLE.UNION_ID: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_activity@2x.png)` || ''
          }
          case ROLE.SHOP_ID: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-shome_activity@2x.png)` || ''
          }
          case ROLE.STAFF_ID: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-yhome_activity@2x.png)` || ''
          }
          default: {
            return ''
          }
        }
      },
      employeeImg () {
        switch (this.currentRole) {
          case ROLE.UNION_ID: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_staff@2x.png)` || ''
          }
          case ROLE.SHOP_ID: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-shome_staff@2x.png)` || ''
          }
          default: {
            return ''
          }
        }
      },
      incomeImg () {
        switch (this.currentRole) {
          case ROLE.UNION_ID: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_income@2x.png)` || ''
          }
          case ROLE.SHOP_ID: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-shome_income@2x.png)` || ''
          }
          case ROLE.STAFF_ID: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-yhome_income@2x.png)` || ''
          }
          default: {
            return ''
          }
        }
      }
    },
    components: {
      HSliderItem,
      AuditMsg,
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  #btn-form-id
    position: absolute
    top: -100%
    opacity: 0

  .home
    min-height: 100vh
    background-color: $color-main-1a
    .active
      position: relative
    .swiper-box
      margin: 0 4%
      height: 0
      padding-top: 78.4%
      background: $color-assist-27
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
      border-radius: 3px
      position: relative
      .s-b-box
        position: absolute
        top: 0
        bottom: 0
        right: 0
        left: 0
        .bg-box
          position: absolute
          bottom: 0
          left: 0
          right: 0
          height: 27.3%
          background-image: url("./waves.svg")
          background-size: 100%
          background-repeat: no-repeat
          background-position: center bottom
        .home-swiper
          height: 100%
          width: 100%
          position: relative
          .home-swiper-item
            height: 100%
            width: 100%
            position: relative
    .swiper-dots-box
      margin-top: 4%
      layout(row)
      justify-content: center
      .dot
        margin: 0 2.5px
        width: 3px
        height: 3px
        border-radius: 50%
        background-color: $color-dot-4a
        transition: 0.3s all
        &.dot-hit
          width: 15px
          border-radius: 100px
          background-color: $color-dot-a7
        &.d-op
          opacity: 0

    .tab-leader
      position: relative
      padding: 8.26666% 4% 0
      layout(row)
      justify-content: space-between
      .t-l-nav
        padding: 8.845% 0
        width: 47.826086%
        background-size: 100%
        background-position: center center
        background-repeat: no-repeat
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-background-ff
        text-align: center
        border-radius: 3px
        &:nth-child(3), &:nth-child(4)
          margin-top: 4.133333%

    .tab-merchant
      position: relative
      padding: 4.8% 4% 0
      layout(row)
      justify-content: space-between
      .t-m-ad
        position: relative
        padding: 0 0.5px
        box-sizing: border-box
        width: 100%
        margin-bottom: 6.6666666666%
        layout(row, block, no-wrap)
        justify-content: space-between
        .title
          background: $color-assist-34
          border-radius: 3px
          width: 40.5px
          height: 21px
          font-family: $font-family-meddle
          font-size: $font-size-medium
          color: $color-background-ff
          text-align: center
          line-height: 21px
        .content
          flex: 1
          padding-left: 5px
          height: 21px
          font-family: $font-family-light
          font-size: $font-size-medium
          color: $color-background-ff
          line-height: 21px
          no-wrap()
        .watch-btn
          width: 47px
          height: 21px
          font-family: $font-family-light
          font-size: $font-size-small
          color: $color-assist-34
          text-align: right
          line-height: 21px
      .t-l-nav
        padding: 10.43478260869% 0 20.579710144927%
        width: 31.304347826086%
        background-size: 100% 100%
        background-position: center center
        background-repeat: no-repeat
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-background-ff
        text-align: center
        border-radius: 3px

    .tab-employee
      position: relative
      padding: 2.6666666666% 4% 0
      layout(row)
      justify-content: space-between
      .t-e-sales
        width: 100%
        box-sizing: border-box
        background: $color-assist-27
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
        border-radius: 3px
        margin-bottom: 4%
        .title
          padding: 0 4.34782608695%
          height: 45px
          line-height: 45px
          font-family: $font-family-regular
          font-size: $font-size-medium-x
          color: $color-background-ff
          cut-off-rule-bottom(4.34782608695%, 0, $color-row-line-3f)
        .content-box
          position: relative
          height: 0
          padding-top: 37.971014492753%
          .content
            position: absolute
            top: 0
            left: 0
            right: 0
            bottom: 0
            padding-bottom: 4.8%
            .c-holder
              position: relative
              padding-top: 3.7681159420289%
              overflow: hidden
              .emp-item
                position: relative
                height: 0
                padding-top: 6.9565217391304%
                margin-bottom: 3.9130434782608%
                &:last-child
                  margin-bottom: 0
                .emp-item-box
                  fill-box()
                  layout(row)
                  padding: 0 4.3478260869565%
                  justify-content: space-between
                  align-items: center
                  .icon
                    width: 24px
                    height: 24px
                    box-sizing: border-box
                    border-radius: 50%
                    border: 0.5px solid $color-cut-line-ff16
                    overflow: hidden
                    .icon-pic
                      width: 100%
                      height: 100%
                      border-radius: 50%
                  .progress
                    position: relative
                    flex: 1
                    padding: 0 24px 0 15px
                    layout()
                    justify-content: space-between
                    .name-bar
                      flex: 1
                      layout(row)
                      justify-content: space-between
                      align-items: center
                      .name
                        display: inline-block
                        font-family: $font-family-light
                        font-size: $font-size-small
                        color: $color-background-ff
                        text-indent: 1px
                      .sales
                        display: inline-block
                        font-family: $font-family-din
                        font-size: $font-size-small-s
                        color: $color-text-95
                    .p-box
                      height: 6px
                      background: $color-pro-bg-1f
                      border-radius: 100px
                      overflow: hidden
                      .p-pro
                        width: 0%
                        height: 100%
                        background-image: linear-gradient(-90deg, $color-assist-2a 0%, $color-assist-33 100%)
                        border-radius: 100px
                        transition: 0.3s all
                  .number
                    position: relative
                    layout(row, block, no-wrap)
                    align-items: center
                    font-family: $font-family-light
                    font-size: $font-size-small-s
                    color: $color-background-ff
                    div:last-child
                      font-size: $font-size-small-ss
                    div:nth-child(2)
                      font-family: $font-family-din
                      font-size: $font-size-large
            .staff-empty
              layout()
              height: 100%
              justify-content: center
              align-items: center
              font-family: $font-family-light
              font-size: $font-size-small
              color: $color-text-95
      .t-l-nav
        padding: 4.927536231884% 0
        width: 47.826086956521%
        background-size: 100%
        background-position: center center
        background-repeat: no-repeat
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-background-ff
        text-align: center
        border-radius: 3px
</style>
