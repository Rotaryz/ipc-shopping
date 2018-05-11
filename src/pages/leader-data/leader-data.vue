<template>
  <div class="data-box">
    <div class="merchant-title">
      <div class="merchant-title-tab"  :class="bigBtn === 'merchant' ? 'active' : '' " @tap="clickTab('merchant')">商家总榜</div>
      <div class="merchant-title-tab"  :class="bigBtn === 'staff' ? 'active' : '' " @tap="clickTab('staff')">员工总榜</div>
    </div>
    <div class="all-merchant"  v-if="bigBtn === 'merchant'">
      <div class="all-top">
        <div class="data-title">
          <div class="text">门店</div>
          <div class="text">售卡数/总数</div>
          <div class="text">他店核销数</div>
          <div class="text">联盟力</div>
        </div>
        <div class="data-content">
          <scroll-view class="content-scroll" @scrolltolower="test22" scroll-y="true">
            <div class="self-merchant-list">
              <div class="selft-merchant-list-box">美容美甲…</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
            </div>
            <div class="self-merchant-list">
              <div class="selft-merchant-list-box">美容美甲美容美甲美容美甲…</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
            </div>
            <div class="self-merchant-list">
              <div class="selft-merchant-list-box">美容美甲美容美甲美容美甲…</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
            </div>
            <div class="self-merchant-list">
              <div class="selft-merchant-list-box">美容美甲美容美甲美容美甲…</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
            </div>
            <div class="self-merchant-list">
              <div class="selft-merchant-list-box">美容美甲美容美甲美容美甲…</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
            </div>
            <div class="self-merchant-list">
              <div class="selft-merchant-list-box">美容美甲美容美甲美容美甲…</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
              <div class="selft-merchant-list-box">100</div>
            </div>
          </scroll-view>
        </div>
      </div>
      <div class="data-pie">
        <div class="pie-title">
          <div class="icon">¥</div>
          <div class="money">2000</div>
          <div class="text">正在等待分钱</div>
        </div>
        <div class="ec-box">
          <ec-canvas class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
        </div>
      </div>
    </div>
    <div class="all-staff"  v-if="bigBtn === 'staff'">
      <div class="all-staff-box">
        <div class="rank-list">
          <img v-if="image" :src="image + '/defaults/ipc-shopping/activitydata/bg-activity_lizi@2x.png'" class="rank-bg"
               mode="widthFix">
          <div class="rank-box rank-two">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_second@2x.png'" v-if="image"
                   class="hard-img-crown">
              <img :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_second2@2x.png'" v-if="image"
                   class="img">
              <div class="name">销售小能手</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">核销力</div>
              <div class="right-text">638</div>
            </div>
          </div>
          <div class="rank-box rank-two rank-one">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_first@2x.png'" v-if="image"
                   class="hard-img-crown">
              <img :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_first1@2x.png'" v-if="image"
                   class="img">
              <div class="name first-name">销售小能手</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">核销力</div>
              <div class="right-text">638</div>
            </div>
          </div>
          <div class="rank-box rank-two">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_third@2x.png'" v-if="image"
                   class="hard-img-crown">
              <img :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_third3@2x.png'" v-if="image"
                   class="img">
              <div class="name thr-name">销售小能手</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">核销力</div>
              <div class="right-text">638</div>
            </div>
          </div>
        </div>
        <div class="data-content">
          <div class="self-merchant-list">
            <div class="self-staff-list-box user-box">
              <div class="number">4</div>
              <img class="img" :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image">
            </div>
            <div class="self-staff-list-box">阿飞</div>
            <div class="self-staff-list-box">100</div>
            <div class="self-staff-list-box money-box">
              <div class="icon">¥</div>
              <div class="money">2000</div>
            </div>
          </div>
          <div class="self-merchant-list">
            <div class="self-staff-list-box user-box">
              <div class="number">5</div>
              <img class="img" :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image">
            </div>
            <div class="self-staff-list-box">阿飞</div>
            <div class="self-staff-list-box">100</div>
            <div class="self-staff-list-box money-box">
              <div class="icon">¥</div>
              <div class="money">2000</div>
            </div>
          </div>
          <div class="self-merchant-list">
            <div class="self-staff-list-box user-box">
              <div class="number">6</div>
              <img class="img" :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image">
            </div>
            <div class="self-staff-list-box">阿飞</div>
            <div class="self-staff-list-box">100</div>
            <div class="self-staff-list-box money-box">
              <div class="icon">¥</div>
              <div class="money">2000</div>
            </div>
          </div>
          <div class="self-merchant-list">
            <div class="self-staff-list-box user-box">
              <div class="number">7</div>
              <img class="img" :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image">
            </div>
            <div class="self-staff-list-box">阿飞</div>
            <div class="self-staff-list-box">100</div>
            <div class="self-staff-list-box money-box">
              <div class="icon">¥</div>
              <div class="money">2000</div>
            </div>
          </div>
          <div class="self-merchant-list">
            <div class="self-staff-list-box user-box">
              <div class="number">8</div>
              <img class="img" :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image">
            </div>
            <div class="self-staff-list-box">阿飞</div>
            <div class="self-staff-list-box">100</div>
            <div class="self-staff-list-box money-box">
              <div class="icon">¥</div>
              <div class="money">2000</div>
            </div>
          </div>
          <div class="self-merchant-list">
            <div class="self-staff-list-box user-box">
              <div class="number">9</div>
              <img class="img" :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image">
            </div>
            <div class="self-staff-list-box">阿飞</div>
            <div class="self-staff-list-box">100</div>
            <div class="self-staff-list-box money-box">
              <div class="icon">¥</div>
              <div class="money">2000</div>
            </div>
          </div>
          <div class="self-merchant-list">
            <div class="self-staff-list-box user-box">
              <div class="number">10</div>
              <img class="img" :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image">
            </div>
            <div class="self-staff-list-box">阿飞</div>
            <div class="self-staff-list-box">100</div>
            <div class="self-staff-list-box money-box">
              <div class="icon">¥</div>
              <div class="money">2000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-bg"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Api from 'api'
  const options = {
    // color: ['#8941AF', '#A740AE', '#AE4077', '#B16544', '#B44343', '#5EAD83', '#40A1AE', '#4778C0', '#2843C3', '#57876E', '#128787', '#728AEC', '#1B6FBD', '#8941AF', '#A740AE', '#AE4077', '#B16544', '#B44343', '#5EAD83', '#40A1AE', '#4778C0', '#2843C3', '#57876E', '#128787', '#728AEC', '#1B6FBD'],
    color: ['#6D42E6', '#4778C0', '#47AFC0', '#40A1AE', '#8941AF', '#4644DF'],
    series: [{
      label: {
        normal: {
          fontSize: 10,
          color: '#959dbd'
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['25%', '60%'],
      data: [{
        value: 55,
        name: '锋味粉-55'
      }, {
        value: 20,
        name: '海底捞-22'
      }, {
        value: 10,
        name: '自然醉鹅-10'
      }, {
        value: 20,
        name: '星巴克-20'
      }, {
        value: 38,
        name: '牛肉火锅-38'
      }, {
        value: 58,
        name: '太二酸菜鱼-58'
      }, {
        value: 28,
        name: '旋转寿司-28'
      }, {
        value: 38,
        name: '味千拉面-38'
      }, {
        value: 38,
        name: '澄海烧鹅-38'
      }, {
        value: 38,
        name: '鸡公煲-38'
      }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  }
  export default {
    data() {
      return {
        ec: {
          // 传 options
          options: options
        },
        image: Api.image,
        bigBtn: 'merchant'
      }
    },
    methods: {
      clickTab(value) {
        this.bigBtn = value
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .data-box
    padding-top: 25.5px
    padding-bottom: 30px

  .page-bg
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    background: #1A1D3D

  .merchant-title
    layout(row)
    justify-content: center
    margin-bottom: 12px
    .merchant-title-tab
      no-wrap()
      width: 150px
      text-align: center
      font-family: $font-family-light
      font-size: $font-size-medium
      color: $color-text-95
      padding-bottom: 10px
      position: relative
    .active
      color: $color-background-ff
      cut-off-rule-bottom(60px, 60px, $color-assist-34, 2px)

  .all-staff /* 员工总榜 */
    padding: 0 12px
    .all-staff-box
      background: $color-assist-27
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
      border-radius: 3px
      padding-bottom: 24.5px
      position: relative
      .rank-list
        layout(row)
        padding: 0 20px
        cut-off-rule-bottom(0, 0, rgba(255, 255, 255, 0.16), 0.5px)
        height: 172px
        .rank-box
          flex: 1
          layout()
        .rank-two
          padding-top: 66px
          .rank-two-hard
            position: relative
            .hard-img-crown
              position: absolute
              top: -14px
              left: 0
              right: 0
              margin: 0 auto
              width: 25px
              height: 16px
              z-index: 0
            .hard-img
              position: relative
              z-index: 1
              width: 39px
              height: 39px
              display: block
              margin: 0 auto
              border-radius: 50%
              border: 2px solid $color-assist-27
          .rank-two-text
            layout(row)
            align-items: center
            justify-content: center
            margin: 5px 0
            .img
              width: 12px
              height: 12px
              display: block
              margin-right: 2px
            .name
              font-family: $font-family-light
              font-size: $font-size-small
              color: $color-assist-7c
            .thr-name
              color: #C9826B
            .first-name
              color: #FFD708
          .rank-two-bottom
            layout(row)
            align-items: center
            justify-content: center
            .left-text
              font-family: $font-family-light
              font-size: $font-size-small-s
              color: $color-text-95
              margin-right: 5px
            .right-text
              font-family: DINAlternate-Bold
              font-size: $font-size-medium-x
              color: $color-background-ff
        .rank-one
          padding-top: 45.5px
          .rank-two-hard
            .hard-img-crown
              width: 40px
              height: 25.5px
              top: -21.5px
            .hard-img
              width: 55px
              height: 55px
        .rank-bg
          width: 80%
          left: 0
          right: 0
          top: 40px
          z-index: 0
          margin: auto
          position: absolute
      .data-content
        padding-left: 15px
        .self-merchant-list
          layout(row)
          font-family: DINAlternate-Bold
          font-size: $font-size-medium
          color: $color-text-95
          height: 40px
          line-height: 40px
          cut-off-rule-bottom(0, 0, rgba(255, 255, 255, 0.16), 0.5px)
          .self-staff-list-box
            flex: 1
            &:nth-of-type(2)
              font-size: $font-size-small
              no-wrap()
            &:last-child
              text-align: right
              position: relative
              right: 30px
          .user-box
            align-items: center
            justify-content: space-between
            layout(row)
            .number
              font-family: DINAlternate-Bold
              font-size: $font-size-medium-x
              color: #959DBD
              position: relative
              left: 5px
            .img
              position: relative
              right: 15px
              width: 24px
              height: 24px
              border-radius: 50%
              display: block
          .money-box
            align-items: flex-end
            justify-content: flex-end
            layout(row)
            .money
              font-family: DINAlternate-Bold
              color: $color-background-ff
              font-size: $font-size-medium
            .icon
              font-family: $font-family-light
              color: $color-background-ff
              font-size: 9px

  .all-merchant /* 店铺总榜 */
    padding: 0 12px
    .all-top
      background: $color-assist-27
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
      border-radius: 3px
      height: 219px
      .data-title
        layout(row)
        padding-left: 15px
        font-size: $font-size-small
        background: #333F6C
        height: 40px
        line-height: 40px
        color: $color-background-ff
        border-top-left-radius: 3px
        border-top-right-radius: 3px
        .text
          flex: 1
          &:last-child
            text-align: right
            position: relative
            right: 30px
      .data-content
        padding-left: 15px
        .content-scroll
          height: 164.5px
          .self-merchant-list
            layout(row)
            font-family: DINAlternate-Bold
            font-size: $font-size-medium
            color: $color-text-95
            height: 40px
            line-height: 40px
            cut-off-rule-bottom(0, 0, rgba(255, 255, 255, 0.16), 0.5px)
            .selft-merchant-list-box
              flex: 1
              &:first-child
                no-wrap()
              &:last-child
                text-align: right
                position: relative
                right: 30px
    .data-pie
      background: $color-assist-27
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15)
      border-radius: 3px
      height: 247.5px
      margin-top: 10px
      .pie-title
        layout(row)
        background: #333F6C
        border-top-left-radius: 3px
        border-top-right-radius: 3px
        padding-left: 15px
        color: $color-background-ff
        height: 40px
        line-height: 40px
        font-family: $font-family-light
        font-size: $font-size-medium
        .icon
          font-size: $font-size-small
        .money
          font-size: $font-size-medium-x
          font-family: DINAlternate-Bold
  .ec-box
    height: 207.5px
    ec-canvas
      width: 400px
      height: 179px
</style>
