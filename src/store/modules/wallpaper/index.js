import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import VuexPersist from 'vuex-persist'

const store = {
  namespaced: true,
  state: {
    info: {
      url: null,
      date: null,
      location: null,
      user: null
    },
    isFetching: false,
    fetchTime: null
  },
  actions,
  mutations,
  getters
}

const sharedMutations = [
  'wallpaper/WALLPAPER_SET',
  'wallpaper/IS_FETCHING_SET'
]

const persist = new VuexPersist({
  strictMode: true,
  key: 'wallpaper', // The key to store the state on in the storage provider.
  storage: window.localStorage,
  reducer: (state) => ({wallpaper: state.wallpaper}),
  sharedMutations: sharedMutations
})

export default {
  store,
  persist
}
