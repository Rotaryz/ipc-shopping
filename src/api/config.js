const env = process.env.NODE_ENV

const DEV = {
  api: 'dev'
}

const TEST = {
  api: 'test'
}

const PROD = {
  api: 'prod'
}

export const baseURL = env === 'production' ? PROD : env === 'test' ? TEST : DEV
