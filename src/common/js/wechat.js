import wx from './wx'

export function login () {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject })
  })
}

export function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject })
  })
}

export function setStorage (key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({ key: key, data: value, success: resolve, fail: reject })
  })
}

export function getStorage (key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({ key: key, success: resolve, fail: reject })
  })
}

export function getLocation (type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({ type: type, success: resolve, fail: reject })
  })
}

export function showLoading(title = '加载中') {
  if (wx.showLoading) {
    wx.showLoading({
      title: title,
      mask: true
    })
  } else {
    wx.showNavigationBarLoading()
  }
}

export function hideLoading() {
  if (wx.hideLoading) {
    wx.hideLoading()
  } else {
    wx.hideNavigationBarLoading()
  }
}
export function setNavigationBarTitle(data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    wx.getLocation(data)
  })
}

/**
 * 弹出提示框
 */

export function tipSuccess(title, duration = 500) {
  wx.showToast({
    title: title,
    image: '/static/img/icon-global_success@2x.png',
    mask: true,
    duration: duration
  })
  if (duration > 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }
}
