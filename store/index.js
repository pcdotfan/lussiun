import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const moment = require('moment')
const store = () => new Vuex.Store({
  state: {
    draft: 0,
    hero: {
      title: '控制面板',
      description: 'Some insights and statistics',
      navbarItems: []
    }
  },
  mutations: {
    changeHero (state, hero) {
      state.hero = hero
    },
    updateDraft (state) {
      state.draft = moment().format('x')
    }
  }
})

export default store
