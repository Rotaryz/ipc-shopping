import api from 'api'

const baseUrl = `${api.image}/defaults/ipc-shopping`

export default {
  /**
   * 向右箭头图片
   * @param type 类型：默认背景图
   * @returns {*}
   */
  imgArrowRight(type = 'background') {
    switch (type) {
      case 'background': {
        return `background-image:url(${baseUrl}/home/icon-mhome_j@2x.png)` || ''
      }
      default :
        return ''
    }
  },
  /**
   * 店铺icon图标
   * @param type
   * @returns {*}
   */
  imgShopIcon(type = 'background') {
    switch (type) {
      case 'background': {
        return `background-image:url(${baseUrl}/aliance/icon-union_card@2x.png)` || ''
      }
      default :
        return ''
    }
  }
}
