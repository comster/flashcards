import Vue from 'vue'
import Router from 'vue-router'
import VueDemo from '@/components/VueDemo'
import Messages from '@/components/Messages'
import Study from '@/components/Study'
import Cards from '@/components/Cards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: VueDemo
    },
    {
      path: '/study',
      name: 'study',
      component: Study
    },
    {
      path: '/cards',
      name: 'cards',
      component: Cards
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    }
  ]
})
