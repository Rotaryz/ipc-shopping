<template>
  <div class="confirm" v-if="showToast">
    <div class="modal-wrapper" @tap.stop="_hack">
      <div class="modal">
        <div class="content-wrapper">
          <div class="content">
            <div class="danger-wrapper">
              <img v-if="content" :src="imageUrlHead + content.img" class="full-image"/>
            </div>
            <div class="font title" v-if="content">{{content.title}}</div>
            <div class="font" v-if="content">{{content.msg}}</div>
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
    {img: 'pic-yhome_01@2x.png', title: '您的身份正在审核中', msg: '请耐心等待结果'},
    {img: 'pic-yhome_02@2x.png', title: '您的身份审核通过', msg: '开始赚钱吧'},
    {img: 'pic-yhome_03@2x.png', title: '您的身份审核未通过', msg: '问问老板吧'},
    {}
  ]
  export default {
    props: {
      flag: {
        type: Number,
        default: 3
      }
    },
    data () {
      return {
        imageUrlHead: baseURL.image + PATH
      }
    },
    methods: {
      _hack () {
        // 防止报错
      },
      confirm () {
        this.flag = 3
        this.$emit('confirmHandler')
      }
    },
    computed: {
      showToast () {
        return this.flag < 3
      },
      content () {
        return IMGARRAY[this.flag]
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
    right: 0
    bottom: 0
    height: 100%
    padding-top: 105.5px
    over-flow: hidden
    background: $color-mask-bgc
    z-index: 99999
    .modal-wrapper
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
