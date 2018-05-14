<template>
  <div class="employee">
    <!--<bgnull :showImagSta="0" :showBgnull="awaitList.length <= 0 && acceptList.length <= 0"></bgnull>-->
    <div class="em-list">
      <div class="em-list-await"  v-if="awaitList.length > 0">
        <div class="em-list-await-title">待处理申请</div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">商家名称</div>
          </div>
          <div class="await-list-right">国颐堂
          </div>
        </div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">行业类型</div>
          </div>
          <div class="await-list-right">美业
          </div>
        </div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">地址</div>
          </div>
          <div class="await-list-right">广州市白云区黄石路国际单位黄石路国际单位国际单位2期
          </div>
        </div>
      </div>
      <div class="em-list-succeed">
        <div class="em-list-await-title">订单详情</div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">单价</div>
          </div>
          <div class="await-list-right">10元/个
          </div>
        </div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">购买数量</div>
          </div>
          <div class="await-list-right">100个
          </div>
        </div>
        <div class="await-list-item">
          <div class="await-list-left">
            <div class="left-name">实付金额</div>
          </div>
          <div class="await-list-right moneys">
            <span class="money">¥</span>1000
          </div>
        </div>
      </div>
      <div class="em-list-succeed"  v-if="awaitList.length > 0">
        <div class="em-list-await-title">优惠券信息</div>
        <div class="await-list-items info">
          <coupon :useModel="0" ></coupon>
        </div>
      </div>
    </div>
    <div class="floorAdd">
      <div class="addEmployee">
        <div class="change">
          <img class="img" :src="imageUrl + '/defaults/ipc-shopping/common/icon-union_yhj@2x.png'" alt="">
          更换优惠券</div>
        <div class="refuse">拒绝</div>
        <div class="pass">通过</div>
      </div>
    </div>
    <confirm-msg :show.sync="show" :title.sync="title" v-on:confirm="confirm" v-on:cancel="cancel"></confirm-msg>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bgnull from 'components/bgnull/bgnull'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import Coupon from 'components/coupon-item/coupon-item'
  import {baseURL} from 'api/config'

  export default {
    data () {
      return {
        imageUrl: baseURL.image,
        showBgnull: true,
        awaitList: [
          {name: '123'},
          {name: '123'},
          {name: '123'}
        ],
        acceptList: [],
        show: false,
        title: '',
        dataTmp: {},
        dataIndex: '',
        isAwait: ''
      }
    },
    components: {
      Bgnull,
      ConfirmMsg,
      Coupon
    },
    // 分页
    onReachBottom () {
      console.log('上拉刷新....')
    },
    beforeMount() {
      console.log(`--${this.compName}--beforeMount`)
    },
    mounted() {
      console.log(`--${this.compName}--mounted`)
    },
    methods: {
      refuse (obj, index) {
        this.dataTmp = obj
        this.dataIndex = index
        this.isAwait = 'refuse'
        this.show = true
        this.title = '确认拒绝?'
      },
      accept (obj, index) {
        this.dataTmp = obj
        this.show = true
        this.isAwait = 'accept'
        this.dataIndex = index
        this.title = '确认接受?'
      },
      del (obj, index) {
        this.dataTmp = obj
        this.show = true
        this.isAwait = 'del'
        this.dataIndex = index
        this.title = '确认删除?'
      },
      addEmployee () {
        this.$router.push({
          name: 'CodeAdd',
          path: '/pages/code-add/code-add',
          query: {key: 123}
        })
      },
      confirm() {
        this.show = false
        if (this.isAwait !== '') {
          if (this.isAwait === 'refuse') {
            this.awaitList.splice(this.dataIndex, 1)
          } else if (this.isAwait === 'accept') {
            this.awaitList.splice(this.dataIndex, 1)
            this.acceptList.push(this.dataTmp)
          } else {
            this.acceptList.splice(this.dataIndex, 1)
          }
        }
      },
      cancel() {
        this.show = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'
  .employee
    background-color: $color-background-f6
  .em-list
    padding-bottom: 65px
    .em-list-await
      padding-left: 15px
      background-color: $color-background-ff
    .em-list-await-title
      height: 50px
      line-height: 50px
      text-indent: 8px
      vertical-line()
      font-family: $font-family-regular
      font-size: $font-size-medium
      color: $color-text-2d
    .await-list-item
      height: 54px
      justify-content: space-between
      display: flex
      cut-off-rule-bottom(0,0,$color-cut-line-ed)
      &:last-child
        border-none()
    .await-list-item
      align-items: center
      .await-list-left
        display: flex
        align-items: center
        .left-image
          width: 34px
          height: 34px
          border-radius: 100%
          border: .5px solid $color-text-2d
          margin-right: 10px
        .left-name
          display: inline-block
          font-family: $font-family-light
          font-size: $font-size-medium
          color: $color-text-2d
          width: 100px
          no-wrap()
      .await-list-right
        display: flex
        align-items: center
        height: 99%
        font-family: $font-family-light
        font-size: $font-size-medium
        color: $color-text-00
        margin-right: 15px
        text-align: right
      .await-list-right.moneys
        font-family: $font-family-meddle
        font-size: $font-size-medium-x
        color: $color-text-2d
        .money
          font-family: $font-family-regular
          font-size: $font-size-small-s
          margin-top: 4px
          margin-right: 2px
    .await-list-items.info
      margin-left: -15px
      padding :0 15px
    .em-list-succeed
      padding-left: 15px
      margin-top: 10px
      padding-bottom: 15px
      background-color: $color-background-ff
  .floorAdd
    position: fixed
    z-index: 1
    bottom: 0px
    width: 100vw
    height: 45px
    .addEmployee
      display: flex
      flex-direction: row
      // justify-content: space-between
      .change
        width: 78px
        cut-off-rule-top()
        font-family: $font-family-light
        font-size: $font-size-small-s
        color: $color-text-2d
        height: 45px
        line-height: 45px
        text-align: center
        display: flex
        flex-direction: column
        .img
          border: .5px solid red
          width: 17.5px
          height: 12.5px
      .refuse
        text-align center
        flex: 1
        line-height: 45px
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-background-ff
        letter-spacing: 0.64px
        background-color: $color-assist-27
      .pass
        text-align center
        flex: 1
        line-height: 45px
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-background-ff
        letter-spacing: 0.64px
        background-color: $color-assist-34


</style>
