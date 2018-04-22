import Vue from 'vue'
import Vuex from 'vuex'

import background from './modules/background'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    background: background
  }
})

export default store
