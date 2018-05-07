import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    info: {
      url: null,
      date: null,
      location: null,
      user: null
    }
  },
  actions,
  mutations,
  getters
}
