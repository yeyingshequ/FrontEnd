//import { defineStore } from "pinia"
//const use***Store = defineStore('***Store',{
//  state(){
//    return{
//        
//
//    }
//  },
//  actions:{
//
//  },
//  getters:{
//
//  }
//})
//export default use***Store

import { defineStore } from "pinia"
const useMainStore = defineStore('mainStore', {
  state() {
    return {
      //展示登录框
      showLoginScreen: false,
      showPostEditor: false,
      showCommentEditor: false,
      showReplyEditor: false,
      showLogout: false,
      showCmtyCreator: false,
      showMoreNav: false


    }
  },
  actions: {

  },
  getters: {

  }
})
export default useMainStore