<<<<<<< HEAD
import {getMyInfo} from "@/api";

const state={
    userInfo:{
    }
}
const actions={
    async reqUserInfo({commit}) {
        let result = await getMyInfo()
        commit('REQUSERINFO', result.data)
    }
}
const mutations={
    REQUSERINFO(state,value){
        state.userInfo = value;

    }
}
const getters={}

export default {
    state,
    mutations,
    actions,
    getters
}
=======
import {getMyInfo} from '@/api'

const state = {
  userInfo: {},
}
const actions = {
  async reqUserInfo({commit}) {
    let result = await getMyInfo()
    commit('REQUSERINFO', result.data)
  },
}
const mutations = {
  REQUSERINFO(state, value) {
    state.userInfo = value
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
