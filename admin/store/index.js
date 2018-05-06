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
    // 登录、登出都只靠 token 来实现
    [types.LOGIN]: (state, data) => {
      // 调用一个 action 来获取登录成功后的 token，否则登录不成功
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
