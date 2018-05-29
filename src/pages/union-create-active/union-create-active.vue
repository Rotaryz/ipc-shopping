<template>
  <article class="union-create-active">
    <form class="u-c-form" @submit="formSubmit" report-submit='true'>
      <section class="u-c-section base-info">
        <article class="b-i-item">
          <div class="title">活动名称</div>
          <div class="content">
            <div class="c-input disable" v-if="!isNewModel" @tap="disableHandler">{{name}}</div>
            <input class="c-input" v-if="isNewModel" type="text" id='activeName' placeholder="请输入" placeholder-class="content" maxlength="20" :value="name" @input="inputHandler">
          </div>
        </article>
        <article class="b-i-item">
          <div class="title">活动时间</div>
          <div class="content">
            <picker class="content-picker-box" v-if="isNewModel" mode="date" :start="todayStartDate" @change="bindDateChange" id="start">
              <view class="picker">
                {{startDate}}
              </view>
            </picker>
            <section class="content-picker-box" v-if="!isNewModel" @tap="disableHandler">
              <div class="picker disable">
                {{startDate}}
              </div>
            </section>
            <div class="date-cut-off">至</div>
            <picker class="content-picker-box" v-if="isNewModel" mode="date" :start="endStartDate" @change="bindDateChange" id="end">
              <view class="picker">
                {{endDate}}
              </view>
            </picker>
            <section class="content-picker-box" v-if="!isNewModel" @tap="disableHandler">
              <view class="picker disable">
                {{endDate}}
              </view>
            </section>
          </div>
        </article>
        <article class="b-i-item">
          <div class="title">活动地址</div>
          <div class="content">
            <div class="c-input disable" v-if="!isNewModel" @tap="disableHandler">{{address}}</div>
            <input class="c-input" v-if="isNewModel" type="text" id='activeAddress' placeholder="请输入" placeholder-class="content" maxlength="20" :value="address" @input="inputHandler">
          </div>
        </article>
        <article class="b-i-item">
          <div class="title">活动费用</div>
          <em class="money">¥</em>
          <div class="content c-price ">
            <div class="c-input disable" v-if="!isNewModel" @tap="disableHandler">{{price}}</div>
            <input class="c-input" v-if="isNewModel" type="digit" id='activePrice' placeholder="0.00" placeholder-class="content" maxlength="7" :value="price" @input="inputHandler">
          </div>
        </article>
        <article class="b-i-item">
          <div class="title">卡券数量</div>
          <div class="content">
            <div class="c-input disable" v-if="!isNewModel" @tap="disableHandler">{{stock}}</div>
            <input class="c-input" v-if="isNewModel" type="number" id='activeStock' placeholder="0" placeholder-class="content" maxlength="7" :value="stock" @input="inputHandler">
          </div>
        </article>
      </section>
      <section class="u-c-section active-prize">
        <div class="s-title">活动奖品</div>
        <!--<dl class="b-i-item" v-for="(item,index) in activePrizeList" :key="index">-->
        <!--<dt class="title">{{item.title}}</dt>-->
        <!--<dd class="content">-->
        <!--<input class="c-input" type="text" :placeholder="item.content" placeholder-class="content" maxlength="15" :value="item.content">-->
        <!--</dd>-->
        <!--</dl>-->
        <dl class="b-i-item">
          <dt class="title">活动奖品一</dt>
          <dd class="content" @tap="disableHandler">
            <input class="c-input disable" type="text" id='activePrize0' disabled placeholder="波尔多红酒" placeholder-class="content" maxlength="15" :value="activePrizeList[0]" @input="inputHandler">
          </dd>
        </dl>
        <dl class="b-i-item">
          <dt class="title">活动奖品二</dt>
          <dd class="content" @tap="disableHandler">
            <input class="c-input disable" type="text" id='activePrize1' disabled placeholder="10张10元代金券" placeholder-class="content" maxlength="15" :value="activePrizeList[1]" @input="inputHandler">
          </dd>
        </dl>
        <dl class="b-i-item">
          <dt class="title">活动奖品三</dt>
          <dd class="content" @tap="disableHandler">
            <input class="c-input disable" type="text" id='activePrize2' disabled placeholder="20张异业联盟券" placeholder-class="content" maxlength="15" :value="activePrizeList[2]" @input="inputHandler">
          </dd>
        </dl>
      </section>
      <section class="u-c-section active-info">
        <article class="a-i-item">
          <dl class="title-main">活动奖励</dl>
          <dl class="title-sub">凡成功参与该活动的商家，可以到的的好处：</dl>
          <dd class="content">
            <!--<div class="c-item" v-for="(item,index) in activeInfoList[0]" :key="index">{{item}}</div>-->
            <div class="c-item">1. 商家以及员工，每销售一张卡券，得到<input class="c-input-info" id='activeInfo0' type="number" :value="activeInfo.item0" maxlength="4" placeholder="50" placeholder-class="content" @input="inputHandler"/>元的奖励。</div>
            <div class="c-item">2. 商家销售卡的用户，到其他门店使用一次，得到联盟力<input class="c-input-info" id='activeInfo1' type="number" :value="activeInfo.item1 " maxlength="4" placeholder="10" placeholder-class="content" @input="inputHandler"/>元的奖励。（可以分全部联盟商家报名该活动的报名金）</div>
            <div class="c-item">3. 商家可以得到该活动全部商家的异业客户引流客户。</div>
          </dd>
        </article>
        <article class="a-i-item">
          <dl class="title-main">活动要求</dl>
          <dl class="title-sub">凡报名参加活动的商家，需同意以下活动要求：</dl>
          <dd class="content">
            <!--<div class="c-item" v-for="(item,index) in activeInfoList[1]" :key="index">{{item}}</div>-->
            <div class="c-item">1. 用户购买异业联盟卡后，提供商品给用户。</div>
            <div class="c-item">2. 添加商家自己的固定数量的免费优惠券。</div>
            <div class="c-item">3. 支持平台提供的<input class="c-input-info" id='activeInfo2' type="number" :value="activeInfo.item2" maxlength="4" placeholder="10" placeholder-class="content" @input="inputHandler"/>元代金券，小程序买单的使用。</div>
          </dd>
        </article>
        <article class="a-i-item">
          <dl class="title-main">活动明细</dl>
          <dd class="content">
            <!--<div class="c-item" v-for="(item,index) in activeInfoList[2]" :key="index">{{item}}</div>-->
            <div class="c-item">1. 本活动仅在{{address}}内开展。</div>
            <div class="c-item">2. 该活动需要商家付费参加，如果报名没有通过，会立刻原路退款。</div>
            <div class="c-item">3. 本次活动的最终解释权归赞播所有。</div>
          </dd>
        </article>
      </section>
      <button class="save-btn" form-type="submit" @tap="saveHandler">保存</button>
    </form>
    <toast ref="toast"></toast>
  </article>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import {ERR_OK} from 'api/config'
  import * as wechat from 'common/js/wechat'
  import wx from 'wx'
  import util from 'common/js/format'
  import Toast from '@/components/toast/toast'

  const lineBreak = `<br/>`

  function awardNote(a, b) {
    return `1. 商家以及员工，每销售一张卡券，得到${a}元的奖励。${lineBreak}
            2. 商家销售卡的用户，到其他门店使用一次，得到联盟力${b}分奖励。（可以分全部联盟商家报名该活动的报名金）${lineBreak}
            3. 商家可以得到该活动全部商家的异业客户引流客户。`
  }

  function claimNote(a) {
    return `1. 用户购买异业联盟卡后，提供商品给用户。${lineBreak}
            2. 添加商家自己的固定数量的免费优惠券。${lineBreak}
            3. 支持平台提供的${a}元代金券，小程序买单的使用。`
  }

  function detailNote(a) {
    return `1. 本活动仅在${a}内开展。${lineBreak}
            2. 该活动需要商家付费参加，如果报名没有通过，会立刻原路退款。${lineBreak}
            3. 本次活动的最终解释权归赞播所有。`
  }

  export default {
    data() {
      return {
        model: 0,
        id: '',
        name: '',
        startDate: null,
        endDate: null,
        address: '',
        price: '',
        stock: '',
        activePrizeList: [],
        activeInfo: {}
      }
    },
    beforeMount() {
      let title = `新建`
      this.isNewModel && wx.setNavigationBarTitle({title})
      this._init()
    },
    mounted() {
    },
    methods: {
      _init() {
        this.model = this.$root.$mp.query.model * 1
        // this.name = `异业联盟活动`
        this.startDate = this.todayStartDate
        this.endDate = this.endStartDate
        // this.address = `广州市白云区市桥商圈`
        // this.price = 100
        // this.stock = 1000
        this.activePrizeList = ['波尔多红酒', '10张10元代金券', '20张异业联盟券']
        this.activeInfo = {'item0': 50, 'item1': 10, 'item2': 10}
        if (!this.isNewModel) {
          this.id = this.$root.$mp.query.activeId
          let data = {id: this.id}
          this._rqGetActiveList(data)
        }
      },
      disableHandler() {
        this.$refs.toast.show('不可修改')
      },
      inputHandler(e) {
        let id = e.target.id
        let value = e.target.value
        switch (id) {
          case 'activeName': {
            this.name = value
            break
          }
          case 'activeAddress': {
            this.address = value
            break
          }
          case 'activePrice': {
            let re = /([0-9]+\.[0-9]{2})[0-9]*/
            value = value.replace(re, '$1')
            if (isNaN(value * 1)) {
              return this.price
            }
            this.price = value
            return value
          }
          case 'activeStock': {
            this.stock = value
            break
          }
          // case 'activePrize0': {
          //   this.activePrizeList[0] = value
          //   break
          // }
          // case 'activePrize1': {
          //   this.activePrizeList[1] = value
          //   break
          // }
          // case 'activePrize2': {
          //   this.activePrizeList[2] = value
          //   break
          // }
          case 'activeInfo0': {
            this.activeInfo.item0 = value
            break
          }
          case 'activeInfo1': {
            this.activeInfo.item1 = value
            break
          }
          case 'activeInfo2': {
            this.activeInfo.item2 = value
            break
          }
        }
      },
      _checkSaveInfo() {
        // 日期
        if (new Date(this.endDate) - new Date(this.startDate) <= 0) {
          this.$refs.toast.show('结束时间不能小于开始时间')
          return false
        }
        // 价格
        let re = /([0-9]+\.[0-9])[0-9]*|^([1-9][0-9]*)$/
        if (isNaN(this.price * 1)) {
          this.$refs.toast.show('请输入正确的价格')
          return false
        } else if (!re.test('' + this.price)) {
          this.$refs.toast.show('请输入正确的价格')
          return false
        }
        return true
      },
      formSubmit(e) {
        if (!this._checkSaveInfo()) return
        let formId = e.mp.detail.formId
        let data = {'form_ids': [formId]}
        api.homeCollectFormId(data)
      },
      saveHandler() {
        switch (this.model) {
          case 0 : {
            if (!this._checkSaveInfo()) return
            this._rqCreateActive(this._packData())
            break
          }
          case 1: {
            if (!this._checkSaveInfo()) return
            this._rqUpdateActive(this._packData())
            break
          }
        }
      },
      bindDateChange(e) {
        const id = e.target.id
        const value = e.mp.detail.value
        switch (id) {
          case 'start': {
            this.startDate = value
            break
          }
          case 'end': {
            this.endDate = value
            break
          }
        }
      },
      _packData() {
        return {
          id: this.id,
          name: this.name,
          start_at: this.startDate,
          end_at: this.endDate,
          address: this.address,
          price: this.price,
          stock: this.stock,
          attach: this.activeInfo,
          award_note: awardNote(this.activeInfo.item0, this.activeInfo.item1),
          claim_note: claimNote(this.activeInfo.item2),
          detail_note: detailNote(this.address)
        }
      },
      _resolveReqData(json) {
        let res = json.data
        this.name = res.name
        this.startDate = res.start_at
        this.endDate = res.end_at
        this.address = res.address
        this.price = res.price
        this.stock = res.stock
        // this.activePrizeList = ['波尔多红酒', '10张10元代金券', '20张异业联盟券']
        res.attach && (this.activeInfo = res.attach)
      },
      // 获取活动信息
      _rqGetActiveList(data) {
        api.uctGetActive(data)
          .then(json => {
            if (json.error !== ERR_OK) {
              return ''
            }
            wechat.hideLoading()
            this._resolveReqData(json)
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 创建活动
      _rqCreateActive(data) {
        api.uctCreateActive(data)
          .then(json => {
            wechat.hideLoading()
            if (json.error !== ERR_OK) {
              this.$refs.toast.show(json.message)
              return ''
            }
            wechat.tipSuccess('操作成功')
            this.$router.back()
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 修改活动
      _rqUpdateActive(data) {
        api.uctUpdateActive(data)
          .then(json => {
            wechat.hideLoading()
            if (json.error !== ERR_OK) {
              this.$refs.toast.show(json.message)
              return ''
            }
            this.$router.back()
          })
          .catch(err => {
            console.info(err)
          })
      }
    },
    computed: {
      isNewModel() {
        return this.model === 0
      },
      todayStartDate() {
        return util.formatTimeYMD(util.now + 1000 * 60 * 60 * 24)
      },
      endStartDate() {
        return util.formatTimeYMD(util.now + 1000 * 60 * 60 * 24 * 2)
      }
    },
    components: {
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  $input-height = 45px // 导航栏高度

  .disable
    color: $color-text-a4 !important

  .union-create-active
    position: relative
    min-height: 100vh
    background-color: $color-background-f6
    padding-bottom: 45px
    background-color :$color-background-f6
    .u-c-form
      position: relative
      .u-c-section
        padding-left: 15px
        background-color: $color-background-ff
        margin-bottom: 10px
        &.active-info
          margin-bottom: 0px
        .b-i-item
          position: relative
          layout(row)
          align-items: flex-end
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
          .money
            layout()
            align-items: flex-end
            font-family: $font-family-light
            font-size: $font-size-small-ss
            color: $color-text-a4
            box-sizing: border-box
            width: 5px
            height: 21px
            line-height: 0
            margin-right :3px
          .content
            flex: 1
            height: 100%
            font-family: $font-family-light
            font-size: $font-size-medium
            color: $color-text-a4
            .content-picker-box
              display: inline-block
              .picker
                display: inline-block
                font-family: $font-family-light
                font-size: $font-size-medium
                color: $color-text-2d
            .date-cut-off
              display: inline-block
              padding: 0 5px
            .c-input
              font-family: $font-family-light
              font-size: $font-size-medium
              color: $color-text-2d
              width: 100%
              height: 100%
            .c-price
              padding-left: 2px
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
            padding-right: 15px
            .c-item
              font-family: $font-family-light
              font-size: $font-size-medium
              color: $color-text-2d
              letter-spacing: 0
              line-height: 21px
            .c-input-info
              display: inline-block
              width: 38px
              height: $font-size-medium
              line-height: 21px
              text-align: center
              vertical-align: bottom
              border: 0.5px solid $color-col-line-cd
      .save-btn
        normal-button-default()
        border-radius: 3px 3px 0 0
        position: fixed
        left: 0
        right: 0
        bottom: 0
        z-index: 9
</style>
