<template>
  <article class="active-card-item">
    <!--商家活动管理-->
    <section class="wrap" v-if="useType === constUseType.shop">
      <div class="box">
        <div class="box-bg">
          <img class="box-bg-pic" mode="widthFix" v-if="imageUri" :src="imageUri + '/defaults/ipc-shopping/aliance/pic-activity_cardp@2x.png'"/>
        </div>
        <article :class="['b-top',downStyle?'down-status':'']" @tap="previewHandler(cardInfo)">
          <div class="b-top-box">
            <section class="icon">
              <div class="icon-pic">
                <div class="box-bg">
                  <img class="box-bg-pic" mode="aspectFit" v-if="imageUri" :src="imageUri + '/defaults/ipc-shopping/aliance/pic-activity_cardp2@2x.png'"/>
                </div>
              </div>
            </section>
            <artilce class="info-box">
              <div class="info-t-d">
                <section class="title">{{cardInfo.name}}</section>
                <section class="date">{{cardInfo.end_at}}</section>
              </div>
              <section class="info">
                <div class="i-item">销量 {{cardInfo.sale_count}}</div>
                <div class="i-item">核销力 {{cardInfo.verification_power}}</div>
              </section>
            </artilce>
            <section class="look-over">
              <span class="txt">预览</span>
              <img class="arrow-right" mode="aspectFit" v-if="imageUri" :src="arrowImg"/>
            </section>
          </div>
        </article>
        <article class="b-bottom" v-if="cardInfo.status === constStatus.addCoupon">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn last" @tap="applyHandler(cardInfo)">添加优惠券</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.status === constStatus.changeCoupon">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn last" @tap="applyHandler(cardInfo)">修改优惠券</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.status === constStatus.lookOver">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn last" @tap="applyHandler(cardInfo)">查看</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.status === constStatus.up">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn delete" @tap="buyHandler(cardInfo)">复购</div>
          <div class="btn delete" @tap="allocHandler(cardInfo)">分配</div>
          <div class="btn last" @tap="totalHandler(cardInfo)">统计</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.status === constStatus.down">
          <div class="title">{{cardInfo.statusStr}}</div>
          <!--<div class="btn delete" @tap="deleteHandler(cardInfo)">删除</div>-->
          <div class="btn last" @tap="totalHandler(cardInfo)">统计</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.status === constStatus.apply">
          <div class="title">报名中</div>
          <div class="btn last" @tap="applyHandler(cardInfo)">报名</div>
        </article>
      </div>
    </section>
    <!--员工活动管理-->
    <section class="wrap" v-if="useType === constUseType.staffModel">
      <div class="box">
        <div class="box-bg">
          <img class="box-bg-pic" mode="widthFix" v-if="imageUri" :src="imageUri + '/defaults/ipc-shopping/aliance/pic-activity_cardp@2x.png'"/>
        </div>
        <article :class="['b-top',downStyle?'down-status':'']" @tap="previewHandler(cardInfo)">
          <div class="b-top-box">
            <section class="icon">
              <div class="icon-pic">
                <div class="box-bg">
                  <img class="box-bg-pic" mode="aspectFit" v-if="imageUri" :src="imageUri + '/defaults/ipc-shopping/aliance/pic-activity_cardp2@2x.png'"/>
                </div>
              </div>
            </section>
            <artilce class="info-box">
              <div class="info-t-d">
                <section class="title">{{cardInfo.name}}</section>
                <section class="date">{{cardInfo.end_at}}</section>
              </div>
              <section class="info">
                <div class="i-item staff-item">可销售数量 {{cardInfo.store}}</div>
              </section>
            </artilce>
            <section class="look-over">
              <span class="txt">预览</span>
              <img class="arrow-right" mode="aspectFit" v-if="imageUri" :src="arrowImg"/>
            </section>
          </div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constStatus.staffUp">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn " @tap="addHandCode(cardInfo)">二维码</div>
          <div class="btn last" @tap="addHandData(cardInfo)">统计</div>
        </article>
        <article class="b-bottom" v-if="cardInfo.statusCode === constStatus.staffDown">
          <div class="title">{{cardInfo.statusStr}}</div>
          <div class="btn last" @tap="addHandData(cardInfo)">统计</div>
        </article>
      </div>
    </section>
    <!--商家活动分配-->
    <section class="wrap alloc-status" v-if="isAlloct">
      <div class="box">
        <div class="box-bg">
          <img class="box-bg-pic" mode="widthFix" v-if="imageUri" :src="imageUri + '/defaults/ipc-shopping/aliance/bg-staff_card@2x.png'"/>
        </div>
        <article class="b-top" @tap="previewHandler(cardInfo)">
          <div class="b-top-box">
            <section class="icon">
              <div class="icon-pic">
                <div class="box-bg">
                  <img class="box-bg-pic" mode="aspectFit" v-if="imageUri" :src="imageUri + '/defaults/ipc-shopping/aliance/pic-activity_cardp2@2x.png'"/>
                </div>
              </div>
            </section>
            <artilce class="info-box">
              <div class="info-t-d">
                <section class="title">{{cardInfo.title}}</section>
                <section class="date">{{cardInfo.endDate}}</section>
              </div>
              <section class="info">
                <div class="i-item">可用库存 {{cardInfo.store}}</div>
              </section>
            </artilce>
            <section class="look-over">
              <span class="txt">预览</span>
              <img class="arrow-right" mode="aspectFit" v-if="imageUri" :src="arrowImg"/>
            </section>
          </div>
        </article>
      </div>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'
  import source from 'common/source'

  // 状态常量默认值
  const DEFAULT_CONST_STATUS = {
    lookOver: 2, // 查看(审核中-报名成功-报名失败)
    addCoupon: 0, // 添加优惠券,
    apply: 1, // 报名中
    changeCoupon: 3, // 修改优惠券
    up: 10, // 上架
    down: 11, // 下架
    staffDown: 102, // 下架
    staffUp: 101 // 上架
  }

  // 使用场景默认值
  const DEFAULT_USE_TYPE = {
    shop: 0, // 活动管理
    shopAllot: 1, // 活动分配
    staffModel: 100 // 员工模式
  }

  // 卡券信息的默认值-盟主管理
  const DEFAULT_CARD_INFO_UNION = {
    title: '异业联盟免费卡',
    endDate: '2018-01-17到期',
    sales: '100', // 销量
    chargeOff: '60', // 核销
    statusCode: DEFAULT_CONST_STATUS.down,
    statusStr: '已上架'
  }

  // 卡券信息的默认值-盟主审核
  const DEFAULT_CARD_INFO_ALLOT = {
    title: '异业联盟免费卡',
    endDate: '2018-01-17到期',
    store: '100'
  }

  export default {
    props: {
      cardInfo: {
        type: Object,
        default: DEFAULT_CARD_INFO_UNION || DEFAULT_CARD_INFO_ALLOT
      },
      constStatus: {
        type: Object,
        default: DEFAULT_CONST_STATUS
      },
      useType: {
        type: Number,
        default: DEFAULT_USE_TYPE.shop
      },
      constUseType: {
        type: Object,
        default: DEFAULT_USE_TYPE
      }
    },
    data () {
      return {
        imageUri: baseURL.image
      }
    },
    methods: {
      previewHandler (cardInfo) {
        this.$emit('previewHandler', cardInfo)
      },
      editorHandler (cardInfo) {
        this.$emit('editorHandler', cardInfo)
      },
      totalHandler (cardInfo) {
        this.$emit('totalHandler', cardInfo)
      },
      deleteHandler (cardInfo) {
        this.$emit('deleteHandler', cardInfo)
      },
      changeHandler (cardInfo) {
        this.$emit('changeHandler', cardInfo)
      },
      lookHandler (cardInfo) {
        this.$emit('lookHandler', cardInfo)
      },
      buyHandler (cardInfo) {
        this.$emit('buyHandler', cardInfo)
      },
      allocHandler (cardInfo) {
        this.$emit('allocHandler', cardInfo)
      },
      applyHandler (cardInfo) {
        this.$emit('applyHandler', cardInfo)
      },
      addHandCode (cardInfo) {
        this.$emit('addHandCode', cardInfo)
      },
      addHandData (cardInfo) {
        this.$emit('addHandData', cardInfo)
      }
    },
    computed: {
      downStyle () {
        return this.cardInfo.statusCode === this.constStatus.down
      },
      isAlloct () {
        return this.useType === this.constUseType.shopAllot
      },
      arrowImg () {
        return source.imgArrowRight('img')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .active-card-item
    position: relative
    background-color: $color-background-ff
    box-shadow: 1px 8px 21px 0 rgba(179, 187, 218, 0.23)
    border-radius: 3px
    overflow: hidden
    .wrap
      position: relative
      height: 0
      padding-top: 39.855072463768%
      &.alloc-status
        padding-top: 27.246376811594%
      .box
        layout()
        fill-box()
        .box-bg
          fill-box()
          .box-bg-pic
            height: 100%
            width: 100%
        .b-top
          position: relative
          height: 0
          padding-top: 27.391304347826%
          &.down-status
            content: ''
            background-color: rgba(255, 255, 255, .6)
          .b-top-box
            fill-box()
            layout(row)
            align-items: center
            justify-content: flex-start
            padding: 10.5px 0 10px 10px
            font-family: $font-family-light
            color: $color-background-ff
            .icon
              position: relative
              width: 26.086956521739%
              height: 100%
              margin-right: 7px
              layout()
              justify-content: center
              .icon-pic
                width: 100%
                height: 0
                padding-top: 82.22222222222%
                border-radius: 3px
                position: relative
                .box-bg
                  fill-box()
                  .box-bg-pic
                    height: 100%
                    width: 100%
            .look-over
              height: 100%
              padding-right: 12px
              flex: 1
              layout(row)
              height: 100%
              justify-content: flex-end
              align-items: center
              .txt
                width: 20px
                font-size: $font-size-small-s
                line-height: $font-size-small-s
                padding-right: 5px
              .arrow-right
                height: 12px
                width: 12px
            .info-box
              width: 54%
              height: 100%
              layout()
              justify-content: space-around
              box-sizing: border-box
              .info-t-d
                layout()
                .title
                  no-wrap()
                  font-family: $font-family-regular
                  font-size: $font-size-medium-x
                  line-height: $font-size-medium-x
                  padding-bottom: 6px
                .date
                  color: rgba(255, 255, 255, 0.6)
                  font-size: $font-size-small-s
                  line-height: $font-size-small-s
              .info
                font-size: $font-size-small
                line-height: $font-size-small
                layout(row)
                justify-content: flex-start
                align-items: center
                &.applying
                  align-items: flex-end
                .i-item
                  font-family: $font-family-light
                  font-size: $font-size-small
                  notice-icon()
                  margin-right: 6px
                  &.staff-item
                    background-color: transparent
                    padding: 0
                .money
                  font-family: $font-family-bold
                  font-size: $font-size-large-xx
                  line-height: $font-size-large-xx
                  margin-right: 9px
                  .m-symbol
                    display: inline
                    font-family: $font-family-light
                    font-size: $font-size-small
                    line-height: $font-size-small
        .b-bottom
          flex: 1
          padding: 0 10px
          layout(row, block, no-wrap)
          align-items: center
          position: relative
          .title
            flex: 1
            font-family: $font-family-light
            font-size: $font-size-small
            color: $color-text-2d
          .btn
            margin-left: 10px
            function-button()
            &:last-child
              function-button($color-assist-6d)
          .shop-list-item
            layout(row, block, no-wrap)
            align-items: center
            box-sizing: border-box
            width: 26.0615384615384%
            height: 100%
            position: relative
            padding-right: 4.3478260869565%
            .shop-icon
              width: 17.5px
              height: 12.5px
              margin-right 4px
            .shop-name
              font-family: $font-family-regular
              font-size: $font-size-small
              color: $color-assist-47
              no-wrap()


</style>
