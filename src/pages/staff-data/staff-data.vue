<template>
  <div class="data-box">
    <div class="merchant-title">
      <div class="merchant-title-tab active">国颐堂榜</div>
      <div class="merchant-title-tab">总榜</div>
    </div>
    <div class="self-staff" hidden="true">
      <div class="all-top">
        <div class="data-title">
          <div class="text">排名</div>
          <div class="text">名称</div>
          <div class="text">数量</div>
          <div class="text">总收益(元)</div>
        </div>
        <div class="data-content">
          <scroll-view class="content-scroll" @scrolltolower="test22" scroll-y="true">
            <div class="self-merchant-list">
              <div class="self-staff-list-box user-box">
                <div class="number">1</div>
                <img class="img" :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image">
              </div>
              <div class="self-staff-list-box">美容美甲美容美甲</div>
              <div class="self-staff-list-box">100</div>
              <div class="self-staff-list-box money-box">
                <div class="icon">¥</div>
                <div class="money">2000</div>
              </div>
            </div>
            <div class="self-merchant-list">
              <div class="self-staff-list-box user-box">
                <div class="number">2</div>
                <img class="img" :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image">
              </div>
              <div class="self-staff-list-box">美容美甲美容美甲</div>
              <div class="self-staff-list-box">100</div>
              <div class="self-staff-list-box money-box">
                <div class="icon">¥</div>
                <div class="money">2000</div>
              </div>
            </div>
            <div class="self-merchant-list">
              <div class="self-staff-list-box user-box">
                <div class="number">3</div>
                <img class="img" :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image">
              </div>
              <div class="self-staff-list-box">美容美甲美容美甲</div>
              <div class="self-staff-list-box">100</div>
              <div class="self-staff-list-box money-box">
                <div class="icon">¥</div>
                <div class="money">2000</div>
              </div>
            </div>
            <div class="self-merchant-list">
              <div class="self-staff-list-box user-box">
                <div class="number">4</div>
                <img class="img" :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image">
              </div>
              <div class="self-staff-list-box">美容美甲美容美甲</div>
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
              <div class="self-staff-list-box">美容美甲美容美甲</div>
              <div class="self-staff-list-box">100</div>
              <div class="self-staff-list-box money-box">
                <div class="icon">¥</div>
                <div class="money">2000</div>
              </div>
            </div>
          </scroll-view>
        </div>
      </div>
    </div>
    <div class="all-staff" >
      <div class="all-staff-box">
        <div class="rank-list">
          <img v-if="image" :src="image + '/defaults/ipc-shopping/activitydata/bg-activity_lizi@2x.png'" class="rank-bg" mode="widthFix">
          <div class="rank-box rank-two">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_second@2x.png'" v-if="image" class="hard-img-crown">
              <img :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_second2@2x.png'" v-if="image" class="img">
              <div class="name">销售小能手</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">核销力</div>
              <div class="right-text">638</div>
            </div>
          </div>
          <div class="rank-box rank-two rank-one">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_first@2x.png'" v-if="image" class="hard-img-crown">
              <img :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_first1@2x.png'" v-if="image" class="img">
              <div class="name first-name">销售小能手</div>
            </div>
            <div class="rank-two-bottom">
              <div class="left-text">核销力</div>
              <div class="right-text">638</div>
            </div>
          </div>
          <div class="rank-box rank-two">
            <div class="rank-two-hard">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_third@2x.png'" v-if="image" class="hard-img-crown">
              <img :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image" class="hard-img">
            </div>
            <div class="rank-two-text">
              <img :src="image + '/defaults/ipc-shopping/activitydata/icon-activity_third3@2x.png'" v-if="image" class="img">
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
  export default {
    data () {
      return {
        image: Api.image
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
  .self-staff /* 店铺员工 */
    padding: 0 12px
    .all-top
      background: $color-assist-27
      box-shadow: 0 2px 20px 0 rgba(0,0,0,0.15)
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
            cut-off-rule-bottom(0, 0, rgba(255,255,255,0.16), 0.5px)
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
          .self-merchant-list
            &:nth-of-type(1)
              .user-box
                .number
                  color: #FFD708
            &:nth-of-type(2)
              .user-box
                .number
                  color: #7CC1E7
            &:nth-of-type(3)
              .user-box
                .number
                  color: #C9826B
  .all-staff /* 员工总榜 */
    padding: 0 12px
    .all-staff-box
      background: $color-assist-27
      box-shadow: 0 2px 20px 0 rgba(0,0,0,0.15)
      border-radius: 3px
      padding-bottom: 29.5px
      position: relative
      .rank-list
        layout(row)
        padding: 0 20px
        cut-off-rule-bottom(0, 0, rgba(255,255,255,0.16), 0.5px)
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
          cut-off-rule-bottom(0, 0, rgba(255,255,255,0.16), 0.5px)
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
</style>
