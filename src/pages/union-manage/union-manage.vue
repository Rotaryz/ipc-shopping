<template>
  <article class="union-manage">
    <header class="tab">
      <nav
        v-for="(item,index) in navList"
        :key="index"
        :class="['t-item',tabFlag === index ? 'hit':'']"
        @tap.stop="changeTab(index)"
      >
        {{item}}
      </nav>
    </header>
    <section class="content">
      <article class="empty" v-if="isEmpty">
        <div class="empty-pic" :style="emptyImg"/>
        <div class="empty-txt">暂无活动</div>
      </article>
      <article class="scroll" v-if="!isEmpty">
        <ul class="box">
          <li class="box-item" v-for="(item, index) in cardInfoList" :key="index">
            <union-card
              :useType="0"
              :cardInfo="item"
              @previewHandler="previewHandler"
              @checkHandler="checkHandler"
              @sortHandler="sortHandler"
              @upperHandler="upperHandler"
              @deleteHandler="deleteHandler"
              @totalHandler="totalHandler"
              @editorHandler="editorHandler"
            ></union-card>
          </li>
        </ul>
      </article>
    </section>
    <footer class="btn" @tap.stop="toCreateActive(0)">新建</footer>
    <toast ref="toast"></toast>
    <confirm-msg
      :title="msgInfo.title"
      :msg="msgInfo.msg"
      :show="msgInfo.isShow"
      @confirm="confirmHandler"
      @cancel="cancelHandler"
    ></confirm-msg>
  </article>
</template>

<script type="text/ecmascript-6">
  import source from 'common/source'
  import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import wx from 'wx'
  import api from 'api'
  import * as wechat from 'common/js/wechat'
  import Toast from '@/components/toast/toast'
  import UnionCard from 'components/union-card-item/union-card-item'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  // import { ROLE } from '../../common/js/contants'

  const LIMIT_DEF = 10

  export default {
    data () {
      return {
        navList: ['报名中', '已上架', '已下架'],
        currentRole: null,
        tabFlag: 0,
        model: null,
        cardInfoList: [],
        isAll: false,
        page: 1,
        limit: LIMIT_DEF,
        msgInfo: {
          isShow: false,
          title: '确认发布上架？',
          msg: '备注：发布上线后，申请中和待审核的商家，都拒绝通过。'
        }
      }
    },
    onShow () {
      this._init()
    },
    beforeMount () {
    },
    mounted () {
    },
    onPullDownRefresh () {
      this._resetConfig()
      let data = this._formatReq()
      data.paga = 1
      data.limit = Math.max(this.cardInfoList.length, LIMIT_DEF)
      this._rqGetActiveList(data, false)
        .then(json => {
          let list = this._formatResData(json)
          this.cardInfoList = list
          this._isAll(json)
          wx.stopPullDownRefresh()
        })
    },
    onReachBottom () {
      this.getMoreList()
    },
    methods: {
      ...mapGetters(['role']),
      // test () {
      //   let token = ROLE.testToken
      //   this.currentRole = ROLE.UNION_ID
      //   wx.setStorageSync('userType', this.currentRole)
      //   wx.setStorageSync('token', token)
      // },
      // 初始化
      _init () {
        let role = this.role()
        this.currentRole = role
        this._resetConfig()
        let data = this._formatReq()
        this._rqGetActiveList(data)
          .then(json => {
            let list = this._formatResData(json)
            this.cardInfoList = list
            this._isAll(json)
          })
      },
      // 格式请求数据
      _formatReq () {
        let data = {limit: this.limit, status: this.tabFlag + 1, page: this.page}
        return data
      },
      // 获取活动列表
      _rqGetActiveList (data, loading) {
        return new Promise(resolve => {
          api.umgGetActiveList(data, loading)
            .then(json => {
              wechat.hideLoading()
              if (json.error !== ERR_OK) {
                return ''
              }
              resolve(json)
            })
            .catch(err => {
              console.info(err)
            })
        })
      },
      // 判断是否获取了所有数据
      _isAll (json) {
        let total = json.meta.total
        this.isAll = (this.cardInfoList.length >= total)
        return this.isAll
      },
      // 格式化请求列表
      _formatResData (json) {
        let arr = []
        let res = json.data
        res.map(item => {
          arr.push({
            id: item.id,
            appId: item.appid,
            appPath: item.path,
            title: item.name,
            endDate: `${item.end_at}到期`,
            sales: item.sale_count, // 销量
            chargeOff: item.verification_power, // 核销
            statusCode: item.status,
            statusStr: item.status === 1 ? '报名中' : (item.status === 2 ? '已上架' : '已下架')
          })
        })
        return arr
      },
      // 重置参数
      _resetConfig () {
        this.isAll = false
        this.page = 1
        this.limit = LIMIT_DEF
      },
      // 弹窗提示信息初始化
      _initMsgInfo (model) {
        model === 0 && (this.msgInfo = {
          isShow: false,
          title: '确认发布上架？',
          msg: '备注：发布上线后，申请中和待审核的商家，都拒绝通过。'
        })
        model === 1 && (this.msgInfo = {
          isShow: false,
          msg: '确定删除？'
        })
      },
      // 请求活动上架
      _rqActiveOnline (data, cb) {
        api.umgActiveOnline(data)
          .then(json => {
            wechat.hideLoading()
            if (json.error !== ERR_OK) {
              return this.$refs.toast.show(json.message)
            }
            cb()
          })
          .catch(err => {
            console.info(err)
          })
      },
      // 获取更多活动
      getMoreList () {
        if (this.isAll) return
        let data = this._formatReq()
        data.page++
        this._rqGetActiveList(data)
          .then(json => {
            let list = this._formatResData(json)
            this.cardInfoList.push(...list)
            this._isAll(json)
            console.log(this.cardInfoList.length)
          })
      },
      // 弹窗确认操作
      confirmHandler () {
        this.msgInfo.isShow = false
        let data = {activity_alliance_id: this.currentActiveId}
        let self = this
        switch (this.model) {
          case 0 : {
            this._rqActiveOnline(data, () => {
              let index = self.cardInfoList.findIndex(self.currentActiveId)
              self.cardInfoList.splice(index, 1)
              self.currentActiveId = null
            })
            break
          }
          case 1: {
            console.log(2)
            break
          }
        }
      },
      // 删除按钮
      deleteHandler (obj) {
        this._initMsgInfo(1)
        this.msgInfo.isShow = true
        this.currentActiveId = obj.id
        this.model = 1
      },
      // 弹窗取消操作
      cancelHandler () {
        this.msgInfo.isShow = false
        this.currentActiveId = null
      },
      // 上线按钮
      upperHandler (obj) {
        this._initMsgInfo(0)
        this.msgInfo.isShow = true
        this.currentActiveId = obj.id
        this.model = 0
      },
      // 审查列表按钮
      checkHandler (obj) {
        const activeId = obj.id
        const url = `/pages/union-check-list/union-check-list?activeId=${activeId}`
        this.$router.push(url)
      },
      // 排序按钮
      sortHandler (obj) {
        const activeId = obj.id
        const url = `/pages/union-sort/union-sort?activeId=${activeId}`
        this.$router.push(url)
      },
      // 统计
      totalHandler (obj) {
        const url = `/pages/leader-data/leader-data?id=${obj.id}`
        this.$router.push(url)
      },
      // 预览按钮
      previewHandler (obj) {
        const activityId = obj.id
        const url = `/pages/activity-detai/activity-detai?activityId=${activityId}`
        this.$router.push(url)
      },
      // 编辑
      editorHandler (obj) {
        const url = `/pages/union-create-active/union-create-active?model=1&activeId=${obj.id}`
        this.$router.push(url)
      },
      // tab栏切换
      changeTab (flag) {
        if (this.tabFlag === flag) return
        this.tabFlag = flag
        this._resetConfig()
        let data = this._formatReq()
        this._rqGetActiveList(data)
          .then(json => {
            let list = this._formatResData(json)
            this.cardInfoList = list
            this._isAll(json)
            wx.stopPullDownRefresh()
          })
      },
      // 新建按钮
      toCreateActive () {
        const url = `/pages/union-create-active/union-create-active?model=0`
        this.$router.push(url)
      }
    },
    computed: {
      emptyImg () {
        return source.imgEmptyActive()
      },
      isEmpty () {
        return this.cardInfoList.length <= 0
      }
    },
    components: {
      Toast,
      UnionCard,
      ConfirmMsg
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  $nav-height = 40px // 导航栏高度
  $btn-height = 45px // 按钮高度

  .union-manage
    position: relative
    height: 100vh
    .tab
      position: fixed
      top: 0
      left: 0
      right: 0
      height: $nav-height
      padding: 0 40px
      box-sizing: border-box
      z-index: 9
      layout(row)
      justify-content: space-between
      align-items: center
      background-color: $color-main-1a
      font-family: $font-family-light
      font-size: $font-size-medium
      color: $color-text-95
      .t-item
        position: relative
        height: $nav-height
        line-height: $nav-height
        transition: 0.3 all
        &.hit
          color: $color-background-ff
          cut-off-rule-bottom(6px, 6px, $color-assist-34, 2px)
    .content
      height: 100%
      padding: $nav-height 0 $btn-height
      box-sizing: border-box
      .empty
        box-sizing: border-box
        height: 100%
        padding-top: 34.9%
        layout()
        align-items: center
        &.display-none
          display: none
        .empty-pic
          width: 86px
          height: 75.5px
          background-size: 100%
        .empty-txt
          padding-top: 10.5px
          text-align: center
          font-family: $font-family-light
          font-size: $font-size-small
          color: $color-assist-27
      .scroll
        height: 100%
        .box
          box-sizing: border-box
          padding-bottom: 45px
          .box-item
            padding: 10px 15px
            &:last-child
              padding-bottom: 20px

    .btn
      position: fixed
      left: 0
      right: 0
      bottom: 0
      normal-button-default()
      border-radius: 3px 3px 0 0
      z-index: 9


</style>
