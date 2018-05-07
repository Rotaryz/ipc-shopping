import * as types from './mutation-types'

const mutations = {
  [types.TEST_TYPE](state, test) {
    state.test = test
  }
}

export default mutations
