import {loginApi} from '@/api'
import storage from '@/tools/storage'

const state = {
  token: '',
  UID: '',
  username: '',
}
const actions = {
  async reqLogin({commit}, params = {}) {
    let result = await loginApi(params)
    if (result.status === 0) {
      commit('SETTOKEN', result)
    }
    return result
  },
}
const mutations = {
  SETTOKEN(state, value) {
    state.token = value.token
    state.UID = value.userId
    state.username = value.username
    storage.set('token', state.token)
  },
}
const getters = {
  getToken(state) {
    return state.token || storage.get('token') || ''
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
