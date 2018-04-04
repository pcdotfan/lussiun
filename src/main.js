// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'


Vue.use(Vuex)

// loads the Icon plugin
UIkit.use(Icons);

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    heroTitle: '控制面板',
    heroDescription: 'Some insights and statistics',
    heroNavbarItems: []
  },
  mutations: {
    changeHero (state, hero) {
      state.heroTitle = hero.heroTitle
      state.heroDescription = hero.heroDescription
      state.heroNavbarItems = hero.heroNavbarItems
    }
  }
})

const unsync = sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
