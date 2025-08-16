import { createStore } from 'vuex'

export default createStore({
  state: {
    theme: localStorage.getItem('theme') || 'light'
  },
  getters: {
    currentTheme: (state) => state.theme
  },
  mutations: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    }
  }
})
