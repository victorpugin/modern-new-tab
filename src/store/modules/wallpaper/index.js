import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    url: null,
    date: null,
    location: null,
    user: null
  },
  actions,
  mutations
}
