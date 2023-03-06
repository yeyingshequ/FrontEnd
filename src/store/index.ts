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

import { ElMessage } from "element-plus"
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
      showTopButton: false,
      topScroll: '60px',
      parentTop: 0,
      searchKeyWord: '',
      topLevelRouteKey: 0,
      mainPageKey: 0
    }
  },
  actions: {
    tabTouchedTop() {
      return this.topBottom == this.tabTop ? true : false
    },
    showMessage(message: string, type: undefined) {
      ElMessage({
        grouping: true,
        message: message,
        type: type == 0 ? 'success' : 'error'
      })
    }

  },
  getters: {

  }
})
export default useMainStore