<template>
  <div class="content">
    <section class="bc-box">
      <img class="bc-img" src="/static/img/login-bg.jpg" mode="widthFix"/>
    </section>
    <section class="cover">
      <article class="cover-top">
        <div class="cover-top-img"></div>
        <div class="cover-top-txt">更多的了解你</div>
        <div class="cover-top-txt">是为了更好的服务你</div>
      </article>
      <article class="btn-box">
        <button open-type="getUserInfo" @getuserinfo="wxGetUserInfo" lang="zh_CN" class="btn">
          <div class="wx-img"></div>
          <div class="wx-login-txt">微信快捷登录</div>
        </button>
      </article>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import {baseURL, ERR_OK, TOKEN_OUT} from 'api/config'
  import * as wechat from 'common/js/wechat'
  import wx from 'wx'
  import {mapActions, mapMutations} from 'vuex'
  import {ROLE} from 'common/js/contants'

  console.info(baseURL.jumpVersion)

  export default {
    beforeCreate() {
    },
    created() {
      // console.log(0, wx)
    },
    onShow() {
      this._init()
      // console.log(this.$root.$mp)
      // this._navTo()
      // const url = `/pages/loading/loading?type=tokenOut`
      // wx.reLaunch({url})
      // console.log('onshow')
    },
    beforeMount() {
      // this._init()
      // console.log(1, wx)
    },
    mounted() {
    },
    beforeDestroy() {
      // console.log(3)
    },
    methods: {
      ...mapActions(['saveRole']),
      ...mapMutations({saveRoleSync: 'ROLE_TYPE'}),
      // 微信获取用户信息btn
      wxGetUserInfo(event) {
        const e = event.mp
        if (e.detail.errMsg !== 'getUserInfo:ok') {
          return
        }
        this._getCode(e)
      },
      // 获取临时登录凭证code
      _getCode(e) {
        wechat.login()
          .then(res => {
            const wxUser = e.detail
            const data = {
              code: res.code,
              iv: wxUser.iv,
              encryptedData: wxUser.encryptedData
            }
            this._getToken(data)
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 获取token
      _getToken(data) {
        api.userAuthorise(data)
          .then(Json => {
            wechat.hideLoading()
            if (Json.error !== ERR_OK) {
              return ''
            }
            const res = Json.data
            let token = res.access_token
            if (token) {
              wx.setStorageSync('token', token)
              this._checkRole()
              // await this.$getUserInfo(true)
              this._navTo()
            }
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 页面路由
      _navTo() {
        const url = `/pages/home/home?type=obj`
        this.$router.replace(url)
      },
      // 初始化
      _init() {
        let token = wx.getStorageSync('token')
        let resCode = this.$root.$mp.query.resCode
        if (!token) return
        if (resCode === TOKEN_OUT) return
        this._checkRole()
        this._navTo()
      },
      // 检查角色
      _checkRole() {
        const entryRole = this.$root.$mp.query.entryRole || ROLE.STAFF_ID
        const merchantId = this.$root.$mp.query.merchantId // 员工历史记录栏进来没有商家ID
        wx.setStorageSync('merchantId', merchantId)
        wx.setStorageSync('userType', entryRole)
        this.saveRoleSync(entryRole)
      }
    },
    computed: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'

  .content
    height: 100vh
    width: 100vw
    overflow-y: hidden
    box-sizing: border-box
    background: $color-background-ff
    position: relative
    .bc-box
      position: absolute
      width: 100%
      height: 100%
      overflow: hidden
      .bc-img
        position: absolute
        width: 100%
    .cover
      position: absolute
      width: 100%
      height: 100%
      background: rgba(0, 0, 0, 0.7)
      .cover-top
        padding-top: 32vw
        display: flex
        flex-direction: column
        align-items: center
        .cover-top-img
          width: 44.75px
          height: 47.4px
          margin-bottom: 14px
          background-image: url("./logo-white@2x.png")
          background-position: contain
          background-size: cover
          background-repeat: no-repeat
        .cover-top-txt
          font-size: $font-size-medium
          color: $color-background-ff
          font-family: PingFangSC-Regular
          line-height: 21px
      .btn-box
        position: absolute
        left: 0
        bottom: 30px
        width: 100%
        height: 12vw
        box-sizing: border-box
        padding: 0 12px
        .btn
          width: 100%
          background: #1AC521
          height: 100%
          border-radius: 4px
          display: flex
          align-items: center
          justify-content: center
          .wx-img
            width: 24px
            height: 19.5px
            margin-right: 5.5px
            background-image: url("./logo-wechat@2x.png")
            background-position: center
            background-size: cover
            background-repeat: no-repeat
          .wx-login-txt
            font-size: $font-size-medium-x
            color: $color-background-ff
            font-family: PingFangSC-Regular
</style>



