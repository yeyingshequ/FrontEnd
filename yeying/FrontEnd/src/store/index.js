import Vue from "vue";
import Vuex from "vuex";
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
import login from "@/store/login";
import userInfo from "@/store/userInfo";

export  default  new Vuex.Store({
    modules:{
        login,
        userInfo
    }
})