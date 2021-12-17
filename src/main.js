import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import '../node_modules/bulma/css/bulma.css'
import EventBus from './plugins/event-bus'
import routes from './routes'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(EventBus)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
