import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import Vuex from 'vuex'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './router/index'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)

// console.log('meta')

export default () => {
	const router = createRouter()
	const store = createStore()
	const app = new Vue({
		router,
		store,
		render: (h) => h(App)
	})
	return { app, router, store }
}
