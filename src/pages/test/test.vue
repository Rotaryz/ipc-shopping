<template>
  <div class="test">
    <div>测试页面</div>
    路径:
    <div class="path">{{pathTxt}}</div>
    商家id:<input class="t-input" type="text" @input="inputHandler" id="merchant" placeholder="请输入">
    <div @tap="_goToIpc" class="btn">员工去异业联盟</div>
    <div class="mar"></div>
    路径:
    <div class="path">{{pathTxt2}}</div>
    商家id:<input class="t-input" type="text" @input="inputHandler" id="m-id" placeholder="请输入">
    员工id:<input class="t-input" type="text" @input="inputHandler" id="e-id" placeholder="请输入">
    活动id:<input class="t-input" type="text" @input="inputHandler" id="a-id" placeholder="请输入">
    <div @tap="_goToC" class="btn">去C端购买</div>
  </div>

</template>

<script type="text/ecmascript-6">
  import wx from 'wx'
  import { baseURL } from 'api/config'
  import { ROLE } from 'common/js/contants'

  export default {
    data () {
      return {
        merchantId: wx.getStorageSync('merchantId'),
        eId: 0,
        activeId: 0
      }
    },
    methods: {
      inputHandler (e) {
        let id = e.target.id
        let val = e.target.value
        switch (id) {
          case 'merchant': {
            this.merchantId = val
            break
          }
          case 'm-id': {
            this.merchantId = val
            break
          }
          case 'e-id': {
            this.eId = val
            break
          }
          case 'a-id': {
            this.activeId = val
            break
          }
        }
      },
      _goToIpc () {
        wx.setStorageSync('merchantId', this.merchantId)
        wx.setStorageSync('userType', ROLE.STAFF_ID)
        this.$router.back()
      },
      _goToC () {
        let appId = `wxa721ed0b76403077`
        let path = `pages/activity/activity?m=${this.merchantId}&e=${this.eId}&a=${this.activeId}&type=y`
        wx.navigateToMiniProgram({
          appId,
          path,
          extraData: {},
          envVersion: baseURL.jumpVersion,
          success (res) {
            // 打开成功
            console.log(res)
          }
        })
      }
    },
    computed: {
      pathTxt () {
        return `pages/home/home?entryRole=${ROLE.STAFF_ID}&merchantId=${this.merchantId}`
      },
      pathTxt2 () {
        return `pages/activity-detail/activity-detail?m=${this.merchantId}&e=${this.eId}&a=${this.activeId}`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .test
    position: fixed
    top: 0
    left: 0
    right: 0
    min-height: 300px
    background-color: $color-cut-line-ed
    z-index: 99
    font-size: $font-size-medium
    font-family: $font-family-light
    layout()
    .mar
      height: 50px
    .btn
      normal-button-default()
</style>
