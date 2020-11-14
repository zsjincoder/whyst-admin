import Vue from 'vue'
import Vuex from 'vuex'

import app from './module/app'
import user from './module/user'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    app,
    user
  },
  plugins: [vuexLocal.plugin]
})
