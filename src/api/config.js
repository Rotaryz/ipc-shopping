const env = process.env.NODE_ENV
const version = '/v2'
const DEV = {
  image: 'https://img.jerryf.cn',
  login: 'https://dev.jike-jwt.jerryf.cn',
  api: 'https://dev.jike-backend-api.jerryf.cn' + version,
  jumpVersion: 'develop'
}

const TEST = {
  image: 'https://img.jkweixin.net',
  login: 'https://jwt.jkweixin.net',
  api: 'https://backend-api.jkweixin.net' + version,
  jumpVersion: 'trial'
}

const PROD = {
  image: 'https://img.jkweixin.com',
  login: 'https://jwt.jkweixin.com',
  api: 'https://backend-api.jkweixin.com' + version,
  jumpVersion: 'release'
}

export const baseURL = env === 'production' ? PROD : env === 'test' ? TEST : DEV
