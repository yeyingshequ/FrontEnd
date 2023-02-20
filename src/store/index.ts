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
      showMoreNav: false,
      defaultAvatar: 'https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg',
      //关于Top的数据
      topBottom: 0,
      tabTop: 0,
      showTopButton: false

    }
  },
  actions: {
    tabTouchedTop() {
      return this.topBottom == this.tabTop ? true : false
    }

  },
  getters: {

  }
})
export default useMainStore