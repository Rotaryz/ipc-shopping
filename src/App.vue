<script>
  import {ROLE, SHOP_HELPER} from 'common/js/contants'
  import {mapMutations} from 'vuex'
  import {TOKEN_OUT, baseURL} from 'api/config'
  import wx from 'wx'
  import * as wechat from 'common/js/wechat'

  export default {
    mpType: 'app',
    data: {
      lastToken: null,
      lastMerchantId: null,
      lastEntryRole: null,
      token: null,
      merchantId: null,
      entryRole: null,
      tokenOut: null,
      isApply: null
    },
    created() {
    },
    mounted() {
    },
    onShow() {
      this._init()
    },
    onHide() {
    },
    methods: {
      ...mapMutations({saveRoleSync: 'ROLE_TYPE'}),
      // 交换数据
      _exchangeInfo() {
        // 临时存储上次数据
        this.lastToken = wx.getStorageSync('token')
        this.lastMerchantId = wx.getStorageSync('merchantId')
        this.lastEntryRole = wx.getStorageSync('userType')
        // 根据不同来源获取
        const query = this.$root.$mp.appOptions.query
        this.token = query.token || this.lastToken
        this.merchantId = query.merchantId || this.lastMerchantId
        this.entryRole = query.entryRole || this.lastEntryRole || ROLE.STAFF_ID
        this.tokenOut = query.resCode
        this.isApply = query.isApply // 是否申请员工
        // 存储数据
        wx.setStorageSync('token', this.token)
        wx.setStorageSync('merchantId', this.merchantId)
        wx.setStorageSync('userType', this.entryRole)
        this.saveRoleSync(this.entryRole)
        wechat.login()
          .then(res => {
            let code = res.code
            wx.setStorageSync('code', code)
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 分流
      _checkStatus() {
        // token检查
        if (!this.token) {
          this._switchPage()
          return
        }
        // 检查商家ID
        if (this.merchantId !== this.lastMerchantId && this.entryRole === ROLE.STAFF_ID) {
          let url = `/pages/login/login`
          this.$router.replace(url)
          return
        }
        // 检查token是否过期
        if (this.tokenOut * 1 === TOKEN_OUT) {
          this._switchPage()
          return
        }
        // 是否申请进入
        if (this.isApply * 1 === 1) {
          let url = `/pages/login/login`
          this.$router.replace(url)
          return
        }
        // 跳转首页
        let url = `/pages/home/home`
        this.$router.replace(url)
      },
      // 分流
      _switchPage() {
        switch (this.entryRole) {
          case ROLE.STAFF_ID : {
            let url = `/pages/login/login`
            return this.$router.replace(url)
          }
          case ROLE.UNION_ID :
          case ROLE.SHOP_ID : {
            return this._backToB()
          }
        }
      },
      // 返回B端
      _backToB() {
        let appId = SHOP_HELPER.APPID
        let path = SHOP_HELPER.PATH
        wx.navigateToMiniProgram({
          appId: appId,
          path: path,
          extraData: {},
          envVersion: baseURL.jumpVersion,
          success(res) {
            // 打开成功
            console.log(res)
          }
        })
      },
      // 检查版本
      _chekSDK() {
      },
      // 初始化
      _init() {
        this._exchangeInfo()
        this._checkStatus()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
</style>
