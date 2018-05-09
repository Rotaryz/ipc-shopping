<template>
  <div class="home">
    <header class="active">
      <article class="swiper-box">
        <section class="s-b-box">
          <swiper class="home-swiper" @change="swiperChange" :current="0">
            <block v-for="(item, index) in activeList" :key="index+item.title">
              <swiper-item class="home-swiper-item">
                <section class="progress-bar"></section>
                <section class="top-bar">
                  <div class="title">{{item.title}}</div>
                  <div class="look-over" :style="arrowImg">查看统计</div>
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
              </swiper-item>
            </block>
          </swiper>
        </section>
      </article>
      <ul class="swiper-dots-box">
        <li :class="['dot',dotCurrent===index?'dot-hit':'']" v-for="(item,index) in activeList" :key="index+item.title"></li>
      </ul>
    </header>
    <footer class="tab-leader" v-if="userId===0">
      <nav class="t-l-nav" :style="leaderImg">联盟管理
        <!--<img class="t-l-n-bg" v-if="imageUri" :src="imageUri +'/defaults/ipc-shopping/home/icon-mhome_union@2x.png)'">-->
      </nav>
      <nav class="t-l-nav" :style="activeImg">活动管理
        <!--<img class="t-l-n-bg" v-if="imageUri" :src="imageUri +'/defaults/ipc-shopping/home/icon-mhome_union@2x.png)'">-->
      </nav>
      <nav class="t-l-nav" :style="employeeImg">员工管理
      </nav>
      <nav class="t-l-nav" :style="incomeImg">收入/提现</nav>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'

  const num = 999999
  const object = {
    title: '异业联盟卡',
    saleCard: {
      title: '售卡数',
      number: (Math.random() * num) >> 0
    },
    currentCard: {
      title: '本店核销数',
      number: num
    },
    income: {
      title: '员工收入',
      number: (Math.random() * num) >> 0
    },
    otherCard: {
      title: '异业核销数',
      number: 0
    }
  }

  export default {
    data() {
      return {
        imageUri: api.image,
        activeList: new Array(3).fill(object),
        swiperCurrent: 0,
        dotCurrent: 0,
        userId: 0
      }
    },
    methods: {
      swiperChange(e) {
        console.log(e)
        let index = e.mp.detail.current
        this.dotCurrent = index
        this.swiperCurrent = index
      }
    },
    computed: {
      arrowImg() {
        return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_j@2x.png)` || ''
      },
      leaderImg() {
        return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_union@2x.png)` || ''
      },
      activeImg() {
        return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_activity@2x.png)` || ''
      },
      employeeImg() {
        return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_staff@2x.png)` || ''
      },
      incomeImg() {
        return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_income@2x.png)` || ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .home
    min-height: 100vh
    background-color: $color-main-1a
    .active
      position: relative
      .swiper-box
        margin: 0 4%
        height: 0
        padding-top :78.4%
        background: $color-assist-27
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
        border-radius: 3px
        position: relative
        .s-b-box
          position :absolute
          top:0
          bottom :0
          right :0
          left :0
          .home-swiper
            height: 100%
            width: 100%
            position: relative
            .home-swiper-item
              height: 100%
              width: 100%
              position: relative
              .progress-bar
                position: absolute
                box-sizing: border-box
                width: 37.3333333333vw
                height: 37.3333333333vw
                top: 29.251700680272%
                row-center()
                border-radius: 50%
                border: 12px solid $color-main-1a
              .top-bar
                height: 17.006802721088%
                padding: 0 2.8985507246376% 0 4.3478260869565%
                layout(row, block, no-wrap)
                justify-content: space-between
                align-items: center
                cut-off-rule-bottom(4.3478260869565%, 0, $color-cut-line-ff16)
                .title
                  font-family: $font-family-regular
                  font-size: $font-size-medium-x
                  color: $color-background-ff
                .look-over
                  padding-right: 10px
                  font-family: $font-family-light
                  font-size: $font-size-small
                  color: $color-text-95
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
                    font-size: $font-size-large-xx
                    color: $color-background-ff
                    min-width: 60px
                    max-width :100px
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
      .swiper-dots-box
        margin-top: 4%
        layout(row)
        justify-content: center
        .dot
          margin: 0 2.5px
          width: 3px
          height: 3px
          border-radius: 50%
          background-color: $color-dot-4a
          transition: 0.3s all
          &.dot-hit
            width: 15px
            border-radius: 100px
            background-color: $color-dot-a7

    .tab-leader
      position: relative
      padding: 8.26666% 4% 0
      layout(row)
      justify-content: space-between
      .t-l-nav
        padding :8.845% 0
        width: 47.826086%
        background-size: 100%
        background-position: center center
        background-repeat: no-repeat
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-background-ff
        text-align: center
        border-radius: 3px
        &:nth-child(3), &:nth-child(4)
          margin-top: 4.133333%
</style>
