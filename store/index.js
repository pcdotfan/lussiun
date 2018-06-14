import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const moment = require('moment')
const store = () => new Vuex.Store({
  state: {
    draftCode: localStorage.getItem('draftCode') || moment().format('x'),
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
    setDraft (state) {
      localStorage.setItem('draftCode', state.draftCode)
    },
    cleanDraft (state) {
      localStorage.setItem('draftCode', moment().format('x'))
      state.draftCode = localStorage.getItem('draftCode')
    }
  }
})

export default store
