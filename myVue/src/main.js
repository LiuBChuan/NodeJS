// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App'

import routes from './config/routes'
const router = new VueRouter({
  routes
})

// 引用api.js
import api from './config/api'
Vue.prototype.$api = api

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
