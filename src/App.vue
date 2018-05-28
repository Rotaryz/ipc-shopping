<script>
  import { ROLE, SHOP_HELPER } from 'common/js/contants'
  import { mapMutations } from 'vuex'
  import { baseURL } from 'api/config'
  import wx from 'wx'
  import * as wechat from 'common/js/wechat'

  export default {
    mpType: 'app',
    data () {
      return {
        lastToken: null,
        lastMerchantId: null,
        lastEntryRole: null,
        token: null,
        merchantId: null,
        entryRole: null,
        add: null, // 二维码添加员工,
        scene: null // 场景值
      }
    },
    created () {
    },
    mounted () {
    },
    onLaunch () {
    },
    onShow () {
      this._saveCode()
      this._exchangeInfo()
      this._checkStatus()
    },
    onHide () {
    },
    methods: {
      ...mapMutations({saveRoleSync: 'ROLE_TYPE'}),
      // 获取上次进入的信息
      _getLastInfo () {
        this.lastToken = wx.getStorageSync('token')
        this.lastMerchantId = wx.getStorageSync('merchantId')
        this.lastEntryRole = wx.getStorageSync('userType')
      },
      // 设置当前信息
      _setCurrentInfo () {
        const options = this.$root.$mp.appOptions
        const query = options.query
        this.token = query.token || this.lastToken
        this.merchantId = query.merchantId || this.lastMerchantId
        this.entryRole = query.entryRole || this.lastEntryRole || ROLE.STAFF_ID
        this.add = query.add// 是否申请员工
        this.scene = options.scene * 1
      },
      // 保存信息
      _saveInfo () {
        this.token && wx.setStorageSync('token', this.token)
        this.merchantId && wx.setStorageSync('merchantId', this.merchantId)
        this.entryRole && wx.setStorageSync('userType', this.entryRole)
        this.scene && wx.setStorageSync('scene', this.scene)
        this.saveRoleSync(this.entryRole)
      },
      // 保存code
      _saveCode () {
        wechat.login()
          .then(res => {
            let code = res.code
            wx.setStorageSync('code', code)
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 交换数据
      _exchangeInfo () {
        this._getLastInfo()
        this._setCurrentInfo()
        this._saveInfo()
      },
      // 分流
      _checkStatus () {
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
        // 是否申请进入
        if (this.add * 1 === 1) {
          let url = `/pages/login/login?add=${this.add}`
          this.$router.replace(url)
          return
        }
        // 模板消息
        if (this.scene === 1014) {
          let url = this.$root.$mp.query.url
          console.log(url, '++++++++-----------')
          this.$router.replace(url)
        }
        // 打印版本号
        console.info(baseURL.jumpVersion)
      },
      // 分流
      _switchPage () {
        switch (this.entryRole) {
          case ROLE.STAFF_ID : {
            let url = `/pages/login/login`
            this.$router.replace(url)
            break
          }
          case ROLE.UNION_ID :
          case ROLE.SHOP_ID : {
            this._backToB()
            break
          }
          default:
            break
        }
      },
      // 返回B端
      _backToB () {
        let appId = SHOP_HELPER.APPID
        let path = SHOP_HELPER.PATH
        wx.navigateToMiniProgram({
          appId: appId,
          path: path,
          extraData: {},
          envVersion: baseURL.jumpVersion,
          success (res) {
            // 打开成功
            console.info(res)
          }
        })
      },
      // 检查版本
      _chekSDK () {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
</style>
