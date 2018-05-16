<template>
  <div class="home">
    <header class="active">
      <article class="swiper-box">
        <section class="s-b-box">
          <section class="bg-box">
          </section>
          <swiper class="home-swiper" @change="swiperChange" :current="sliderCurrent">
            <block v-for="(item, index) in activeList" :key="index+item.title">
              <swiper-item class="home-swiper-item">
                <h-slider-item :item="item"></h-slider-item>
              </swiper-item>
            </block>
          </swiper>
        </section>
      </article>
      <ul class="swiper-dots-box">
        <li :class="['dot',dotCurrent===index?'dot-hit':'']" v-for="(item,index) in activeList" :key="index+item.title"></li>
      </ul>
    </header>
    <footer class="tab-leader" v-if="currentRole===ROLE.UNION_ID">
      <nav class="t-l-nav" :style="leaderImg" @tap.stop="toUnion">联盟管理</nav>
      <nav class="t-l-nav" :style="activeImg">活动管理</nav>
      <nav class="t-l-nav" :style="employeeImg" @tap.stop="toEmployee">员工管理</nav>
      <nav class="t-l-nav" :style="incomeImg">收入/提现</nav>
    </footer>
    <footer class="tab-merchant" v-if="currentRole===ROLE.SHOP_ID">
      <section class="t-m-ad">
        <div class="title">公告</div>
        <div class="content">异业联盟卡活动正在等你报名正在等你…</div>
        <div class="watch-btn">查看</div>
      </section>
      <nav class="t-l-nav" :style="activeImg">活动管理</nav>
      <nav class="t-l-nav" :style="employeeImg">员工管理</nav>
      <nav class="t-l-nav" :style="incomeImg">收入/提现</nav>
    </footer>
    <footer class="tab-employee" v-if="currentRole===ROLE.STAFF_ID">
      <section class="t-e-sales">
        <div class="title">销卡对比</div>
        <article class="content-box">
          <scroll-view class="content" scroll-y="true">
            <ul class="c-holder">
              <li class="emp-item" v-for="(item,index) in employeeList" :key="index">
                <article class="emp-item-box">
                  <section class="icon">
                    <img class="icon-pic" v-if="imageUri" :src="imageUri+'/defaults/ipc-shopping/home/icon-mhome_union@2x.png'">
                  </section>
                  <section class="progress">
                    <div class="name-bar">
                      <div class="name">陈蒙蒙meo</div>
                      <div class="sales">8/10</div>
                    </div>
                    <article class="p-box">
                      <div class="p-pro"></div>
                    </article>
                  </section>
                  <section class="number">
                    <div class="n-title">销卡</div>
                    <div>80</div>
                    <div>%</div>
                  </section>
                </article>
              </li>
            </ul>
          </scroll-view>
        </article>
      </section>
      <nav class="t-l-nav" :style="activeImg">活动管理</nav>
      <nav class="t-l-nav" :style="incomeImg">收入/提现</nav>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import {baseURL} from 'api/config'
  import {mapGetters} from 'vuex'
  import {ROLE} from 'common/js/contants'
  import HSliderItem from 'components/hSlider-item/hSlider-item'
  // import wx from 'wx'

  const num = 999999
  const object = {
    title: '异业联盟卡',
    percent: 80,
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
  const object2 = {
    title: '异业联盟卡2',
    percent: 0,
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
  const object3 = {
    title: '异业联盟卡3',
    percent: 100,
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
        ROLE,
        currentRole: null,
        imageUri: baseURL.image,
        activeList: [object, object2, object3],
        employeeList: new Array(6).fill(0),
        dotCurrent: 0,
        sliderCurrent: 0,
        userId: 0
      }
    },
    created() {
    },
    beforeMount() {
      // let role = this.role()
      // this.role = role
      // console.log(role, '身份')
    },
    mounted() {
      let role = this.role()
      this.currentRole = role
    },
    methods: {
      ...mapGetters(['role']),
      swiperChange(e) {
        let index = e.mp.detail.current
        this.dotCurrent = index
        // this.userId = index
        this.sliderCurrent = index
        api.userAuthorise()
      },
      toUnion() {
        const url = `/pages/union-manage/union-manage`
        this.$router.push(url)
      },
      toEmployee() {
        const url = `/pages/employee/employee`
        this.$router.push(url)
      }
    },
    computed: {
      leaderImg() {
        return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_union@2x.png)` || ''
      },
      activeImg() {
        switch (this.userId) {
          case 0: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_activity@2x.png)` || ''
          }
          case 1: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-shome_activity@2x.png)` || ''
          }
          case 2: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-yhome_activity@2x.png)` || ''
          }
          default: {
            return ''
          }
        }
      },
      employeeImg() {
        switch (this.userId) {
          case 0: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_staff@2x.png)` || ''
          }
          case 1: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-shome_staff@2x.png)` || ''
          }
          default: {
            return ''
          }
        }
      },
      incomeImg() {
        switch (this.userId) {
          case 0: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-mhome_income@2x.png)` || ''
          }
          case 1: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-shome_income@2x.png)` || ''
          }
          case 2: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/home/icon-yhome_income@2x.png)` || ''
          }
          default: {
            return ''
          }
        }
      }
    },
    components: {
      HSliderItem
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
      padding-top: 78.4%
      background: $color-assist-27
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
      border-radius: 3px
      position: relative
      .s-b-box
        position: absolute
        top: 0
        bottom: 0
        right: 0
        left: 0
        .bg-box
          position: absolute
          bottom: 0
          left: 0
          right: 0
          height: 27.3%
          background-image: url("./waves.svg")
          background-size: 100%
          background-repeat: no-repeat
          background-position: center bottom
        .home-swiper
          height: 100%
          width: 100%
          position: relative
          .home-swiper-item
            height: 100%
            width: 100%
            position: relative
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
        padding: 8.845% 0
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

    .tab-merchant
      position: relative
      padding: 4.8% 4% 0
      layout(row)
      justify-content: space-between
      .t-m-ad
        position: relative
        padding: 0 0.5px
        box-sizing: border-box
        width: 100%
        margin-bottom: 6.6666666666%
        layout(row, block, no-wrap)
        justify-content: space-between
        .title
          background: $color-assist-34
          border-radius: 3px
          width: 40.5px
          height: 21px
          font-family: $font-family-meddle
          font-size: $font-size-medium
          color: $color-background-ff
          text-align: center
          line-height: 21px
        .content
          flex: 1
          padding-left: 5px
          height: 21px
          font-family: $font-family-light
          font-size: $font-size-medium
          color: $color-background-ff
          line-height: 21px
          no-wrap()
        .watch-btn
          width: 47px
          height: 21px
          font-family: $font-family-light
          font-size: $font-size-small
          color: $color-assist-34
          text-align: right
          line-height: 21px
      .t-l-nav
        padding: 10.43478260869% 0 20.579710144927%
        width: 31.304347826086%
        background-size: 100%
        background-position: center center
        background-repeat: no-repeat
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-background-ff
        text-align: center
        border-radius: 3px

    .tab-employee
      position: relative
      padding: 2.6666666666% 4% 0
      layout(row)
      justify-content: space-between
      .t-e-sales
        width: 100%
        box-sizing: border-box
        background: $color-assist-27
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
        border-radius: 3px
        margin-bottom: 4%
        .title
          padding: 0 4.34782608695%
          height: 45px
          line-height: 45px
          font-family: $font-family-regular
          font-size: $font-size-medium-x
          color: $color-background-ff
          cut-off-rule-bottom(4.34782608695%, 0, $color-row-line-3f)
        .content-box
          position: relative
          height: 0
          padding-top: 37.971014492753%
          .content
            position: absolute
            top: 0
            left: 0
            right: 0
            bottom: 0
            padding-bottom: 4.8%
            .c-holder
              position: relative
              padding-top: 3.7681159420289%
              overflow: hidden
              .emp-item
                position: relative
                height: 0
                padding-top: 6.9565217391304%
                margin-bottom: 3.9130434782608%
                &:last-child
                  margin-bottom: 0
                .emp-item-box
                  fill-box()
                  layout(row)
                  padding: 0 4.3478260869565%
                  justify-content: space-between
                  align-items: center
                  .icon
                    width: 24px
                    height: 24px
                    box-sizing: border-box
                    border-radius: 50%
                    overflow: hidden
                    .icon-pic
                      width: 100%
                      height: 100%
                  .progress
                    position: relative
                    flex: 1
                    padding: 0 24px 0 15px
                    layout()
                    justify-content: space-between
                    .name-bar
                      flex: 1
                      layout(row)
                      justify-content: space-between
                      align-items: center
                      .name
                        display: inline-block
                        font-family: $font-family-light
                        font-size: $font-size-small
                        color: $color-background-ff
                        text-indent: 1px
                      .sales
                        display: inline-block
                        font-family: $font-family-din
                        font-size: $font-size-small-s
                        color: $color-text-95
                    .p-box
                      height: 6px
                      background: $color-pro-bg-1f
                      border-radius: 100px
                      overflow: hidden
                      .p-pro
                        width: 50%
                        height: 100%
                        background-image: linear-gradient(-90deg, $color-assist-2a 0%, $color-assist-33 100%)
                        border-radius: 100px
                  .number
                    position: relative
                    layout(row, block, no-wrap)
                    align-items: center
                    font-family: $font-family-light
                    font-size: $font-size-small-s
                    color: $color-background-ff
                    div:last-child
                      font-size: $font-size-small-ss
                    div:nth-child(2)
                      font-family: $font-family-din
                      font-size: $font-size-large

      .t-l-nav
        padding: 4.927536231884% 0
        width: 47.826086956521%
        background-size: 100%
        background-position: center center
        background-repeat: no-repeat
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-background-ff
        text-align: center
        border-radius: 3px
</style>
