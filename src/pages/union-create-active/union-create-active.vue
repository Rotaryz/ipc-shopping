<template>
  <article class="union-create-active">
    <form class="u-c-form">
      <section class="u-c-section base-info">
        <article class="b-i-item">
          <div class="title">活动名称</div>
          <div class="content">
            <input class="c-input" type="text" placeholder="异业联盟活动" placeholder-class="content">
          </div>
        </article>
        <article class="b-i-item">
          <div class="title">活动时间</div>
          <div class="content">
            <input class="c-input" type="text" placeholder="异业联盟活动" placeholder-class="content">
          </div>
        </article>
        <article class="b-i-item">
          <div class="title">活动地址</div>
          <div class="content">
            <input class="c-input" type="text" placeholder="异业联盟活动" placeholder-class="content">
          </div>
        </article>
        <article class="b-i-item">
          <div class="title">活动费用</div>
          <div class="content">
            <input class="c-input" type="text" placeholder="异业联盟活动" placeholder-class="content">
          </div>
        </article>
        <article class="b-i-item">
          <div class="title">卡券数量</div>
          <div class="content">
            <input class="c-input" type="text" placeholder="异业联盟活动" placeholder-class="content">
          </div>
        </article>
      </section>
      <section class="u-c-section active-prize">
        <div class="s-title">活动奖品</div>
        <dl class="b-i-item" v-for="(item,index) in activePrizeList" :key="index">
          <dt class="title">{{item.title}}</dt>
          <dd class="content">{{item.content}}</dd>
        </dl>
      </section>
      <section class="u-c-section active-info">
        <article class="a-i-item">
          <dl class="title-main">活动奖励</dl>
          <dl class="title-sub">凡成功参与该活动的商家，可以到的的好处：</dl>
          <dd class="content">
            <div class="c-item" v-for="(item,index) in activeInfoList[0]" :key="index">{{item}}</div>
          </dd>
        </article>
        <article class="a-i-item">
          <dl class="title-main">活动要求</dl>
          <dl class="title-sub">凡报名参加活动的商家，需同意以下活动要求：</dl>
          <dd class="content">
            <div class="c-item" v-for="(item,index) in activeInfoList[1]" :key="index">{{item}}</div>
          </dd>
        </article>
        <article class="a-i-item">
          <dl class="title-main">活动明细</dl>
          <dd class="content">
            <div class="c-item" v-for="(item,index) in activeInfoList[2]" :key="index">{{item}}</div>
          </dd>
        </article>
      </section>
      <footer class="save-btn">保存</footer>
    </form>
  </article>
</template>

<script type="text/ecmascript-6">
  import wx from 'wx'

  const activePrizeList = [
    {
      title: '活动奖品一',
      content: '波尔多红酒'
    },
    {
      title: '活动奖品二',
      content: '10张10元代金券'
    },
    {
      title: '活动奖品三',
      content: '20张异业联盟券'
    }
  ]
  const activeInfoList = [
    [
      '1. 商家以及员工，每销售一张卡券，得到50元的奖',
      '励。\n',
      '2. 商家销售卡的用户，到其他门店使用一次，得到联盟力10分奖励。（可以分全部联盟商家报名该活动的报名金）\n',
      '3. 商家可以得到该活动全部商家的异业客户引流客户。'
    ], [
      '1. 用户购买异业联盟卡后，提供商品给用户。\n',
      '2. 添加商家自己的固定数量的免费优惠券。\n',
      '3. 支持平台提供的10元代金券，小程序买单的使用。'
    ], [
      '1. 本活动仅在XX商圈内开展。\n',
      '2. 该活动需要商家付费参加，如果报名没有通过，会立刻原路退款。\n',
      '3. 本次活动的最终解释权归赞播所有。'
    ]

  ]

  export default {
    props: {
      data: Object,
      son: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        model: 0,
        activePrizeList,
        activeInfoList
      }
    },
    beforeMount () {
      let title = `新建`
      this.isNewModel && wx.setNavigationBarTitle({title})
    },
    computed: {
      isNewModel () {
        return this.model === 0
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  $input-height = 45px // 导航栏高度

  .union-create-active
    position: relative
    min-height: 100vh
    background-color: $color-background-f6
    .u-c-form
      position: relative
      .u-c-section
        padding-left: 15px
        background-color: $color-background-ff
        margin-bottom: 10px
        &.active-info
          padding-right: 15px
          margin-bottom: 0
        .b-i-item
          position: relative
          layout(row)
          align-items: center
          height: $input-height
          line-height: $input-height
          box-sizing: border-box
          cut-off-rule-bottom()
          &:last-child:after
            content: ''
            border: none
          .title
            width: 96px
            height: 100%
            font-family: $font-family-light
            font-size: $font-size-medium
            color: $color-text-2d
          .content
            flex: 1
            height: 100%
            font-family: $font-family-light
            font-size: $font-size-medium
            color: $color-text-a4
            .c-input
              height: 100%
              width: 100%
        .s-title
          height: 42px
          line-height: 42px
          text-indent: 10px
          font-family: $font-family-regular
          font-size: $font-size-medium
          color: $color-text-2d
          vertical-line()
        .a-i-item
          font-family: $font-family-light
          font-size: $font-size-medium
          color: $color-text-2d
          cut-off-rule-bottom()
          padding-bottom: 17px
          &:last-child:after
            border: none
          .title-main
            height: 42px
            line-height: 42px
            text-indent: 10px
            font-family: $font-family-regular
            vertical-line()
          .title-sub
            height: 38px
            line-height: 38px
          .content
            position: relative
            .c-item
              font-family: $font-family-light
              font-size: $font-size-medium
              color: $color-text-2d
              letter-spacing: 0
              line-height: 21px
      .save-btn
        normal-button-default()
</style>
