import mutations from './mutations'

export default {
  namespaced: true,
  strict: true,
  state: {
    url: null,
    date: null,
    location: null,
    user: null
  },
  mutations
}
