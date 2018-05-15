<template>
  <div class="card-box">
    <div class="box-top">
      <active-card :useType="1" @previewHandler="test"></active-card>
    </div>
    <div class="merchant-box">
      <div class="box-left">
        <img :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image" class="box-img">
        <div class="text">国颐堂店铺</div>
      </div>
      <div class="box-right">
        <div class="text">100</div>
        <img :src="image + '/defaults/ipc-shopping/aliance/icon-union_j@2x.png'" v-if="image" class="box-img">
      </div>
    </div>
    <div class="staff-box">
      <div class="staff-list">
        <div class="box-left">
          <img :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image" class="box-img">
          <div class="text">国颐堂店铺</div>
        </div>
        <div class="box-right">
          <div class="text">100</div>
          <img :src="image + '/defaults/ipc-shopping/aliance/icon-union_j@2x.png'" v-if="image" class="box-img">
        </div>
      </div>
      <div class="staff-list">
        <div class="box-left">
          <img :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image" class="box-img">
          <div class="text">国颐堂店铺</div>
        </div>
        <div class="box-right">
          <div class="text">100</div>
          <img :src="image + '/defaults/ipc-shopping/aliance/icon-union_j@2x.png'" v-if="image" class="box-img">
        </div>
      </div>
      <div class="staff-list">
        <div class="box-left">
          <img :src="image + '/defaults/ipc-shopping/activitydata/timg.jpg'" v-if="image" class="box-img">
          <div class="text">国颐堂店铺</div>
        </div>
        <div class="box-right">
          <div class="text">100</div>
          <img :src="image + '/defaults/ipc-shopping/aliance/icon-union_j@2x.png'" v-if="image" class="box-img">
        </div>
      </div>
    </div>
    <div class="model-box">
      <div class="model-con">
        <div class="model-top">
          <div class="top-title">陈晨晨</div>
          <div class="add-number">
            <div class="text">数量</div>
            <div class="calculate-box">
              <div class="subtract">-</div>
              <input type="number" class="number">
              <div class="add">+</div>
            </div>
          </div>
        </div>
        <div class="model-bg">数量超过范围</div>
        <div class="bottom-btn">
          <div class="btn">取消</div>
          <div class="btn">保存</div>
        </div>
      </div>
    </div>
    <div class="page-bg"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'
  import ActiveCard from 'components/active-card-item/active-card-item'
  export default {
    data() {
      return {
        image: baseURL.image
      }
    },
    components: {
      ActiveCard
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .page-bg
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    background: #F6F7FA
  .box-top
    padding: 10px 15px
  .merchant-box
    height: 54px
    background: $color-background-ff
    layout(row)
    justify-content: space-between
    align-items: center
    padding: 0 15px
    .box-left
      layout(row)
      align-items: center
      .box-img
        display: block
        width: 34px
        height: 34px
        border-radius: 50%
      .text
        margin-left: 10px
        font-family: $font-family-light
        font-size: $font-size-medium
        color: $color-text-2d
    .box-right
      font-family: $font-family-light
      font-size: $font-size-small
      color: $color-assist-34
      layout(row)
      align-items: center
      .input-text
        height: 20px
        width: 40px
      .box-img
        width: 12px
        height: 15px
        display: block
  .staff-box
    margin-top: 10px
    padding-left: 15px
    background: $color-background-ff
    .staff-list
      layout(row)
      height: 54px
      background: $color-background-ff
      justify-content: space-between
      align-items: center
      padding-right: 15px
      cut-off-rule-bottom()
      &:last-child
        cut-off-rule-bottom(50%, 50%)
      .box-left
        layout(row)
        align-items: center
        .box-img
          display: block
          width: 34px
          height: 34px
          border-radius: 50%
        .text
          margin-left: 10px
          font-family: $font-family-light
          font-size: $font-size-medium
          color: $color-text-2d
      .box-right
        font-family: $font-family-light
        font-size: $font-size-small
        color: $color-assist-34
        layout(row)
        align-items: center
        .input-text
          height: 20px
          width: 40px
        .box-img
          width: 12px
          height: 15px
          display: block
  .model-box
    position: fixed
    width: 100%
    height: 100%
    left: 0
    top: 0
    z-index: 2
    background: rgba(0, 0, 0, .7)
    .model-con
      position: absolute
      width: 100%
      left: 0
      top: 0
      .model-top
        background: $color-background-ff
        padding-left: 15px
        .top-title
          font-family: $font-family-light
          font-size: $font-size-medium
          color: #464646
          cut-off-rule-bottom()
          line-height: 45px
          height: 45px
        .add-number
          height: 45px
          border-radius: 3px
          padding-right: 15px
          background: $color-background-ff
          layout(row)
          justify-content: space-between
          align-items: center
          .text
            font-family: $font-family-light
            font-size: $font-size-medium
            color: $color-text-46
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
      .model-bg
        padding-right: 15px
        padding-top: 9.5px
        text-align: right
        height: 187px
        font-family: $font-family-light
        font-size: $font-size-small-s
        color: #F2633E
        background: #F6F7FA
      .bottom-btn
        layout(row)
        .btn
          flex: 1
          normal-button-default()
          border-radius: 0
          &:first-child
            normal-button-default(#273156)
</style>
