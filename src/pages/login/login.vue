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
        <button class="btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="wxGetUserInfo">
          <div class="wx-img"></div>
          <div class="wx-login-txt">微信快捷登录</div>
        </button>
      </article>
    </section>
    <toast ref="toast"></toast>
    <navigator url="/pages/test/test" class="test-btn">测试专用</navigator>
  </div>
</template>

<script type="text/ecmascript-6">
  import Toast from 'components/toast/toast'
  import api from 'api'
  import { baseURL, ERR_OK } from 'api/config'
  import * as wechat from 'common/js/wechat'
  import wx from 'wx'
  import { mapActions, mapMutations } from 'vuex'
  import { ROLE } from 'common/js/contants'

  console.info(baseURL.jumpVersion)
  export default {
    data () {
      return {
        authorizationCount: 1,
        entryRole: ROLE.STAFF_ID,
        status: -1,
        userInfo: null,
        add: null // 是否添加员工
      }
    },
    onShow () {
      console.log(1)
      this._getCode()
      wx.setStorageSync('userType', ROLE.STAFF_ID)
      this.saveRoleSync(ROLE.STAFF_ID)
      this.add = this.$root.$mp.appOptions.query.add
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
        this.userInfo = e
        if (this.authorizationCount === 0) {
          this._getCode()
            .then(() => {
              this._getToken()
            })
        } else {
          this._getToken()
        }
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
      _getToken () {
        const code = wx.getStorageSync('code')
        const data = {
          code,
          iv: this.userInfo.detail.iv,
          encryptedData: this.userInfo.detail.encryptedData
        }
        this.authorizationCount++
        api.userAuthorise(data)
          .then(Json => {
            if (Json.error !== ERR_OK && this.authorizationCount <= 5) {
              return this._getToken()
            } else if (Json.error !== ERR_OK && this.authorizationCount > 5) {
              this.authorizationCount = 0
              return this.$refs.toast.show('登录失败,请重新登录.')
            }
            this.authorizationCount = 0
            const res = Json.data
            let token = res.access_token
            if (token) {
              wechat.hideLoading()
              wx.setStorageSync('token', token)
              // 扫描进来调用绑定商家接口
              if (this.add * 1 === 1) {
                api.homeEmployeeApply()
                  .then(json => {
                    if (json.error !== ERR_OK) {
                      return this.$refs.toast.show('绑定商家失败')
                    } else {
                      this._navTo()
                    }
                  })
                  .catch(err => {
                    console.info(err)
                  })
              } else {
                this._navTo()
              }
            } else {
              this.$refs.toast.show('登录失败,请重新登录.')
            }
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 页面路由
      _navTo () {
        const url = `/pages/home/home`
        this.$router.replace(url)
      }
    },
    components: {
      Toast
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'

  .test-btn
    position: fixed
    top: 0
    left: 0
    right: 0
    normal-button-default()

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
        height: 100%
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



