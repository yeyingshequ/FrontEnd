import { getMyInfo } from '@/api/index'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state() {
    return {
      showUpdateInfo: false,
      userInfo: {
        userId: '',
        username: '',
        avatar: '',
        boi: ''
      }
    }
  },
  actions: {
    async getMyInfo() {
      let result = await getMyInfo()
      //console.log("myinfo:", result);

      this.userInfo = result.data
    },
  },
  getters: {

  }
})
export default useUserStore




