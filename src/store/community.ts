import { getCmtyInfo, getCmtyPosts, getCmtySquareCardList, getDiscoverPostCard, getFavoriteCmty, getHomePostCard, getJoinedCmty, getPostInfo, getRecentCmty, getSavedPostCard } from "@/api"
import formatTime from "@/tools/formatTime"
import rename from "@/tools/rename";
import { isNumber } from "lodash";
import { defineStore } from "pinia"
const useCmtyStore = defineStore('cmtyStore', {
  state() {
    return {
      //c路由中的社区信息
      cmtyInfo: {
        cmtyAvatar: '' || null,
        cmtyBio: '',
        cmtyCategory: "",
        cmtyCover: '',
        cmtyHots: "",
        cmtyId: 0,
        cmtyJoinedCount: 0,
        cmtyName: "",
        cmtyPostsCount: 0,
        isFavorite: 0,
        isJoined: 0,
      },
      /** 社区卡片列表数据 **/
      joinedCmtyCardList: [],
      cmtySquareCardList: [],
      recentCmtyCardList: [],
      favoriteCmtyCardList: [],
    }
  },
  actions: {


    /** 获取CPU三路由的信息的信息 **/
    async getCmtyInfo(params: { cmtyId: string | string[] }) {
      let result = await getCmtyInfo(params)
      result.data = rename.toHump(result.data)
      this.cmtyInfo = result.data
      console.log("cmtyInfo", this.cmtyInfo);

      return result.message
    },
    /** 获取<社区>导航板块的社区卡片信息 **/
    async getRecentCmty() {
      let result: any = await getRecentCmty()
      console.log("result:", result);
      if (result.status == 0) {
        result = result.data
        for (let i = 0; i < result.length; i++) {
          result[i] = rename.toHump(result[i])
        }
        this.recentCmtyCardList = result
      }
    },
    async getJoinedCmty() {
      let result: any = await getJoinedCmty()
      if (result.status == 0) {
        result = result.data
        for (let i = 0; i < result.length; i++) {
          result[i] = rename.toHump(result[i])
        }
        this.joinedCmtyCardList = result
        //console.log("joinedCmtyCardList:", joinedCmtyCardList);

      }
    },
    async getCmtySquareCardList(params: {
      //category: string | string[]
    }) {
      let result: any = await getCmtySquareCardList(params)
      if (result.status == 0) {
        result = result.data
        for (let i = 0; i < result.length; i++) {
          result[i] = rename.toHump(result[i])
        }
        this.cmtySquareCardList = result
        console.log("cmtySquareCardList:", this.cmtySquareCardList);

      }
    },
    async getFavoriteCmty() {
      let result = await getFavoriteCmty();
      if (result.status == 0) {
        result = result.data;
        for (let i = 0; i < result.length; i++) {
          result[i] = rename.toHump(result[i]);
        }
        this.favoriteCmtyCardList = result;
        console.log("favoriteCmtyCardList:", this.favoriteCmtyCardList);
      }
    }
  },


  getters: {

  }
})
export default useCmtyStore