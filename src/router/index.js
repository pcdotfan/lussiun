import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/backend/dashboard/Dashboard'
import Article from '@/components/backend/article/Overview'
import ArticleNew from '@/components/backend/article/ArticleNew'
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
      component: Article,
      children: [
        {
          path: 'new',
          component: ArticleNew
        }
      ]
    }
  ],
  linkActiveClass: "uk-active",
  exactLinkActiveClass: "uk-active"
})
