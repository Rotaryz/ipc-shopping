<template>
  <div>
    <div class="list-box">
      <div class="box-top">
        <active-card :useType="1" @previewHandler="test"></active-card>
      </div>
      <div class="box-top">
        <active-card :useType="0" @previewHandler="test"></active-card>
      </div>
      <div class="box-top">
        <active-card :useType="0" @previewHandler="test"></active-card>
      </div>
    </div>
    <div class="list-null">
      <img :src="image + '/defaults/ipc-shopping/home/pic-union_empty@2x.png'" class="null-img" v-if="image" mode="widthFix">
      <div class="text">暂无活动</div>
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
  .list-box
    padding: 0 15px
    .box-top
      margin-top: 10px
  .list-null
    padding-top: 177px
    text-align: center
    .null-img
      margin: 0 auto
      width: 25%
      display: block
    .text
      margin-top: 7.5px
      font-family: $font-family-light
      font-size: $font-size-small
      color: $color-assist-27
</style>
