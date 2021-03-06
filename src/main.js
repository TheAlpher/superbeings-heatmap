import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false
Vue.component('v-select', vSelect);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
