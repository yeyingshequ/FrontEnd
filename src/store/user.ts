import { getMyInfo, getUserCard, getUserCardForV, getUserInfo, getUserInfoForV } from '@/api/index'
import storage from '@/tools/storage'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state() {
    return {
      showUpdateInfo: false,
      myInfo: {
        userId: 0,
        username: '',
        avatar: '',
        boi: '',
        cover: ''
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
      }],
      searchUserCardList: [{
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
      //console.log("token:", storage.get('token'));
      let result = await getMyInfo()
      console.log("myinfo:", result);
      this.myInfo = result.data
    },
    async getUserInfo(params: Object) {
      let result
      this.userInfo = {
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
      if (storage.get("token")) {
        result = await getUserInfo(params)
      } else {
        result = await getUserInfoForV(params)
      }
      result.data.objUser
        ? (result.data.objUser = result.data.objUser[0])
        : (result.data.objUser = (result.data.objUser = { isFolling: false, isBlock: false }))
      this.userInfo = result.data
      //console.log('userInfo:', this.userInfo)
      return result
    },
    async getUserCard(params: { type: string, userId?: number, keyWords?: string }) {
      let result

      switch (params.type) {
        case 'Followers':
          this.followers = []
          break;
        case 'Following':
          this.following = []
          break;
        case 'search':
          this.searchUserCardList = []
          break;
      }
      if (storage.get("token")) {
        result = await getUserCard(params)
      } else {
        result = await getUserCardForV(params)
      }
      let userCard = result.data
      for (let i = 0; i < userCard.length; i++) {
        userCard[i].objUser
          ? (userCard[i].objUser = userCard[i].objUser[0])
          : (userCard[i].objUser = { isFolling: false, isBlock: false })
      }
      if (result.status == 0) {
        console.log('用户卡片:', userCard);
        switch (params.type) {
          case 'Followers':
            this.followers = userCard
            break;
          case 'Following':
            this.following = userCard
            break;
          case 'search':
            this.searchUserCardList = userCard
            break;
        }
      }
    }

  },
  getters: {

  }
})
export default useUserStore




