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