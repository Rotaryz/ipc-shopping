// 深度拷贝
let objDeepCopy = function (source) {
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  }
  return sourceCopy
}

export default {
  objDeepCopy
}
