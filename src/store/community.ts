import { getCmtyInfo, getCmtyPosts, getCmtySquareCardList, getDiscoverPostCard, getFavoriteCmty, getHomePostCard, getJoinedCmty, getPostInfo, getRecentCmty, getSavedPostCard, getUserCmty } from "@/api"
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
      userCmtyCardList: [
        {
          cmtyAvatar: '',
          cmtyBio: "",
          cmtyCategory: "",
          cmtyCover: "",
          cmtyHots: 0,
          cmtyId: 1,
          cmtyJoinedCount: 0,
          cmtyName: "",
          cmtyPostsCount: 0,
          isFavorite: 0,
          isJoined: 0,
          lastVisitTime: "",
        }
      ],
      joinedCmtyCardList: [{
        cmtyAvatar: '',
        cmtyBio: "",
        cmtyCategory: "",
        cmtyCover: "",
        cmtyHots: 0,
        cmtyId: 1,
        cmtyJoinedCount: 0,
        cmtyName: "",
        cmtyPostsCount: 0,
        isFavorite: 0,
        isJoined: 0,
        lastVisitTime: "",
      }],
      cmtySquareCardList: [],
      recentCmtyCardList: [],
      favoriteCmtyCardList: [],
    }
  },
  actions: {
    async formatCmtyCard(cmtyCard: Object, result: { status: number, data: Object }) {
      console.log('社区卡片:', cmtyCard);
      console.log('数据:', result);
      if (result.status == 0) {
        cmtyCard = result.data
        //console.log("joinedCmtyCardList:", joinedCmtyCardList);
      }

      console.log('更新后的社区卡片:', cmtyCard);

    },
    async getCmtyInfo(params: { cmtyId: number }) {
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
        this.recentCmtyCardList = result.data
      }
    },
    async getJoinedCmty() {
      let result: any = await getJoinedCmty()
      if (result.status == 0) {
        this.joinedCmtyCardList = result.data
      }
    },
    async getUserCmty(params: { userId: Number }) {
      let result: any = await getUserCmty(params)
      if (result.status == 0) {
        this.userCmtyCardList = result.data
      }
    },
    async getCmtySquareCardList(params: {
      //category: string | string[]
    }) {
      let result: any = await getCmtySquareCardList(params)
      if (result.status == 0) {
        this.cmtySquareCardList = result.data
        console.log("cmtySquareCardList:", this.cmtySquareCardList);

      }
    },
    async getFavoriteCmty() {
      let result = await getFavoriteCmty();
      if (result.status == 0) {
        this.favoriteCmtyCardList = result.data;
        console.log("favoriteCmtyCardList:", this.favoriteCmtyCardList);
      }
    },
  },


  getters: {

  }
})
export default useCmtyStore

