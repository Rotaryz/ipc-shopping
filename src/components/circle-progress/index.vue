<template>
  <div class="circle-progress">
    <section class="c-p-svg">
      <img class="c-p-svg-pic" mode="aspectFit" :src="bgImg" v-if="bgImg">
    </section>
    <section class="info">
      <div class="number-box">
        <div class="number">{{number}}</div>
        <div class="per">%</div>
      </div>
      <div class="txt">完成率</div>
    </section>
  </div>
</template>


<script type="text/ecmascript-6">
  import util from './base64'
  import SVG from './c-progress'

  export default {
    props: {
      activeInfo: Object
    },
    data () {
      return {
        number: 0,
        timer: null
      }
    },
    beforeCreate () {
    },
    created () {
    },
    beforeMount () {
    },
    mounted () {
      // this._loading()
      this.$on('bridge', (val) => {
        this._loading(val)
      })
    },
    beforeUpdate () {
    },
    onLoad () {
    },
    onShow () {
    },
    onHide () {
    },
    methods: {
      _loading (val) {
        console.log(val)
        if (this.timer) return
        if (this.activeInfo.percent !== this.number) {
          if (this.activeInfo.percent < 1) {
            this.number = this.activeInfo.percent
            return
          }
          const percent = this.activeInfo.percent
          let milliSecond = 500
          let start = Date.now()
          let pre = 1 / percent
          let space = pre * milliSecond
          this.timer = setInterval(() => {
            let now = Date.now()
            this.number++
            if (now - start >= milliSecond && this.number >= percent) {
              this.number = percent
              this.timer && clearInterval(this.timer)
            }
          }, space)
        }
      }
    },
    computed: {
      bgImg () {
        let pre = this.activeInfo.percent * 1
        let svg = SVG.makeSvg(pre)
        let base64 = util.base64encode(svg)
        // return `background-image:url(data:image/svg+xml;base64,${base64})`
        return `data:image/svg+xml;base64,${base64}`
      }
      // showNumber () {
      //   // let number = this.number.toFixed(1)
      //   let number = this.number.toFixed(1)
      //   let re = number.split('.')
      //   if (re[1] === '0') {
      //     number = re[0]
      //   }
      //   return number
      // }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .circle-progress
    width: 100%
    height: 100%
    position: relative
    -webkit-transform: rotate(-0.05deg)
    transform: rotate(-0.05deg)
    .c-p-svg
      height: 100%
      .c-p-svg-pic
        height: 100%
        width: 100%
    .info
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      layout()
      justify-content: center
      align-items: center
      .number-box
        layout(row, inline, no-warp)
        align-items: flex-end
      .number
        font-family: $font-family-din
        color: $color-background-ff
        /*@formatter:off*/
        font-size: $font-size-shop-x
        line-height: $font-size-shop-x
        /*@formatter:on*/
      .per
        font-family: $font-family-light
        font-size: $font-size-small
        color: $color-background-ff
        line-height: $font-size-small
        box-sizing: border-box
        padding-bottom: 7.5px
      .txt
        margin-top: 5px
        font-family: $font-family-light
        font-size: $font-size-medium
        color: $color-background-ff
        line-height: $font-size-medium
</style>
