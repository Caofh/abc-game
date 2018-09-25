import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes:[
    {
      path:'/',
      name:'Hamster',
      component: () => import(/* webpackChunkName: "ChannelShow" */ './Hamster')
    }
  ]
})
