import { baseURL } from 'api/config'

const baseUrl = `${baseURL.image}/defaults/ipc-shopping`

export default {
  /**
   * 向右箭头图片-白色-FF
   * @param type 类型：默认背景图
   * @returns {*}
   */
  imgArrowRight (type = 'background') {
    switch (type) {
      case 'background': {
        return `background-image:url(${baseUrl}/home/icon-mhome_j@2x.png)` || ''
      }
      default :
        return ''
    }
  },
  /**
   * 向右箭头图片-灰色-A4
   * @param type
   * @returns {*}
   */
  imgArrowRightA4 (type = 'background') {
    const img = `icon-union_jt2@2x.png`
    switch (type) {
      case 'background': {
        return `background-image:url(${baseUrl}/common/${img}` || ''
      }
      case 'img': {
        return `${baseUrl}/common/${img}` || ''
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
  imgShopIcon (type = 'background') {
    switch (type) {
      case 'background': {
        return `background-image:url(${baseUrl}/aliance/icon-union_card@2x.png)` || ''
      }
      default :
        return ''
    }
  },
  /**
   * map-icon图标
   * @param type
   * @returns {*}
   */
  imgMapIcon (type = 'background') {
    const img = `icon-union_map@2x.png`
    switch (type) {
      case 'background': {
        return `background-image:url(${baseUrl}/common/${img}` || ''
      }
      default :
        return ''
    }
  }
}
