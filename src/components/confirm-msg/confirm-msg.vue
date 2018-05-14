<template>
  <div class="confirm" v-if="show">
    <div class="modal-wrapper" @tap.stop="">
      <div class="modal">
        <div class="content-wrapper">
          <div class="content">
            <div class="danger-wrapper" v-if="imgFlag">
              <!--<img v-if="imageUrlHead" src="{{imageUrlHead + '/defaults/c-image/square/pic-airship@2x.png'}}" class="full-image" />-->
            </div>
            <div class="font title" v-if="title">{{title}}</div>
            <div class="font" v-if="msg">{{msg}}</div>
          </div>
        </div>
        <div class="btn-group border-top-1px">
          <div class="btn-left border-right-1px" @tap.stop="cancel">取消</div>
          <div class="btn-right" @tap.stop="confirm">确认</div>
        </div>
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
        imgFlag: false
      }
    },
    props: [
      'show',
      'title',
      'msg'
    ],
    methods: {
      confirm () {
        this.$emit('confirm')
      },
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'
  .confirm
    position: fixed
    top: 0
    left: 0
    z-index: 100
    width: 100%
    height: 100%
    over-flow: hidden
    background: $color-mask-bgc
    z-index: 1500
    .modal-wrapper
      position: absolute
      top: 50%
      left: 50%
      width: 275px
      min-height: 140px
      transform: translate(-50%, -50%)
      background-color: $color-background-ff
      border-radius: 3px
      .modal
        height: 140px
        .content-wrapper
          display: flex
          align-items: center
          justify-content: center
          height: 94px
          .content
            text-align: center
            .danger-wrapper
              margin: 0 auto
              margin-bottom: 19.5px
              width: 62px
              height: 57px
            .font
              text-align: center
              font-size: $font-size-medium
              font-family: $font-family-light
              color: $color-assist-333
            .font.title
              font-family: $font-family-light
              font-size: $font-size-medium-x
              color: $color-error
              text-align: center
              margin-bottom: 7px
        .btn-group
          display: flex
          height: 45px
          .btn-left, .btn-right
            flex: 1
            line-height: 45px
            text-align: center
            font-size: $font-size-medium
            font-family: $font-family-light
            color: $color-assist-34
          .btn-left
            font-family: $font-family-light
            color: $color-assist-27
          .border-right-1px
            cut-off-rule-right()
        .border-top-1px
          cut-off-rule-top()
</style>
