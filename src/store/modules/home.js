import * as types from '../mutations-types'

export default {
  state: {
    id: '900909090'
  },
  getters: {
    id: state => state.id
  },
  mutations: {
    [ types.SET_ID ] (state, data) {
      state.id = data
    }
  },
  actions: {
    setId (store, data) {
      store.commit(types.SET_ID, data)
    }
  }

}
