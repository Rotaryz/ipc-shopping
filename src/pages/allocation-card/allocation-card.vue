<template>
  <div class="card-box">
    <div class="box-top">
      <active-card :useType="1" @previewHandler="test"></active-card>
    </div>
    <div class="merchant-box">
      <div class="box-left">
        <img :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image" class="box-img">
        <div class="text">国颐堂店铺</div>
      </div>
      <div class="box-right">
        <div class="text">100</div>
        <input type="number" class="input-text">
      </div>
    </div>
    <div class="page-bg"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'
  import ActiveCard from 'components/active-card-item/active-card-item'
  export default {
    data() {
      return {
        image: baseURL.image
      }
    },
    components: {
      ActiveCard
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .page-bg
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    background: #F6F7FA
  .box-top
    padding: 10px 15px
  .merchant-box
    height: 54px
    background: $color-background-ff
    layout(row)
    justify-content: space-between
    align-items: center
    padding: 0 15px
    .box-left
      layout(row)
      align-items: center
      .box-img
        display: block
        width: 34px
        height: 34px
        border-radius: 50%
      .text
        margin-left: 10px
        font-family: $font-family-light
        font-size: $font-size-medium
        color: $color-text-2d
    .box-right
      font-family: $font-family-light
      font-size: $font-size-small
      color: $color-assist-34
      .input-text
        height: 20px
        width: 40px
</style>
