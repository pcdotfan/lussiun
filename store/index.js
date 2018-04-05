import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
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

export default store
