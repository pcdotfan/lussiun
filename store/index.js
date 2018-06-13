import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const moment = require('moment')
const store = () => new Vuex.Store({
  state: {
    draftCode: moment().format('x'),
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
      // this.$cookies.set('draft-code', moment().format('x'))
      // state.draftCode = this.$cookies.get('draft-code')
    }
  }
})

export default store
