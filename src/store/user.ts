import { getMyInfo, getUserCard, getUserInfo } from '@/api/index'
import rename from '@/tools/rename'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state() {
    return {
      showUpdateInfo: false,
      myInfo: {
        userId: 0,
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
      },
      followers: [{
        avatar: "",
        bio: "",
        cover: "",
        followerCount: 0,
        followingCount: 0,
        isBlock: 0,
        isFollowing: 0,
        userId: 0,
        username: "",
      }],
      following: [{
        avatar: "",
        bio: "",
        cover: "",
        followerCount: 0,
        followingCount: 0,
        isBlock: 0,
        isFollowing: 0,
        userId: 0,
        username: "",
      }]
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
    },
    async getUserCard(params: { type: string, userId: number }) {
      let result: any = await getUserCard(params)
      if (result.status == 0) {
        result = result.data
        switch (params.type) {
          case 'Followers':
            console.log('用户卡片:', result);
            this.followers = result
            break;

          case 'Following':
            console.log('用户卡片:', result);
            this.following = result
            break;
        }
      }
    }
  },
  getters: {

  }
})
export default useUserStore




