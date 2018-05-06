import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    token: '',
    heroTitle: '控制面板',
    heroDescription: 'Some insights and statistics',
    heroNavbarItems: []
  }
})

export default store
