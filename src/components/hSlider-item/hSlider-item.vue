<template>
  <div class="home-slider-item">
    <section class="progress-bar">
      <!--<circle-progress :activeInfo.sync="item" :number.sync="number"></circle-progress>-->
      <div class="circle-progress">
        <section class="c-p-svg">
          <img class="c-p-svg-pic" mode="aspectFit" :src="bgImg" v-if="bgImg">
        </section>
        <section class="info">
          <div class="number-box">
            <div class="number">{{showNumber}}</div>
            <div class="per">%</div>
          </div>
          <div class="txt">完成率</div>
        </section>
      </div>
    </section>
    <section class="top-bar">
      <div class="title">{{item.title}}</div>
      <div v-if="item.isOnline" class="look-over" @tap="lookTotalHandler(item)">
        <div class="txt">查看统计</div>
        <img class="arrow-pic" :src="arrowImg" mode="aspectFit"/>
      </div>
    </section>
    <section class="container">
      <div class="data-box">
        <div class="number">{{item.saleCard.number}}</div>
        <div class="title">{{item.saleCard.title}}</div>
      </div>
      <div class="data-box">
        <div class="number">{{item.currentCard.number}}</div>
        <div class="title last">{{item.currentCard.title}}</div>
      </div>
      <div class="data-box">
        <div class="number">{{item.income.number}}</div>
        <div class="title">{{item.income.title}}</div>
      </div>
      <div class="data-box">
        <div class="number">{{item.otherCard.number}}</div>
        <div class="title last">{{item.otherCard.title}}</div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  // import CircleProgress from 'components/circle-progress'
  import source from 'common/source'
  import util from './base64'
  import SVG from './c-progress'

  export default {
    props: {
      item: Object
    },
    data () {
      return {
        saleCard: 0,
        currentCard: 0,
        income: 0,
        otherCard: 0,
        timer: null,
        number: 0
      }
    },
    beforeMount () {
    },
    mounted () {
      this.run()
    },
    beforeUpdate () {
      this.run()
    },
    methods: {
      lookTotalHandler (item) {
        this.$emit('lookTotalHandler', item)
      },
      // _loading() {
      //   if (this.timer) return
      //   let saleCard = this.item.saleCard.number
      //   let currentCard = this.item.currentCard.number
      //   let income = this.item.income.number
      //   let otherCard = this.item.otherCard.number
      //   let space = 10
      //   let millionSecond = 1500
      //   let step = (target) => {
      //     return (target / (millionSecond / space)) >> 0
      //   }
      //   this.timer = setInterval(() => {
      //     let flag1 = this.saleCard < saleCard && (this.saleCard += step(saleCard))
      //     let flag2 = this.currentCard < currentCard && (this.currentCard += step(currentCard))
      //     let flag3 = this.income < income && (this.income += step(income))
      //     let flag4 = this.otherCard < otherCard && (this.otherCard += step(otherCard))
      //     this.saleCard = Math.min(this.saleCard, saleCard)
      //     this.currentCard = Math.min(this.currentCard, currentCard)
      //     this.income = Math.min(this.income, income)
      //     this.otherCard = Math.min(this.otherCard, otherCard)
      //     if (flag1 && flag2 && flag3 && flag4) {
      //       this.timer && clearInterval(this.timer)
      //     }
      //   }, space)
      // }
      run () {
        if (this.timer) return
        if (this.item.percent !== this.number) {
          if (this.item.percent < 1) {
            this.number = this.item.percent
            return
          }
          const percent = this.item.percent
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
      arrowImg () {
        return source.imgArrowRight('img')
      },
      bgImg () {
        let pre = this.item.percent * 1
        let svg = SVG.makeSvg(pre)
        let base64 = util.base64encode(svg)
        // return `background-image:url(data:image/svg+xml;base64,${base64})`
        return `data:image/svg+xml;base64,${base64}`
      },
      showNumber () {
        // let number = this.number.toFixed(1)
        let number = this.number.toFixed(1)
        let re = number.split('.')
        if (re[1] === '0') {
          number = re[0]
        }
        return number
      }
    },
    components: {
      // CircleProgress
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

  .home-slider-item
    height: 100%
    width: 100%
    position: relative
    .progress-bar
      position: absolute
      box-sizing: border-box
      width: 37.333333333333vw
      height: 37.333333333333vw
      top: 29.251700680272%
      row-center()
    .top-bar
      height: 17.006802721088%
      padding: 0 2.8985507246376% 0 4.3478260869565%
      layout(row, block, no-wrap)
      justify-content: space-between
      align-items: center
      cut-off-rule-bottom(4.3478260869565%, 0, $color-cut-line-ff16)
      .title
        flex: 1
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-background-ff
      .look-over
        font-family: $font-family-light
        font-size: $font-size-small
        color: $color-text-95
        layout(row)
        align-items: center
        height: 100%
        .arrow-pic
          width: 12px
          height: 12px
          padding-right: 1.5px
        .txt
          position: relative

    .container
      layout(row)
      margin-top: 14.965986394557%
      padding: 0 4.3478260869565%
      justify-content: space-between
      .data-box
        position: relative
        box-sizing: border-box
        width: 50%
        .number
          font-family: $font-family-din
          /*@formatter:off*/
          font-size: 48rpx
          /*@formatter:on*/
          color: $color-background-ff
          min-width: 60px
          max-width: 100px
          no-wrap()
        .title
          margin-top: 1.7766497461928%
          font-family: $font-family-light
          font-size: $font-size-small
          color: $color-text-95
          width: 60px
        &:nth-child(1), &:nth-child(2)
          margin-bottom: 9.6446700507614%
        &:nth-child(2n)
          layout()
          align-items: flex-end
        &:nth-child(2n) > .title
          text-align: right
</style>
