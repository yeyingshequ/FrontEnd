import { getMyInfo, getUserInfo } from '@/api/index'
import rename from '@/tools/rename'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state() {
    return {
      showUpdateInfo: false,
      myInfo: {
        userId: '',
        username: '',
        avatar: '',
        boi: ''
      },
      userInfo: {
        userId: 0,
        username: '',
        avatar: '',
        bio: '',
        cover: '',
        followerCount: 0,
        followingCount: 0,
        isFollowing: 0,
        isBlock: 0
      }
    }
  },
  actions: {
    async getMyInfo() {
      let result = await getMyInfo()
      //console.log("myinfo:", result);

      this.myInfo = result.data
    },
    async getUserInfo(params: Object) {
      let result = await getUserInfo(params)
      result.data = rename.toHump(result.data)
      result.data = rename.toHump(result.data)
      this.userInfo = result.data
      //console.log('userInfo:', this.userInfo)
      return result
    }
  },
  getters: {

  }
})
export default useUserStore




