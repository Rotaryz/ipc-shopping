<template>
  <div class="manage-con">
    <header class="tab">
      <div :class="['t-item',tabFlag === 0 ? 'hit':'']" @tap.stop="changeTab(0)">活动管理</div>
      <div :class="['t-item',tabFlag === 2 ? 'hit':'']" @tap.stop="changeTab(2)">活动池</div>
    </header>
    <div class="manage-list" v-if="tabFlag === 0">
      <div class="box-list">
        <active-card :useType="0" @previewHandler="test" ></active-card>
      </div>
      <div class="box-list">
        <active-card :useType="0" @previewHandler="test"></active-card>
      </div>
    </div>
    <div class="manage-list" v-if="tabFlag === 2">
      <div class="box-list">
        <active-card :useType="0" @previewHandler="test" ></active-card>
      </div>
      <div class="box-list">
        <active-card :useType="0" @previewHandler="test"></active-card>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ActiveCard from 'components/active-card-item/active-card-item'

  export default {
    data() {
      return {
        tabFlag: 0
      }
    },
    methods: {
      changeTab(flag) {
        this.tabFlag = flag
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
  $nav-height = 40px // 导航栏高度

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
      flex: 1
      text-align: center
      &.hit
        color: $color-background-ff
        cut-off-rule-bottom(40%, 40%, $color-assist-34, 2px)
  .manage-list
    padding: 0 15px
    .box-list
      margin-top: 10px
</style>
