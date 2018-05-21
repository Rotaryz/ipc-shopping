<template>
  <div class="confirm" v-if="showToast">
    <div class="modal-wrapper" @tap.stop="">
      <div class="modal">
        <div class="content-wrapper">
          <div class="content">
            <div class="danger-wrapper">
              <img :src="imageUrlHead + content.img" class="full-image" />
            </div>
            <div class="font title" v-if="content.title">{{content.title}}</div>
            <div class="font" v-if="content.msg">{{content.msg}}</div>
          </div>
        </div>
        <div class="btn-group border-top-1px" v-if="flag === 1">
          <div class="btn-right" @tap.stop="confirm">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'
  const PATH = `/defaults/ipc-shopping/common/`
  const IMGARRAY = [
    {img: 'pic-yhome_03@2x.png', title: '您的身份审核未通过', msg: '问问老板吧'},
    {img: 'pic-yhome_02@2x.png', title: '您的身份审核通过', msg: '开始赚钱吧'},
    {img: 'pic-yhome_01@2x.png', title: '您的身份正在审核中', msg: '请耐心等待结果'}
  ]
  export default {
    data () {
      return {
        imageUrlHead: baseURL.image + PATH,
        content: {},
        flag: 0,
        showToast: true
      }
    },
    methods: {
      show (content) {
        if (this.showToast) {
          return
        }
        this.flag = content
        this.content = IMGARRAY[content]
        this.showToast = true
      },
      confirm () {
        this.showToast = false
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
      top: 0px
      left: 0px
      right: 0px
      bottom: 0px
      margin: auto
      width: 275px
      height: 243px
      background-color: $color-background-ff
      border-radius: 3px
      .modal
        height: 243px
        display: flex
        flex-direction: column
        .content-wrapper
          flex: 1
          display: flex
          align-items: center
          justify-content: center
          .content
            margin-top: 15px
            text-align: center
            .danger-wrapper
              margin: 0 auto
              margin-bottom: 20px
              width: 77px
              height: 80px
              .full-image
                width: 100%
                height: 100%
            .font
              text-align: center
              font-size: $font-size-medium
              font-family: $font-family-light
              color: $color-assist-333
            .font.title
              font-family: $font-family-bold
              font-size: $font-size-medium-x
              color: $color-assist-333
              text-align: center
              margin-bottom: 8px
        .btn-group
          display: flex
          height: 45px
          .btn-left, .btn-right
            flex: 1
            line-height: 45px
            text-align: center
            font-size: $font-size-medium-x
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
