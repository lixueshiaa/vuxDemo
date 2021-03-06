import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import modules from './modules'
/* eslint-disable */
import * as types from './mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules
})
