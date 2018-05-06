import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./types"

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    user: {},
    token: null,
    heroTitle: '控制面板',
    heroDescription: 'Some insights and statistics',
    heroNavbarItems: []
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null
    },
  }
})

export default store
