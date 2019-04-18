import Vue from 'vue'
import Router from 'vue-router'
import Drink from './views/Drink/Drink.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'drink',
      component: Drink
    }
    // component: () => import(/* webpackChunkName: "about" */ './views/Drink.vue')

  ]
})
