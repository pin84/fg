import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const v1 = {
  state: {
    isShowNav: true,
    isShowPopWrapper:0,
    updatePageCount:0,
    pageCount:0,
    pageSize:10,
    updateType:0,
  },
  mutations: {
    pageCount(state, params) {
      state.pageCount = params
    },
    updatePageCount(state, params) {
      state.updatePageCount = params
    },
    isShowNav(state, params) {
      state.isShowNav = params
    },
    isShowPopWrapper(state, params) {
      state.isShowPopWrapper = params
    },
    pageSize(state, params) {
      state.pageSize = params
    },
    updateType(state, params) {
      state.updateType = params
    },
  },
  actions: {
  },
  modules: {
  }
}
export default new Vuex.Store({
  modules: {
    v1
  }
})
