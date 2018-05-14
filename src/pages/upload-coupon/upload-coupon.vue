<template>
  <div class="coupon-box">
    <div class="coupon-con">
      <div class="title">可报名服务</div>
      <div class="coupon-list">
        <coupon  :useType="1" :useModel="1"></coupon>
      </div>
      <div class="coupon-list">
        <coupon  :useType="1" :useModel="1"></coupon>
      </div>
      <div class="coupon-list">
        <coupon  :useType="1" :useModel="1"></coupon>
      </div>
      <div class="coupon-list">
        <coupon  :useType="1" :useModel="1"></coupon>
      </div>
    </div>
    <footer class="btn">保存</footer>
    <div class="page-bg"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import Coupon from 'components/coupon-item/coupon-item'
  export default {
    data() {
      return {
        image: api.image
      }
    },
    components: {
      Coupon
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
  .coupon-con
    padding: 0 15px
    .title
      height: 50px
      line-height: 50px
      font-family: $font-family-regular
      font-size: $font-size-medium-x
      color: $color-text-2d
    .coupon-list
      margin-top: 10px
  .btn
    position: fixed
    bottom: 0
    left: 0
    right: 0
    normal-button-default()
</style>
