import types from './mutation_types'

export default {
  [types.FEATURE_BOOKMAR_BAR_SET] (state, enabled) {
    if (state.feature.bookmarksBar !== enabled) {
      if (typeof (enabled) === typeof (true)) {
        state.feature.bookmarksBar = enabled
      }
    }
  }
}
