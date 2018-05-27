import wx from 'wx'
import Fly from 'flyio'
import {showLoading, hideLoading} from './wechat'
import {baseURL, TIME_OUT, ERR_OK, ERR_NO, TOKEN_OUT} from 'api/config'
import {ROLE, SHOP_HELPER} from './contants'

const COMMON_HEADER = () => {
  const token = wx.getStorageSync('token')
  const merchantId = wx.getStorageSync('merchantId')
  let userType = wx.getStorageSync('userType')
  if (userType === ROLE.UNION_ID || userType === ROLE.SHOP_ID) {
    userType = 'merchant'
  } else {
    userType = ROLE.STAFF_ID
  }
  return Object.assign(
    {'X-Requested-With': 'XMLHttpRequest'},
    {'Current-merchant': merchantId},
    {'Authorization': token},
    {'User-type': userType}
  )
}

const fly = new Fly()

fly.interceptors.request.use((request) => {
  return request
})

fly.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.resolve(error.response)
})

// 配置请求基地址
fly.config.baseURL = baseURL.api

function checkStatus(response) {
  // login
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 422)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else if (response && (response.status === 404 || response.status >= 500)) {
    const url = `/pages/error/error?key=${response.status}`
    wx.reLaunch({url})
  }
  // 异常状态下，把错误信息返回去
  return {
    status: ERR_NO,
    msg: '网络异常'
  }
}

// 处理token-out
function _tokenOutHandler() {
  let entryRole = wx.getStorageSync('userType')
  switch (entryRole) {
    case ROLE.STAFF_ID : {
      let url = `/pages/login/login`
      wx.reLaunch({url})
      break
    }
    case ROLE.UNION_ID :
    case ROLE.SHOP_ID : {
      _backToB()
      break
    }
    default:
      break
  }
}

// 返回B端
function _backToB() {
  let appId = SHOP_HELPER.APPID
  let path = SHOP_HELPER.PATH
  wx.navigateToMiniProgram({
    appId: appId,
    path: path,
    extraData: {},
    envVersion: baseURL.jumpVersion,
    success(res) {
      // 打开成功
      console.log(res)
    }
  })
}

/**
 * 检查状态吗
 * @param res
 * @returns {string|Object[]|CanvasPixelArray}
 */
function checkCode(res) {
  // 凭证失效
  if (res.data && (res.data.code === TOKEN_OUT)) {
    _tokenOutHandler()
  }
  // 凭证失效2
  if (res && res.code === TOKEN_OUT) {
    _tokenOutHandler()
  }
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === ERR_NO) {
    console.warn(res.msg)
  }
  // 如果网络请求成功，而提交的数据，或者是后端的一些未知错误所导致的，可以根据实际情况进行捕获异常
  if (res.data && (res.data.code !== ERR_OK)) {
    // 可以进行switch操作，根据返回的code进行相对应的操作，然后抛异常
    console.warn(res.data.message)
    throw requestException(res)
  }
  return res.data
}

/**
 * 抛异常
 * @param res
 * @returns {{}}
 */
function requestException(res) {
  hideLoading()
  const error = {}
  error.statusCode = res.status
  const serviceData = res.data
  if (serviceData) {
    error.code = serviceData.code
    error.error = serviceData.error
    error.message = serviceData.message
    error.serverData = serviceData
  }
  return error
}

export default {
  post(url, data, loading = true) {
    if (loading) {
      showLoading()
    }
    return fly.post(url, data, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER()
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  },
  get(url, params, loading = true) {
    if (loading) {
      showLoading()
    }
    return fly.get(url, params, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER()
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  },
  put(url, data, loading = true) {
    if (loading) {
      showLoading()
    }
    return fly.put(url, data, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER()
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  },
  delete(url, data, loading = true) {
    if (loading) {
      showLoading()
    }
    return fly.delete(url, data, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER()
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  }
}
