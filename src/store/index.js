import { createStore } from 'vuex'

export default createStore({
  state: {
    user: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')) : {},
    token: sessionStorage.getItem('token')
  },
  getters: {
  },
  mutations: {
    setUser(state, nv) {
      this.state.user = nv
    },
    setToken(state, nv) {
      this.state.token = nv
    }
  },
  actions: {
    setLoginUser() {
      sessionStorage.setItem('user', JSON.stringify(this.user))
      sessionStorage.setItem('token', this.user.token)

      this.commit('setUser', this.user)
      this.commit('setToken', this.user.token)
    }
  },
  modules: {
  }
})
