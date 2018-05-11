import api from 'api'

export default {
  /**
   * 向右箭头图片
   * @param type 类型：默认背景图
   * @returns {*}
   */
  imgArrowRight(type = 'background') {
    switch (type) {
      case 'background': {
        return `background-image:url(${api.image}/defaults/ipc-shopping/home/icon-mhome_j@2x.png)` || ''
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
        return `background-image:url(${api.image}/defaults/ipc-shopping/aliance/icon-union_card@2x.png)` || ''
      }
      default :
        return ''
    }
  }
}
