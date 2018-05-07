import * as types from './mutation-types'

export const saveTest = function ({commit, state}, test) {
  commit(types.TEST_TYPE, test)
}
