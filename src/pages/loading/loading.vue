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
  import * as wechat from 'common/js/wechat'
  import wx from 'wx'

  console.info(api.jumpVersion)

  export default {
    created () {
      console.log(0)
    },
    onShow () {
      console.log('onshow')
    },
    beforeMount () {
      console.log(1)
    },
    mounted () {
      console.log(2)
      setTimeout(() => {
        this._navTo()
      }, 3000)
    },
    beforeDestroy () {
      console.log(3)
    },
    methods: {
      // 微信获取用户信息btn
      wxGetUserInfo (event) {
        const e = event.mp
        console.log(222)
        if (e.detail.errMsg !== 'getUserInfo:ok') {
          return
        }
        this._getCode(e)
      },
      // 获取临时登录凭证code
      _getCode (e) {
        wechat.login()
          .then(code => {
            const wxUser = e.detail
            const data = {
              code,
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
      _getToken (data) {
        api.userAuthorise(data)
          .then(Json => {
            wechat.hideLoading()
            if (Json.error !== api.ERR_OK) {
              return ''
            }
            const res = Json.data
            let token = res.jk_token
            if (token) {
              wx.setStorageSync('token', token)
              // await this.$getUserInfo(true)
              this._navTo()
            }
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 页面路由
      _navTo () {
        const url = `/pages/home/home`
        this.$router.push(url)
      },
      // 初始化
      _init () {
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



