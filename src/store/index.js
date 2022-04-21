import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currTag: ''
  },
  mutations: {
    setCurrTag(state, tag) {
      state.currTag = tag
    }
  },
  actions: {
  },
  modules: {
  }
})
