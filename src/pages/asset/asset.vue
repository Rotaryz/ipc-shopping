<template>
  <div class="my-wellet">
    <div class="top">
      <img class="top-BC" v-if="imageUrl" v-bind:src="imageUrl + '/defaults/ipc-shopping/aliance/bg-income_01@2x.png'"/>
      <div class="container">
        <div class="top-foot">
          <div class="item">
            <div class="item-top">{{total}}</div>
            <div class="item-foot">可提现(元)</div>
          </div>
          <div class="item">
            <div class="item-top">{{count}}</div>
            <div class="item-foot">结算中(元)</div>
          </div>
          <div class="line"></div>
        </div>
        <div class="withdraw">
          <div class="dis" v-bind:class="{'withdraw-btn':withdraw}" v-on:click="withdrawFun">提现</div>
        </div>
      </div>
    </div>
    <div class="content">
      <scroll-view scroll-y class="list" @scrolltolower="loadMore" v-if="redPackList.length > 0">
        <div class="item" v-for="item in redPackList" :key="index">
          <div class="item-left">
            <div class="title">{{item.activity_alliance.name}}</div>
            <div class="time">{{item.activity_alliance.start_at}}</div>
          </div>
          <div class="item-right">
            <text class="small">+</text>
            {{item.commission}}
          </div>
        </div>
      </scroll-view>
      <Bgnull :showImagSta="1" :showBgnull="redPackList.length <= 0"></Bgnull>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Bgnull from '@/components/bgnull/bgnull'
  import { baseURL, ERR_OK } from 'api/config'
  import api from 'api'
  import * as wechat from 'common/js/wechat'

  export default {
    data () {
      return {
        imageUrl: baseURL.image,
        total: '0.00',
        count: '0.00',
        withdraw: false,
        redPackList: [],
        page: 1,
        limit: 10
      }
    },
    components: {
      Bgnull
    },
    onShow () {
      this._getInfo()
    },
    methods: {
      loadMore() { // 分页
        this.page++
        this._getAssetList()
        wechat.hideLoading()
      },
      async _getInfo() {
        await this._getAssetDetails()
        await this._getAssetList()
        wechat.hideLoading()
      },
      _getAssetDetails() {
        api.empAssetDetails().then(res => {
          if (res.error !== ERR_OK) return
          this.total = res.data.alliance_remaining
          this.count = res.data.blocked_alliance_remaining
          if (this.total * 1 > 0) {
            this.withdraw = true
          }
        }).catch(err => {
          console.info(err)
        })
      },
      _getAssetList() {
        let data = {
          page: this.page,
          limit: this.limit
        }
        api.empAssetList(data).then(res => {
          if (res.error !== ERR_OK) return
          this.redPackList = res.data
        }).catch(err => {
          console.info(err)
        })
      },
      withdrawFun () {
        if (!this.withdraw) {
          return
        }
        this.$router.push({
          name: 'Withdraw',
          path: '/pages/withdraw/withdraw'
        })
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'

  .my-wellet
    display: flex
    height: 100vh
    flex-direction: column

    .top
      height: 173px
      position: relative
      .top-BC
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
      .container
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        .top-head
          flex: 3
          display: flex
          flex-direction: column
          align-items: center
          justify-content: flex-end
          .money
            display: flex
            align-items: flex-end
            margin-bottom: 5px
            .little
              font-size: $font-size-large-m
              color: $color-text
              font-family: PingFangSC-Regular
              margin-bottom: 2px
            .big
              font-size: 34px
              color: $color-text
              font-family: PingFangSC-Medium
          .text
            font-size: $font-size-small
            color: $color-text-d
            margin-bottom: 18px
          .btn
            width: 135px
            height: 34px
            line-height: 34px
            text-align: center
            font-size: $font-size-medium
            color: $color-white
            font-family: PingFangSC-Regular
            border-radius: 17px
            nomal-icon(0, 0)
            &:active
              hover-icon(0, 0)
          .btn.dis
            disable-icon(0, 0)

        .top-foot
          flex: 2
          display: flex
          align-items: center
          position: relative
          .item
            flex: 1
            display: flex
            flex-direction: column
            align-items: center
            color: $color-background-ff
            .item-top
              font-family: $font-family-din
              font-size: $font-size-large-xx
              color: $color-background-ff
              line-height: 40px
            .item-foot
              font-family: $font-family-light
              font-size: $font-size-small
              color: $color-background-ff
          .line
            position: absolute
            width: 1px
            height: 28.5px
            background: #3F4661
            left: 50%
            top: 50%
            transform: translate(-50%, -50%)

        .withdraw
          padding: 14.5px
          .dis
            normal-button-default($color-text-95)
          .withdraw-btn
            normal-button-default()
    .content
      background: $color-background-f6
      flex: 1
      display flex
      position: relative
      height: 100%
      .head
        height: 54px
        display: flex
        align-items: center
        .blue-black
          width: 4px
          height: 14px
          background: $color-assist-bule
          margin-right: 5px
        .title-txt
          font-size: $font-size-medium-x
          color: $color-text
          font-family: PingFangSC-Regular
      .list
        .item
          padding-left: 15px
          display: flex
          justify-content: space-between
          background: #ffffff
          padding-right: 15px
          cut-off-rule-bottom()
          align-items: center
          &:last-child
            border-none()
          .item-left
            height: 54px
            display: flex
            flex-direction: column
            justify-content: center
            .title
              font-size: $font-size-medium
              color: $color-text-2d
              margin-bottom: 6px
            .time
              font-size: $font-size-small-s
              color: $color-text-a4
          .item-right
            color: $color-assist-34
            font-size: $font-size-medium
            font-family: $font-family-din

      .empty
        display: flex
        margin-top: 50px
        flex-direction: column
        justify-content: center
        align-items: center
        .empty-img
          width: 102px
          height: 112.5px
        .txt
          font-size: $font-size-medium
          color: $color-text-tr
          font-family: PingFangSC-Regular
          margin-top: 10px
</style>
