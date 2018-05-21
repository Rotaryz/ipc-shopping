<template>
  <div class="card-box">
    <img :src="image + '/defaults/ipc-shopping/aliance/pic-activity_er@2x.png'" class="card-img" v-if="image" mode="widthFix">
    <img :src="codeImage" class="card-code" v-if="image" mode="widthFix">
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import {baseURL, ERR_OK} from 'api/config'
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
        codeImage: '',
        acitiveId: 1
      }
    },
    mounted() {
      this.acitiveId = this.$root.$mp.query.id
      this.getStaffCode(this.acitiveId)
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
        this.currentRole = ROLE.STAFF_ID
        // wx.setStorageSync('merchantId', merchantId)
        wx.setStorageSync('userType', ROLE.STAFF_ID)
        console.log(this.currentRole)
      },
      getStaffCode() {
        api.merStaffActiveQrcode().then(res => {
          if (res.error === ERR_OK) {
            console.log(res)
            this.codeImage = res.data.qrcode_image
          } else {
            this.$ref.toast.show(res.message)
          }
        })
        wechat.hideLoading()
      }
    },
    components: {
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .card-box
    position: relative
    .card-img
      display: block
      width: 100%
    .card-code
      position: absolute
      bottom: 10.3%
      left: 9%
      display: block
      width: 38%
</style>
