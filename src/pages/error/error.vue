<template>
  <error-page :showBgnull="showBgnull" :showImagSta="key"></error-page>
</template>

<script type="text/ecmascript-6">
  /**
   * 异常页面进入时要带参数key过来 0是报错，1是升级中
   * {
   *  key: 0
   * }
   */
  import ErrorPage from 'components/error-page/error-page'
  import wx from 'wx'

  const CODE = ['报错', '升级中']
  export default {
    data () {
      return {
        showBgnull: true,
        key: 0
      }
    },
    components: {
      ErrorPage
    },
    beforeMount () {
      if (this.$root.$mp.query.key) {
        let key = this.$root.$mp.query.key
        this.key = key * 1 === 404 ? 0 : 1
      }
      wx.setNavigationBarTitle({title: CODE[this.key]})
    },
    mounted () {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
