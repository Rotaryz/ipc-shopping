<template>
  <div class="withdrawal-result">
    <div class="content-wrapper">
      <div class="left">
        <image class="progress" v-if="imageUrl" :src="imageUrl + '/defaults/b-image/page/pic-finance_current2@2x.png'"></image>
      </div>
      <div class="right">
        <div class="t-content">
          <div class="title">您的提现申请已提交</div>
          <text class="sub-title">{{date}}</text>
        </div>
        <div class="b-content">
          <div class="title">系统处理中</div>
          <text class="sub-title">预计3天内到账
            节假日期间可能延迟到账，请耐心等待</text>
        </div>
      </div>
    </div>
    <div class="btn-wrapper">
      <div class="btn" @tap="finish">完成</div>
    </div>
  </div>
</template>

<script>
  import { baseURL } from 'api/config'
  export default{
    data() {
      return {
        imageUrl: baseURL.image,
        date: ''
      }
    },
    onShow () {
      this.date = this.$root.$mp.query.data
    },
    methods: {
      finish() {
        this.$router.go(2)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'

  page
    background-color: $color-background-ff
  .withdrawal-result
    .content-wrapper
      display: flex
      padding-top: 34.5px
      padding-bottom: 40.5px
      .left
        padding-top: 3px
        padding-left: 40px
        .progress
          width: 10px
          height: 71.5px
      .right
        margin-left: 10px
        .t-content, .b-content
          .title
            font-size: $font-size-medium
          .sub-title
            font-size: $font-size-small
            color: $color-text-9b
        .b-content
          margin-top: 30px
    .btn-wrapper
      padding: 0 12px
      .btn
        display: flex
        align-items: center
        justify-content: center
        height: 44px
        margin-bottom: 12px
        border-radius: 4px
        font-size: $font-size-medium
        color: $color-background-ff
        background-color: $color-assist-34
</style>
