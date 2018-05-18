import Vue from 'vue'
import store from '@Store'
import root from './root.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@Static/css/el-switch-override.css'
import '@Static/css/el-slider-override.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({ // eslint-disable-line no-new
  el: '#root',
  store: store,
  render: h => h(root)
})
