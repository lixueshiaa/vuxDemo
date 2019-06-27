import * as types from '../mutationTypes'

export default {
  /**
   * 保存登录token
   */
  setAuth: ({ commit }, token) => {
    commit(types.SET_TOKEN, token)
  },
  removeAuth: ({ commit }) => {
    commit(types.REMOVE_TOKEN)
  }
}
