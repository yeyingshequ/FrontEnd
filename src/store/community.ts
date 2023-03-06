import { getCmtyCard, getCmtyInfo, getCmtyPosts, getCmtySquareCardList, getDiscoverPostCard, getFavoriteCmty, getHomePostCard, getJoinedCmty, getPostInfo, getRecentCmty, getSavedPostCard, getUserCmty } from "@/api"
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
      searchCmtyCardList: []
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
    async getUserCmty(params: { userId: Number }) {
      let result: any = await getUserCmty(params)
      if (result.status == 0) {
        this.userCmtyCardList = result.data
      }
    },
    async getCmtyCard(params: { type: string, userId?: number, keyWords?: string }) {
      console.log("getCmtyCard");

      let result = await getCmtyCard(params);
      console.log(result.data);
      switch (params.type) {
        case "searchCmty":
          this.searchCmtyCardList = result.data;
          break;
        case "cmtySquare":
          this.cmtySquareCardList = result.data
          break;
        case "joined":
          this.joinedCmtyCardList = result.data
          break;
        case "favorite":
          this.favoriteCmtyCardList = result.data
          break;
        case "recent":
          this.recentCmtyCardList = result.data
          break;

      }

    },
  },


  getters: {

  }
})
export default useCmtyStore

