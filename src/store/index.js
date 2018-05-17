import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import wallpaper from './modules/wallpaper'
import preferences from './modules/preferences'

Vue.use(Vuex)

const sharedMutations = [
  'wallpaper/WALLPAPER_SET',
  'wallpaper/IS_FETCHING_SET',
  'preferences/FEATURE_BOOKMAR_BAR_SET'
]

const vuexLocalStorage = new VuexPersist({
  strictMode: true,
  key: 'modern-new-tab', // The key to store the state on in the storage provider.
  storage: window.localStorage,
  reducer: (state) => ({
    wallpaper: state.wallpaper,
    preferences: state.preferences
  }),
  sharedMutations: sharedMutations
})

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  mutations: {
    RESTORE_MUTATION: vuexLocalStorage.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  plugins: [vuexLocalStorage.plugin],
  modules: {
    wallpaper: wallpaper,
    preferences: preferences
  }
})

export default store
