import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/backend/Dashboard'
import Article from '@/components/backend/Article'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/backend/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/backend/articles',
      name: 'Article',
      component: Article
    }
  ],
  linkActiveClass: "uk-active"
})
