import Vue from 'vue'
import store from '@/store'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.config.productionTip = false
Vue.use(MpvueRouterPatch)

const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  config: {
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#F9F9F9',
      navigationBarBackgroundColor: '#1A1D3D',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'white',
      backgroundColorTop: '#1A1D3D',
      backgroundColorBottom: '#1A1D3D'
    }
  }
}
