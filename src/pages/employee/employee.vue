<template>
  <div class="employee">
    <form class="em-list" v-if="awaitList.length > 0 || acceptList.length > 0" @submit="formSubmit" report-submit='true'>
      <div class="em-list-await" v-if="awaitList.length > 0">
        <div class="em-list-await-title"><span>待处理申请</span></div>
        <div class="await-list-item" v-for="item in awaitList" :key="index">
          <div class="await-list-left">
            <img class="left-image" :src="item.avatar_url"/>
            <div class="left-name">{{item.nickname}}</div>
          </div>
          <div class="await-list-right">
            <label for="btn-1" class="right-refuse" v-on:click="refuse(item,index)">拒绝</label>
            <button id="btn-1" class="btn-form-id" form-type="submit"></button>
            <label for="btn-2" class="right-accept" v-on:click="accept(item,index)">接受</label>
            <button id="btn-2" class="btn-form-id" form-type="submit"></button>
          </div>
        </div>
      </div>
      <div class="em-list-succeed" v-if="acceptList.length > 0">
        <div class="await-list-item" v-for="item in acceptList" :key="index">
          <div class="await-list-left">
            <img class="left-image" src=""/>
            <div class="left-name">{{item.nickname}}</div>
          </div>
          <div class="await-list-right">
            <label class="right-del" v-on:click="del(item,index)">删除</label>
            <button id="btn-3" class="btn-form-id" form-type="submit"></button>
          </div>
        </div>
      </div>
    </form>
    <div class="floorAdd">
      <div class="addEmployee" v-on:click="addEmployee">邀请员工</div>
    </div>
    <confirm-msg :show.sync="show" :title.sync="title" v-on:confirm="confirm" v-on:cancel="cancel"></confirm-msg>
    <bgnull :showImagSta="0" :showBgnull="awaitList.length <= 0 && acceptList.length <= 0"></bgnull>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ERR_OK } from 'api/config'
  import Bgnull from 'components/bgnull/bgnull'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import api from 'api'
  import * as wechat from 'common/js/wechat'
  import Toast from '@/components/toast/toast'

  export default {
    data () {
      return {
        showBgnull: true,
        awaitList: [],
        acceptList: [],
        show: false,
        title: '',
        dataTmp: {},
        dataIndex: '',
        isAwait: '',
        page: 1
      }
    },
    components: {
      Bgnull,
      ConfirmMsg,
      Toast
    },
    // 分页
    onReachBottom () {
      console.log('上拉刷新....')
    },
    // 下拉加载
    onPullDownRefresh () {
      this.page = 1
      this.getInfo()
    },
    onShow () {
      this.getInfo()
    },
    methods: {
      formSubmit (e) {
        let formId = e.mp.detail.formId
        let data = {'form_ids': [formId]}
        api.homeCollectFormId(data)
      },
      async getInfo () {
        await this._getEmployee()
        await this._getAccept()
        wechat.hideLoading()
      },
      _getEmployee () { // 获取待处理员工
        let data = {}
        api.empGetEmployeeList(data).then(res => {
          if (res.error !== ERR_OK) return
          this.awaitList = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      _getAccept () { // 获取接受的员工
        let data = {}
        api.empGetAcceptList(data).then(res => {
          if (res.error !== ERR_OK) return
          this.acceptList = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      _AuditEmployee (key) { // 审核员工 1为通过，2为拒绝
        let data = {status: key, id: this.awaitList[this.dataIndex].id}
        api.empAuditEmployee(data).then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          if (key === 1) {
            this.awaitList.splice(this.dataIndex, 1)
            this.acceptList.push(this.dataTmp)
          } else if (key === 2) {
            this.awaitList.splice(this.dataIndex, 1)
          }
        }).catch(err => {
          console.log(err)
        })
        wechat.hideLoading()
      },
      _empDel () { // 删除员工
        let data = {customer_id: this.acceptList[this.dataIndex].id}
        api.empDel(data).then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.acceptList.splice(this.dataIndex, 1)
        }).catch(err => {
          console.log(err)
        })
        wechat.hideLoading()
      },
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
      confirm () {
        this.show = false
        if (this.isAwait !== '') {
          if (this.isAwait === 'refuse') { // 拒绝
            this._AuditEmployee(2)
          } else if (this.isAwait === 'accept') { // 接受
            this._AuditEmployee(1)
          } else {
            this._empDel()
          }
        }
      },
      cancel () {
        this.show = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'

  .btn-form-id
    position: absolute
    opacity: 0
    top: -100%

  .employee
    height: 100vh
    width: 100vw
    background-color: $color-background-f6

  .em-list
    padding-bottom: 90 rpx
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
      cut-off-rule-bottom(0, 0, #EDEDED)
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
          border: .5px solid $color-cut-line-ed
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
          function-button($color-assist-34, $color-assist-34)
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
