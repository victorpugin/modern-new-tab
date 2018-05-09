import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import wallpaper from './modules/wallpaper'

Vue.use(Vuex)

const vuexLocalStorageWallpaper = new VuexPersist({
  strictMode: true,
  key: 'wallpaper', // The key to store the state on in the storage provider.
  storage: window.localStorage,
  reducer: (state) => ({wallpaper: state.wallpaper}),
  sharedMutations: ['wallpaper/WALLPAPER_SET']
})

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  mutations: {
    RESTORE_MUTATION: vuexLocalStorageWallpaper.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  plugins: [vuexLocalStorageWallpaper.plugin],
  modules: {
    wallpaper: wallpaper
  }
})

export default store
