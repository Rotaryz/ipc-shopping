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
    <toast ref="toast"></toast>
    <audit-msg></audit-msg>
  </div>
</template>

<script type="text/ecmascript-6">
  import Toast from 'components/toast/toast'
  import api from 'api'
  import { baseURL, ERR_OK, TOKEN_OUT } from 'api/config'
  import * as wechat from 'common/js/wechat'
  import wx from 'wx'
  import { mapActions, mapMutations } from 'vuex'
  import { ROLE } from 'common/js/contants'
  import AuditMsg from 'components/audit-msg/audit-msg'

  console.info(baseURL.jumpVersion)
  export default {
    data () {
      return {
        authorizationCount: 1,
        entryRole: ROLE.STAFF_ID
      }
    },
    beforeCreate () {
    },
    created () {
    },
    onShow () {
      this._init()
    },
    beforeMount () {
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      ...mapActions(['saveRole']),
      ...mapMutations({saveRoleSync: 'ROLE_TYPE'}),
      // 微信获取用户信息btn
      wxGetUserInfo (event) {
        const e = event.mp
        if (e.detail.errMsg !== 'getUserInfo:ok') {
          return
        }
        const code = wx.getStorageSync('code')
        const data = {
          code,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData
        }
        this._getToken(data)
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
      // 获取token
      _getToken (data) {
        this.authorizationCount++
        api.userAuthorise(data)
          .then(Json => {
            if (Json.error !== ERR_OK && this.authorizationCount <= 5) {
              return this._getToken(data)
            } else if (Json.error !== ERR_OK && this.authorizationCount > 5) {
              this.authorizationCount = 1
              return this.$refs.toast.show('登录失败,请重新登录.')
            }
            this.authorizationCount = 1
            const res = Json.data
            let token = res.access_token
            if (token) {
              // const merchantId = this.$root.$mp.query.merchantId
              // wx.setStorageSync('merchantId', merchantId)
              wx.setStorageSync('token', token)
              wx.setStorageSync('userType', ROLE.STAFF_ID)
              this.saveRoleSync(ROLE.STAFF_ID)
              this._navTo()
            }
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 页面路由
      _navTo () {
        if (this.entryRole === ROLE.STAFF_ID) {
          this._rqCustomerStatus()
            .then(json => {
              wechat.hideLoading()
              // let status = json.data.status
              console.log(json)
            })
        } else {
          const url = `/pages/home/home`
          this.$router.replace(url)
        }
      },
      // 初始化
      _init () {
        let resCode = this.$root.$mp.query.resCode * 1
        if (resCode === TOKEN_OUT) return
        this._getCode()
        this._checkRole()
        this._work()
        // let token = this.$root.$mp.query.token
        // // 伪代码start
        // token = ROLE.testToken
        // wx.setStorageSync('token', token)
        // // 伪代码end
        // if (!token) return
        // this._checkRole(token)
        // this._navTo()
      },
      // 检查角色
      _checkRole () {
        const entryRole = this.$root.$mp.query.entryRole
        if (entryRole) {
          this.entryRole = entryRole
          this.saveRoleSync(entryRole)
        }
        wx.setStorageSync('userType', this.entryRole)
      },
      // 工作
      _work () {
        const merchantId = this.$root.$mp.query.merchantId
        wx.setStorageSync('merchantId', merchantId)
        let token = null
        if (this.entryRole === ROLE.STAFF_ID) {
          token = wx.getStorageSync('token')
        } else {
          token = this.$root.$mp.query.token
          token && wx.setStorageSync('token', token)
        }
        if (!token) return
        this._navTo()
      },
      _rqCustomerStatus () {
        return new Promise(resolve => {
          api.homeCustomerStatus()
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
      }
    },
    components: {
      Toast,
      AuditMsg
    }
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
          background: $color-wx-1a
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
            font-family: $font-family-regular


</style>



