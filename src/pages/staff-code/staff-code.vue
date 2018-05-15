<template>
  <div class="card-box">
    <img :src="image + '/defaults/ipc-shopping/aliance/pic-activity_er@2x.png'" class="card-img" v-if="image" mode="widthFix">
    <img :src="image + '/defaults/ipc-shopping/aliance/icon-activity_first1@2x.png'" class="card-code" v-if="image" mode="widthFix">
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'

  export default {
    data() {
      return {
        image: baseURL.image
      }
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
