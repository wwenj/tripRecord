import * as types from '../mutations-types'

export default {
  state: {
    user: null
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    [ types.SET_USER ] (state, data) {
      state.user = data
    }
  },
  actions: {
    setUser (store, data) {
      store.commit(types.SET_USER, data)
    }
  }

}
