export default {
  wallpaperInfoExist: (state) => {
    return state.info != null && state.info.url != null
  }
}
