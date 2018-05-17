import mutations from './mutations'
import VuexPersist from 'vuex-persist'

const store = {
  namespaced: true,
  state: {
    feature: {
      bookmarksBar: false
    }
  },
  mutations
}

const sharedMutations = [
  'preferences/FEATURE_BOOKMAR_BAR_SET'
]

const persist = new VuexPersist({
  strictMode: true,
  key: 'preferences', // The key to store the state on in the storage provider.
  storage: window.localStorage,
  reducer: (state) => ({preferences: state.preferences}),
  sharedMutations: sharedMutations
})

export default {
  store,
  persist
}
