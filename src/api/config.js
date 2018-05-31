import wx from 'wx'

const env = process.env.NODE_ENV
const version = '/v1'

const DEV = {
  image: 'https://img.jerryf.cn',
  login: 'https://dev.jike-jwt.jerryf.cn',
  webview: 'https://h5.jkweixin.net',
  api: 'https://dev.jike-backend-api.jerryf.cn' + version,
  jumpVersion: 'develop'
}
// const DEV = {
//   image: 'https://img.jkweixin.net',
//   login: 'https://jwt.jkweixin.net',
//   webview: 'https://h5.jkweixin.net',
//   api: 'https://backend-api.jkweixin.net' + version,
//   jumpVersion: 'trial'
// }

const TEST = {
  image: 'https://img.jkweixin.net',
  login: 'https://jwt.jkweixin.net',
  webview: 'https://h5.jkweixin.net',
  api: 'https://backend-api.jkweixin.net' + version,
  jumpVersion: 'trial'
}

const PROD = {
  image: 'https://img.jkweixin.com',
  login: 'https://jwt.jkweixin.com',
  webview: 'https://h5.jkweixin.com',
  api: 'https://backend-api.jkweixin.com' + version,
  jumpVersion: 'release'
}

export const baseURL = env === 'production' ? PROD : env === 'test' ? TEST : DEV

export const ERR_OK = 0
export const TOKEN_OUT = 10000 // token 失效
export const TIME_OUT = 10000
export const ERR_NO = -404

let info = null
try {
  info = wx.getSystemInfoSync()
} catch (e) {
  // Do something when catch error
}

export const DEVICE_INFO = info
