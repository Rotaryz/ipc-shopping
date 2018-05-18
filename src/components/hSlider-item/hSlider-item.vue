<template>
  <div class="home-slider-item">
    <section class="progress-bar">
      <circle-progress :activeInfo="item"></circle-progress>
    </section>
    <section class="top-bar" @tap="lookTotalHandler(item)">
      <div class="title">{{item.title}}</div>
      <div v-if="item.isOnline" class="look-over" :style="arrowImg">查看统计</div>
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
  import source from 'common/source'
  import CircleProgress from 'components/circle-progress'

  export default {
    props: {
      item: Object
    },
    data () {
      return {
        timer: null,
        saleCard: 0,
        currentCard: 0,
        income: 0,
        otherCard: 0
      }
    },
    beforeMount () {
    },
    mounted () {
    },
    methods: {
      lookTotalHandler (item) {
        this.$emit('lookTotalHandler', item)
      },
      _loading () {
        if (this.timer) return
        let saleCard = this.item.saleCard.number
        let currentCard = this.item.currentCard.number
        let income = this.item.income.number
        let otherCard = this.item.otherCard.number
        let space = 10
        let millionSecond = 1500
        let step = (target) => {
          return (target / (millionSecond / space)) >> 0
        }
        this.timer = setInterval(() => {
          let flag1 = this.saleCard < saleCard && (this.saleCard += step(saleCard))
          let flag2 = this.currentCard < currentCard && (this.currentCard += step(currentCard))
          let flag3 = this.income < income && (this.income += step(income))
          let flag4 = this.otherCard < otherCard && (this.otherCard += step(otherCard))
          this.saleCard = Math.min(this.saleCard, saleCard)
          this.currentCard = Math.min(this.currentCard, currentCard)
          this.income = Math.min(this.income, income)
          this.otherCard = Math.min(this.otherCard, otherCard)
          if (flag1 && flag2 && flag3 && flag4) {
            this.timer && clearInterval(this.timer)
          }
        }, space)
      }
    },
    computed: {
      arrowImg () {
        return source.imgArrowRight()
      }
    },
    components: {
      CircleProgress
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

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
        padding-right: 10px
        background-size: 14px
        background-position: 48px center
        background-repeat: no-repeat
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
