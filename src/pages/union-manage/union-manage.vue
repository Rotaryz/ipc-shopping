<template>
  <article class="union-manage">
    <header class="tab">
      <div :class="['t-item',tabFlag === 0 ? 'hit':'']" @tap.stop="changeTab(0)">报名中</div>
      <div :class="['t-item',tabFlag === 1 ? 'hit':'']" @tap.stop="changeTab(1)">已上架</div>
      <div :class="['t-item',tabFlag === 2 ? 'hit':'']" @tap.stop="changeTab(2)">已下架</div>
    </header>
    <section class="empty">
      <img class="empty-pic" v-if="imageUri" :src="imageUri + '/defaults/ipc-shopping/aliance/pic-union_empty@2x.png'"/>
      <div class="empty-txt">暂无活动</div>
    </section>
    <section class="apply">
    </section>
    <footer class="btn" @tap.stop="toCreateActive(0)">新建</footer>
  </article>
</template>

<script type="text/ecmascript-6">
  import api from 'api'
  import wx from 'wx'

  export default {
    data () {
      return {
        imageUri: api.image,
        tabFlag: 0
      }
    },
    methods: {
      changeTab (flag) {
        this.tabFlag = flag
      },
      toCreateActive() {
        const url = `/pages/union-create-active/union-create-active`
        wx.navigateTo({url})
      }
    },
    computed: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  $nav-height = 40px // 导航栏高度

  .empty
    fill-box()
    layout()
    top: 131.5px
    align-items: center
    .empty-pic
      width: 86px
      height: 75.5px
    .empty-txt
      padding-top: 10.5px
      text-align: center
      font-family: $font-family-light
      font-size: $font-size-small
      color: $color-assist-27

  .btn
    position: fixed
    bottom: 0
    left: 0
    right: 0
    normal-button-default()

  .union-manage
    position: relative
    min-height: 100vh
    .tab
      position: relative
      height: $nav-height
      padding: 0 40px
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
          cut-off-rule-bottom(6px, 6px, $color-assist-34, 4px)


</style>
