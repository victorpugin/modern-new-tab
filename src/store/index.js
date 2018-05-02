import Vue from 'vue'
import Vuex from 'vuex'

import wallpaper from './modules/wallpaper'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    wallpaper: wallpaper
  }
})

export default store
