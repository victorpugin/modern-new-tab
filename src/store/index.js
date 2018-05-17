import Vue from 'vue'
import Vuex from 'vuex'

import wallpaper from './modules/wallpaper'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  mutations: {
    RESTORE_MUTATION: wallpaper.persist.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  plugins: [wallpaper.persist.plugin],
  modules: {
    wallpaper: wallpaper.store
  }
})

export default store
