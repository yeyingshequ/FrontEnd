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



import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
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
            isScrollingStopped: false,
            showUpdateInfo: false,
            defaultAvatar:
                'https://yeying-1317878245.cos.ap-nanjing.myqcloud.com/1685679480931_4m383j175l6i6d2g4wa115q555v3i1x',
            defaultCover: 'https://yeying-1317878245.cos.ap-nanjing.myqcloud.com/1685679480936_1x5pq1a2h6g36e313o4a1p5p4g6c56',



            searchKeyWord: '',
            topLevelRouteKey: 0,
            mainPageKey: 0,
            /********展示图片******** */
            showImgDisplyer: false,
            displayImgType: '',
            displayImgUrl: ''

        }
    },
    actions: {

        showMessage(message: string, type: undefined) {
            ElMessage({
                grouping: true,
                message: message,
                type: type == 0 ? 'success' : 'error'
            })
        },
        clearObj(obj: { [x: string]: any }) {
            Object.keys(obj).forEach((key) => delete obj[key])
        },
        async setShowLoginScreen(result: { message: string }) {
            if (result.message == '用户认证失败') {
                this.showLoginScreen = true
            }
        },
        reqDisplayImg(url: any, type?: string) {
            this.isScrollingStopped = true
            this.showImgDisplyer = true
            this.displayImgUrl = url
            this.displayImgType = type || ''
        },
        close(type: string) {
            switch (type) {
                case "cmtyCreator":
                    this.showCmtyCreator = false
                    break;
                case 'postEditor':
                    this.showPostEditor = false
                    break
                case "commentEditor":
                    this.showCommentEditor = false
                    break;
                case 'replyEditor':
                    this.showReplyEditor = false
                    break
                case 'imgDisplayer':
                    this.showImgDisplyer = false
                    break
                case 'updateUserInfo':
                    this.showUpdateInfo = false
                    break;
                case 'loginAndRegister':
                    this.showLoginScreen = false
                default:
                    break;
            }
            this.isScrollingStopped = false
        }


    },
    getters: {}
})
export default useMainStore
