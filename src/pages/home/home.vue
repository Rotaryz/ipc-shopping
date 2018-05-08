<template>
  <div class="home">
    <div class="active">
      <div class="swiper-box">
        <swiper class="home-swiper">
          <block v-for="(item, index) in activeList" :key="index">
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
              </section>
              <section class="container">
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
      </div>
      <ul class="swiper-dots-box">
        <li class="dot" v-for="(val,key,index) in activeList" :key="index"></li>
      </ul>
    </div>
    <div class="tab"></div>
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
      number: (Math.random() * num) >> 0
    },
    income: {
      title: '员工收入',
      number: (Math.random() * num) >> 0
    },
    otherCard: {
      title: '异业核销数',
      number: (Math.random() * num) >> 0
    }
  }

  export default {
    data () {
      return {
        imageUri: api.image,
        activeList: new Array(3).fill(object)
      }
    },
    computed: {
      arrowImg () {
        return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_j@2x.png)` || ''
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
        margin: 0 15px
        height: 294px
        background: $color-assist-27
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
        border-radius: 3px
        .home-swiper
          height: 100%
          width: 100%
          .home-swiper-item
            height: 100%
            width: 100%
            position: relative
            .progress-bar
              position: absolute
              top: 86px
              left: 102.5px
              right: 102.5px
              bottom: 68px
              border-radius: 50%
              border: 12px solid $color-main-1a
            .top-bar
              height: 50px
              padding: 0 10px 0 15px
              layout(row, block, no-wrap)
              justify-content: space-between
              align-items: center
              cut-off-rule-bottom(15px, 0, $color-cut-line-ff16)
              .title
                font-family: $font-family-regular
                font-size: $font-size-medium-x
                color: $color-background-ff
              .look-over
                padding-right: 10px
                font-family: $font-family-light
                font-size: $font-size-small
                color: $color-text-95
                background-size: 8px
                background-position: right center
                background-repeat: no-repeat
            .container
              layout(row)
              margin-top: 44px
              padding: 0 15px
              justify-content: space-between
              &:last-child
                margin-top: 38px
              .data-box
                position: relative
                width: 85px
                .number
                  font-family: $font-family-din
                  font-size: $font-size-large-xx
                  color: $color-background-ff
                  no-wrap()
                .title
                  margin-top: 7px
                  font-family: $font-family-light
                  font-size: $font-size-small
                  color: $color-text-95
                  &.last
                    text-align: right
      .swiper-dots-box
        margin-top: 15px
        layout(row)
        justify-content: center
        .dot
          margin: 0 2.5px
          width: 3px
          height: 3px
          border-radius: 50%
          background-color: $color-dot-4a


</style>
