import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    hero: {
      title: '控制面板',
      description: 'Some insights and statistics',
      navbarItems: []
    }
  },
  mutations: {
    changeHero(state, hero) {
      state.hero = hero
    }
  }
})

export default store
