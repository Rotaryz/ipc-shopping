<template>
  <div class="circle-progress">
    <canvas class="c-p-canvas" canvas-id="c-progress"></canvas>
    <div class="info">
      <div class="number-box">
        <div class="number">{{number}}</div>
        <div class="per">%</div>
      </div>
      <div class="txt">完成率</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import wx from 'wx'

  export default {
    props: {},
    data () {
      return {
        number: 0
      }
    },
    mounted () {
      const ctx = wx.createCanvasContext('c-progress')

      const width = 140
      // const height = 140
      const lineWith = 12
      const raduis = (width - lineWith) / 2

      // ctx.font = {
      //   // style: 'oblique',
      //   weight: 'bold',
      //   size: 44
      //   // family: 'DINAlternate'
      // }
      // ctx.font.style = 'oblique'
      // console.log(ctx.font)
      // ctx.font = '44px italic bold DINAlternate'
      // ctx.fillText('60', width / 2 - 22, width / 2)
      // ctx.fillText('MINA', 100, 100)

      ctx.beginPath()
      ctx.arc(width / 2, width / 2, raduis, 0 * Math.PI, 2 * Math.PI)
      ctx.lineWidth = lineWith
      ctx.strokeStyle = '#1A1D3D'
      ctx.lineCap = 'round'
      ctx.stroke()

      const grd = ctx.createLinearGradient(width / 2, 0, width, width)
      grd.addColorStop(0, '#2AC3FF')
      grd.addColorStop(1, '#3364FF')
      // grd.addColorStop(2, '#3364FF')
      // grd.addColorStop(3, '#ff0')

      // ctx.beginPath()
      // ctx.arc(width / 2, width / 2, raduis, 1.5 * Math.PI, 1.49 * Math.PI)
      // ctx.lineWidth = lineWith
      // ctx.strokeStyle = grd
      // ctx.lineCap = 'round'
      // ctx.closePath()
      // ctx.stroke()
      ctx.draw()
      let start = 1.5
      let step = 2
      let timer = setInterval(() => {
        start += 2 / 100 * step
        this.number += step
        ctx.beginPath()
        ctx.arc(width / 2, width / 2, raduis, 1.5 * Math.PI, start * Math.PI)
        ctx.lineWidth = lineWith
        ctx.strokeStyle = grd
        ctx.lineCap = 'round'
        ctx.stroke()
        ctx.draw()
        if (this.number > 100) {
          this.number = Math.min(100, this.number)
          ctx.closePath()
          clearInterval(timer)
        }
      }, 30)
      // console.log(ctx)
      // ctx.arc(70, 70, 70, 0, 2 * Math.PI)
      // ctx.setFillStyle('#EEEEEE')
      // ctx.fill()

      // ctx.beginPath()
      // ctx.moveTo(40, 75)
      // ctx.lineTo(160, 75)
      // ctx.moveTo(100, 15)
      // ctx.lineTo(100, 135)
      // ctx.setStrokeStyle('#AAAAAA')
      // ctx.stroke()

      // ctx.setFontSize(12)
      // ctx.setFillStyle('black')
      // ctx.fillText('0', 165, 78)
      // ctx.fillText('0.5*PI', 83, 145)
      // ctx.fillText('1*PI', 15, 78)
      // ctx.fillText('1.5*PI', 83, 10)

      // ctx.beginPath()
      // ctx.arc(70, 70, 70, 0, 2 * Math.PI)
      // ctx.setFillStyle('lightgreen')
      // ctx.fill()

      // ctx.beginPath()
      // ctx.arc(100, 25, 2, 0, 2 * Math.PI)
      // ctx.setFillStyle('blue')
      // ctx.fill()

      // const grd = ctx.createCircularGradient(100, 75, 50)
      // grd.addColorStop(0, 'red')
      // grd.addColorStop(1, 'blue')
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .circle-progress
    width: 100%
    height: 100%
    position: relative
    .c-p-canvas
      height: 100%
      width: 100%
    .info
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      layout()
      justify-content: center
      align-items: center
      .number-box
        layout(row, inline, no-warp)
        align-items: flex-end
        .number
          font-family: $font-family-din
          color: $color-background-ff
          /*@formatter:off*/
          font-size: $font-size-shop-x
          line-height: $font-size-shop-x
          /*@formatter:on*/
        .per
          font-family: $font-family-light
          font-size: $font-size-small
          color: $color-background-ff
          line-height: $font-size-small
          box-sizing: border-box
          padding-bottom: 7.5px
      .txt
        margin-top: 5px
        font-family: $font-family-light
        font-size: $font-size-medium
        color: $color-background-ff
        line-height: $font-size-medium
</style>
