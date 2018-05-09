<template>
  <!--<scroll-view scroll-y bindscrolltolower="bindscrolltolowers">-->
    <div class="employee">
      <bgnull :showImagSta="1" :imagesUrl="imagesUrl" :text="texts" :showBgnull="awaitList.length <= 0 && acceptList.length <= 0"></bgnull>
      <div class="em-list" v-if="awaitList.length > 0 || acceptList.length > 0">
        <div class="em-list-await"  v-if="awaitList.length > 0">
          <div class="em-list-await-title"><span>待处理申请</span></div>
          <div class="await-list-item" v-for="item in awaitList" :key="index">
            <div class="await-list-left">
              <img class="left-image" src="" />
              <div class="left-name">{{item.name}}</div>
            </div>
            <div class="await-list-right">
              <div class="right-refuse" @tap="refuse(item,index)">拒绝</div>
              <div class="right-accept" @tap="accept(item,index)">接受</div>
            </div>
          </div>
        </div>
        <div class="em-list-succeed"  v-if="acceptList.length > 0">
          <div class="await-list-item" v-for="item in acceptList" :key="index">
            <div class="await-list-left">
              <img class="left-image" src="" />
              <div class="left-name">{{item.name}}</div>
            </div>
            <div class="await-list-right">
              <div class="right-del" @tap="del(item,index)">删除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="floorAdd">
        <div class="addEmployee" @tap="addEmployee">邀请员工</div>
      </div>
      <confirm-msg :show.sync="show" :title.sync="title" v-on:confirm="confirm" v-on:cancel="cancel"></confirm-msg>
    </div>
  <!--</scroll-view>-->
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import Bgnull from 'components/bgnull/bgnull'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'

  export default {
    data () {
      return {
        imagesUrl: api.image + '/defaults/ipc-shopping/employee/pic-@2x.png',
        showBgnull: true,
        texts: '暂无员工',
        awaitList: [
        ],
        acceptList: [
        ],
        show: false,
        title: '',
        dataTmp: {},
        dataIndex: '',
        isAwait: ''
      }
    },
    components: {
      Bgnull,
      ConfirmMsg
    },
    // 分页
    onReachBottom () {
      console.log('上拉刷新....')
    },
    mounted () {},
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
          params: {id: 123}
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
    height: 100vh
    width: 100vw
    background-color: $color-background-f6
  .em-list
    padding-bottom: 90rpx
    .em-list-await
      padding-left: 15px
      background-color: $color-background-ff
    .em-list-await-title
      height: 50px
      line-height: 50px
      span
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: $color-text-2d
    .await-list-item
      height: 54px
      justify-content: space-between
      display: flex
      cut-off-rule-bottom(0,0,#EDEDED)
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
        .right-refuse
          margin-right: 10px
          function-button()
        .right-accept
          margin-right: 15px
          function-button($color-assist-34,$color-assist-34)
        .right-del
          margin-right: 15px
          function-button()
    .em-list-succeed
      padding-left: 15px
      margin-top: 10px
      background-color: $color-background-ff
  .floorAdd
    position: fixed
    z-index: 1
    bottom: 0px
    width: 100vw
    .addEmployee
      normal-button-default()
      border-radius: 0px
</style>
