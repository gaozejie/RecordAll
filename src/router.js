import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/Login.vue'
import Main from './views/Main/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/menu',
          name: 'menu',
          component: () =>
            import(/* webpackChunkName: "menu" */ './views/Main/Menu.vue')
        },
        {
          path: '/setting',
          name: 'setting',
          component: () =>
            import(/* webpackChunkName: "setting" */ './views/Main/Setting.vue')
        }
      ]
    },
    {
      path: '/drinkLocal',
      name: 'drinkLocal',
      component: () =>
        import(/* webpackChunkName: "drinkLocal" */ './views/Drink/DrinkLocal.vue')
    },
    {
      path: '/drink',
      name: 'drink',
      component: () =>
        import(/* webpackChunkName: "drink" */ './views/Drink/Drink.vue')
    }
  ]
})
