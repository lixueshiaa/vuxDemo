// 登录token
import * as types from '../mutationTypes'

const state = {
  // 登录token
  token: ''
}

const mutations = {
  /**
   * 登录token
   */
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.REMOVE_TOKEN] (state) {
    state.token = ''
  }
}

export default{
  state,
  mutations
}
