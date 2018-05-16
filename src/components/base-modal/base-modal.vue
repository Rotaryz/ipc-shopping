<template>
  <div class="base-modal" v-if="show">
    <div class="modal">
      <div class="title-wrapper">{{title}}</div>
      <div class="content-wrapper">
        <slot slot="content"></slot>
      </div>
      <div class="btn-group">
        <div class="btn-cancel border-right-1px" @tap.stop="cancel" v-if="type !== 'tip'">取消</div>
        <div class="btn-confirm" @tap.stop="confirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'

  export default {
    data () {
      return {
        imageUrlHead: baseURL.image,
        imgFlag: false,
        show: false
      }
    },
    props: {
      type: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    },
    methods: {
      shows () {
        this.show = true
      },
      confirm () {
        this.show = false
        this.$emit('confirm')
      },
      cancel () {
        this.show = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'
  .base-modal
    position: fixed
    top: 0
    left: 0
    z-index: 100
    width: 100%
    height: 100%
    over-flow: hidden
    background: $color-mask-bgc
    z-index: 1500
    .modal
      position: absolute
      top: 50%
      left: 50%
      width: 265px
      transform: translate(-50%, -50%)
      .title-wrapper
        height: 40px
        line-height: 40px
        text-align: center
        font-size: $font-size-medium-x
        color: $color-background-ff
        background-color: $color-text-2d
      .content-wrapper
        overflow: scroll
        background: $color-background-ff
      .btn-group
        display: flex
        height: 40px
        background-color: $color-background-ff
        cut-off-rule-top()
        .border-right-1px
          cut-off-rule-right()
        .btn-cancel, .btn-confirm
          flex: 1
          text-align: center
          line-height: 40px
          font-size: $font-size-medium
        .btn-cancel
          color: $color-text-9b
        .btn-confirm
          color: $color-assist-36

  /*.close-wrapper*/
  /*width: 23px*/
  /*height: 23px*/
  /*margin: auto*/
  /*margin-top: 77.55px*/
  /*image*/
  /*width: 23px*/
  /*height: 23px*/
</style>
