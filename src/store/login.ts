import { loginApi } from "@/api"
import storage from "@/tools/storage"
import { defineStore } from "pinia"

const useLoginStore = defineStore('login', {
  state: () => {
    return {
      token: '',
      UID: '',
      username: '',
      message: ''
    }
  },
  getters: {
    getToken: (state) => {
      return state.token || storage.get('token') || ''
    },
  },
  actions: {
    async login(params: { username: string, password: string }) {
      //console.log('正在提交登录请求')
      let result = await loginApi(params)
      //console.log("result:", result)
      if (result.status === 0) {
        this.token = result.data.token
        this.UID = result.data.userId
        this.username = result.data.username
        this.message = result.message
        storage.set('token', this.token)
      }
      return result

    },
  },

})

export default useLoginStore