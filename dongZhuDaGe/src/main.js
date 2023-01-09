import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/style.css'
import '@/assets/iconfont.css'



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import {get,post} from './plugins/axios.js'
import api from './api/index.js'



// import VConsole from 'vconsole';
// new VConsole();

import {fileAppenToFormData,base64ToBlob,base64RULHandler} from '@/utils/utils.js'


Vue.prototype.$api = api;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$fileAppenToFormData = fileAppenToFormData;
Vue.prototype.$base64ToBlob = base64ToBlob;
Vue.prototype.$base64RULHandler = base64RULHandler;


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
