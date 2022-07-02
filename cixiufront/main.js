import Vue from 'vue'
import App from './App'

//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
/**
 * uView
 */
import uView from "@/components/uview-ui"
Vue.use(uView)

/**
 * configuration
 */
import configuration from "@/core/index"
/**
 * 配置相关[core/config.js]
 */
Vue.prototype.$CONFIG = configuration.CONFIG
/**
 * 工具相关[core/tools.js]
 */
Vue.prototype.$tools = configuration.TOOLS
/**
 * 图片相关[core/img.js]
 */
Vue.prototype.$img = configuration.IMG
/**
 * API相关[core/apis/index.js]
 */
Vue.prototype.$apis = configuration.APIS
/**
 * Request Function [core/request.js]
 */
Vue.prototype.$http = configuration.HTTP

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
