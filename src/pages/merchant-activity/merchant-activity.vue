<template>
  <div class="activity-content">
    <div class="activity-detail">
      <img :src="image + '/defaults/ipc-shopping/merchant/pic-activity_banner02@2x.png'" class="detail-bg" v-if="image">
      <div class="detail-money">
        <div class="money">
          <div class="icnon">¥</div>
          <div class="number">10000</div>
        </div>
        <div class="text">正在等待抢钱</div>
      </div>
      <div class="detail-canvas">
        <div class="canvas-box">
          <img :src="image + '/defaults/ipc-shopping/merchant/bg-activity_card@2x.png'" class="canvas-bg" v-if="image">
          <div class="canvas-text">
            <div class="title">
              <div class="tilte-left">异业联盟卡</div>
              <div class="tilte-right">
                <div class="text">预览活动</div>
                <img :src="image + '/defaults/ipc-shopping/home/icon-union_j@2x.png'" class="right" v-if="image">
              </div>
            </div>
            <div class="cavas-list">
              <div class="left">活动时间</div>
              <div class="right">2018-04-10至2018-05-10</div>
            </div>
            <div class="cavas-list">
              <div class="left">活动费用</div>
              <div class="right"><div class="icon">¥</div><div class="number">100</div></div>
            </div>
            <div class="cavas-list">
              <div class="left">活动地址</div>
              <div class="right">广州市白云区市桥商圈</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="activity-box">
      <div class="add-number">
        <div class="text">购买数量</div>
        <div class="calculate-box">
          <div class="subtract">-</div>
          <input type="number" class="number">
          <div class="add">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api'

  export default {
    data() {
      return {
        image: api.image
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .activity-content
    background: #F6F7FA
  .activity-detail
    position: relative
    padding-bottom: 27%
    .detail-bg
      width: 100%
    .detail-money
      width: 100%
      left: 0
      top: 19.5px
      text-align: center
      position: absolute
      .money
        layout(row)
        justify-content: center
        align-items: flex-end
        .icnon
          font-family: $font-family-regular
          font-size: $font-size-medium
          color: #FFFE5C
        .number
          line-height: 1
          color: #FFFE5C
          font-family: DINAlternate-Bold
          font-size: 30px
      .text
        margin-top: 5px
        font-family: $font-family-regular
        font-size: $font-size-medium
        color: $color-background-ff

    .detail-canvas
      box-sizing: border-box
      position: absolute
      top: 38%
      width: 100%
      padding: 0 15px
      left: 0
      .canvas-box
        width: 100%
        position: relative
        .canvas-bg
          width: 100%
        .canvas-text
          box-sizing: border-box
          top: 0
          left: 0
          padding-left: 15px
          position: absolute
          width: 100%
          .title
            layout(row)
            box-sizing: border-box
            justify-content: space-between
            width: 100%
            line-height: 45px
            height: 45px
            padding-right: 8px
            cut-off-rule-bottom(0, 0, rgba(255,255,255,0.16), 0.5px)
            .tilte-left
              font-family: $font-family-regular
              font-size: $font-size-medium-x
              color: $color-background-ff
            .tilte-right
              layout(row)
              font-family: $font-family-light
              font-size: $font-size-small
              color: $color-background-ff
              align-items: center
              .right
                height: 18px
                display: block
                margin-left: 5px
                width: 15px
          .cavas-list
            layout(row)
            margin-top: 18px
            &:first-child
              margin-top: 15px
            .left
              margin-right: 14px
              font-family: $font-family-light
              font-size: $font-size-medium
              color: rgba(255,255,255,0.60)
            .right
              layout(row)
              font-family: $font-family-light
              font-size: $font-size-medium
              color: $color-background-ff
              align-items: flex-end
              .icon
                font-size: 9px
              .number
                line-height: 1
  .activity-box
    padding: 0 15px
    .add-number
      vertical-line()
      height: 50px
      border-radius: 3px
      padding: 0 15px
      background: $color-background-ff
      layout(row)
      justify-content: space-between
      align-items: center
      .text
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-text-2d
      .calculate-box
        layout(row)
        .subtract
          border: 0.5px solid #EDEDED
          width: 22px
          height: 22px
          color: $color-assist-34
          text-align: center
          line-height: 22px
          background: #FFFFFF
          border-radius: 1px
        .number
          width: 48px
          height: 22px
          min-height: 22px
          margin: 0 2.5px
          display: block
          text-align: center
          font-family: $font-family-light
          font-size: $font-size-medium
          color: $color-text-2d
          border: 0.5px solid #EDEDED
        .add
          border: 0.5px solid #3460EC
          width: 22px
          height: 22px
          color: $color-background-ff
          text-align: center
          line-height: 22px
          background: #3460EC
          border-radius: 1px
</style>
