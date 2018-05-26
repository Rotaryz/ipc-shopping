<template>
  <div class="code-add">
    <div class="code-center">
      <div class="code-title">欢迎你加入“异业联盟卡活动”</div>
      <div class="code-msg">享受“一次努力，赚两份钱！”</div>
      <div class="code-img">
        <img class="max-img" :src="maxImg" alt="" mode="widthFix">
      </div>
      <div class="code-hint">扫码绑定加入{{shopName}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as wechat from 'common/js/wechat'
  import api from 'api'

  export default {
    data () {
      return {
        maxImg: '',
        shopName: ''
      }
    },
    mounted () {
      this.getInfo()
      console.log(this.$route.query.key)
      console.log(`--${this.compName}--mounted`)
    },
    beforeUpdate () {
      console.log(`--${this.compName}--beforeUpdate`)
    },
    methods: {
      getInfo () {
        this._empAddCode()
      },
      async _empAddCode () {
        let data = {}
        api.empAddCode(data).then(res => {
          console.log(res)
          this.maxImg = res.data.url
          this.shopName = res.data.shop_name
        }).catch(e => {
          console.log(e)
        })
        // this.maxImg = 'https://img.jerryf.cn/static_files/mina_qrcodes/forever/2018/05/14/16/1526287427cO5RXk8E.png'
        wechat.hideLoading()
      }
    },
    computed: {
      ss () {
        console.log('...')
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'
  .code-add
    height: 100vh
    width: 100vw
    background-color: $color-main-1a
    /*padding-top: 35px*/
    display: flex
    flex-direction: column
    .code-center
      background-color: $color-background-ff
      height: 428px
      margin: 35px 22px
      border-radius: 3px
      text-align: center
      display: flex
      flex-direction: column
      .code-title
        font-family: $font-family-light
        font-size: $font-size-medium
        color: $color-text-2d
        line-height: 28px
        margin-top: 30px
      .code-msg
        font-family: $font-family-meddle
        font-size: $font-size-large
        color: $color-text-2d
        line-height: 32px
      .code-img
        width: 230px
        margin: 20px auto 0px
        // border: 1px solid $color-text-a4
        .max-img
          width: 100%

      .code-hint
        font-family: $font-family-light
        font-size: $font-size-medium
        color: $color-text-a4
        line-height: 28px
</style>
