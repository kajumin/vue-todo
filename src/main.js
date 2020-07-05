import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
import createRouter from './router'
import createStore from './store/store'
import './assets/styles/global.styl'
import Notification from './components/notification'
import Tabs from './components/tabs'
import bus from './util/bus'

const root = document.createElement('div')
document.body.appendChild(root)

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Notification)
Vue.use(Tabs)

const router = createRouter()
const store = createStore()

bus.$on('auth', () => {
  console.log('跳转到登录页面')
  router.push('/login')
})

router.beforeEach((to, from, next) => {
	console.log('beforEach')
	next()
})
router.beforeResolve((to, from, next) => {
	console.log('befroeResolve')
	next()
})
router.afterEach((to, from, next) => {
	console.log('afterEach')
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root)
