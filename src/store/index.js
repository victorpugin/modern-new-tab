import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import wallpaper from './modules/wallpaper'

Vue.use(Vuex)

const wallpaperSharedMutations = [
  'wallpaper/WALLPAPER_SET',
  'wallpaper/IS_FETCHING_SET'
]

const vuexLocalStorageWallpaper = new VuexPersist({
  strictMode: true,
  key: 'wallpaper', // The key to store the state on in the storage provider.
  storage: window.localStorage,
  reducer: (state) => ({wallpaper: state.wallpaper}),
  sharedMutations: wallpaperSharedMutations
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
