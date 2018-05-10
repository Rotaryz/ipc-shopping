<template>
  <article class="union-card-item">
    <section class="wrap">
      <div class="box" :style="backgroundImg"></div>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
  import api from 'api'

  export default {
    props: [
      {cardInfo: Object},
      {constObject: Object}
    ],
    data () {
      return {
        imageUri: api.image,
        bgImgType: 0 // 背景图片类型
      }
    },
    computed: {
      backgroundImg () {
        switch (this.bgImgType) {
          case 0: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/pic-union_b@2x.png?flag=1)` || ''
          }
          case 1: {
            return `background-image:url(${this.imageUri}/defaults/ipc-shopping/aliance/pic-activity_cardp@2x.png)` || ''
          }
          default: {
            return ''
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .union-card-item
    position: relative
    .wrap
      position: relative
      height: 0
      padding-top: 39.855072463768%
      .box
        fill-box()
        background-repeat: no-repeat
        background-size: 100%
        background-position: center center


</style>
