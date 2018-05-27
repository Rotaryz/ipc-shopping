<template>
  <web-view src="{{webviewUrl}}"></web-view>
</template>

<script type="text/ecmascript-6">
  import {baseURL} from 'api/config'

  export default {
    data () {
      return {
        webviewUrl: ''
      }
    },
    async onLoad(option) {
      this.webviewUrl = `${baseURL.webview}/index.html#/activity?a=${option.a}&e=${option.e}&m=${option.m}`
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
