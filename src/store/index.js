<<<<<<< HEAD
import Vue from "vue";
import Vuex from "vuex";
=======
import Vue from 'vue'
import Vuex from 'vuex'
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
Vue.use(Vuex)
/* 小仓库模板
const state={}
const actions={}
const mutations={}
const getters={}

export default {
    state,
    mutations,
    actions,
    getters
}
 */
//引入小仓库
<<<<<<< HEAD
import login from "@/store/login";
import userInfo from "@/store/userInfo";

export  default  new Vuex.Store({
    modules:{
        login,
        userInfo
    }
})
=======
import login from '@/store/login'
import userInfo from '@/store/userInfo'

export default new Vuex.Store({
  modules: {
    login,
    userInfo,
  },
})
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
