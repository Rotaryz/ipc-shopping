<template>
    <div class="data-box">
      <div class="data-tab">
        <div class="tab-merchant active">商家版</div>
        <div class="tab-merchant">员工榜</div>
      </div>
      <div class="tab-merchant-box"  hidden="true">
        <div class="merchant-title">
          <div class="merchant-title-tab active">国颐堂榜</div>
          <div class="merchant-title-tab">总榜</div>
        </div>
        <div class="self-merchant">
          <div class="self-top">
            <div class="data-title">
              <div class="text">时间</div>
              <div class="text">售卡数</div>
              <div class="text">他店核销数</div>
              <div class="text">联盟力</div>
            </div>
            <div class="data-content">
              <scroll-view class="content-scroll" @scrolltolower="test22" scroll-y="true">
                <div class="self-merchant-list">
                  <div class="selft-merchant-list-box">04-12</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                </div>
                <div class="self-merchant-list">
                  <div class="selft-merchant-list-box">04-12</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                </div>
                <div class="self-merchant-list">
                  <div class="selft-merchant-list-box">04-12</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                </div>
                <div class="self-merchant-list">
                  <div class="selft-merchant-list-box">04-12</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                </div>
                <div class="self-merchant-list">
                  <div class="selft-merchant-list-box">04-12</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                </div>
                <div class="self-merchant-list">
                  <div class="selft-merchant-list-box">04-12</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                  <div class="selft-merchant-list-box">100</div>
                </div>
              </scroll-view>
              <div class="all-box">
                <div class="text">总计</div>
                <div class="text">2000</div>
                <div class="text">80</div>
                <div class="text">120</div>
              </div>
            </div>
          </div>
          <div class="self-bottom">
            <img  :src="image + '/defaults/ipc-shopping/activitydata/pic-activity_banner01@2x.png'" alt="" mode="widthFix" v-if="image">
            <div class="moeny-box">
              <div class="number-box"><div class="icon">¥</div><div class="number">10000</div></div>
              <div class="text">正在等待抢钱</div>
            </div>
          </div>
        </div>
        <div class="all-merchant">
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
        </div>
      </div>
      <div class="tab-staff-box">
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
        <div class="all-staff">
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
      },
      methods: {
        test22 () {
          console.log(22)
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .data-box
    padding-bottom: 30px
  .page-bg
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    background: #1A1D3D
  .data-tab
    border: .5px solid #3460EC
    layout(row)
    width: 264px
    margin: 10px auto 27px
    border-radius: 3px
    .tab-merchant
      font-family: $font-family-light
      font-size: $font-size-medium
      color: $color-text-95
      text-align: center
      height: 27px
      line-height: 27px
      flex: 1
    .active
      background: $color-assist-34
      color: $color-background-ff
  .merchant-title
    layout(row)
    justify-content: center
    margin-bottom: 12px
    .merchant-title-tab
      no-wrap()
      width: 100px
      text-align: center
      font-family: $font-family-light
      font-size: $font-size-medium
      color: $color-text-95
      padding-bottom: 10px
      position: relative
    .active
      color: $color-background-ff
      cut-off-rule-bottom(35px, 35px, $color-assist-34, 2px)
  .self-merchant /* 个人店铺 */
    padding: 0 12px
    .self-top
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
          height: 128.5px
          .self-merchant-list
            layout(row)
            font-family: DINAlternate-Bold
            font-size: $font-size-medium
            color: $color-text-95
            height: 40px
            line-height: 40px
            cut-off-rule-bottom(0, 0, rgba(255,255,255,0.16), 0.5px)
            .selft-merchant-list-box
              flex: 1
              &:last-child
                text-align: right
                position: relative
                right: 30px
      .all-box
        layout(row)
        font-size: $font-size-medium-x
        font-family: DINAlternate-Bold
        height: 50px
        line-height: 50px
        color: $color-background-ff
        border-bottom-left-radius: 3px
        border-bottom-right-radius: 3px
        cut-off-rule-top(0, 0, rgba(255,255,255,0.16), 0.5px)
        .text
          flex: 1
          &:first-child
            font-family: $font-family-meddle
            font-size: $font-size-medium
            color: $color-assist-34
          &:last-child
            text-align: right
            position: relative
            right: 30px
    .self-bottom
      position: relative
      margin-top: 10px
      box-shadow: 0 2px 20px 0 rgba(0,0,0,0.15)
      img
        width: 100%
        display: block
      .moeny-box
        width: 100%
        left: 0
        right: 0
        top: 40px
        text-align: center
        position: absolute
        .number-box
          layout(row)
          justify-content: center
          align-items: flex-end
          .icon
            font-family: $font-family-regular
            color: #FFFE5C
            font-size: $font-size-medium
            line-height: 1
          .number
            line-height: 1
            font-family: DINAlternate-Bold
            color: #FFFE5C
            font-size: 30px
        .text
          margin-top: 8px
          line-height: 1
          font-family: $font-family-regular
          color: $color-background-ff
          font-size: $font-size-medium
  .all-merchant /* 店铺总榜 */
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
            .selft-merchant-list-box
              flex: 1
              &:first-child
                no-wrap()
              &:last-child
                text-align: right
                position: relative
                right: 30px
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
