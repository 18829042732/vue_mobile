import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
const TOKEN = 'TOUTIAO_USER'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    // user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER')),
    // user: null
    // 获取本地数据
    user: getItem(TOKEN)
  },
  mutations: {
    // setUser(state, user) {
    //   state.user = user
    //   window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(user))
    // },
    setUser(state, data) {
      state.user = data
      // 保存本地数据
      setItem(TOKEN, state.user)
    }
  },
  actions: {},
  modules: {}
})
