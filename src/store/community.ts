import { getCmtyCard, getCmtyCardForV, getCmtyInfo, getCmtyInfoForV, getCmtyPosts, getDiscoverPostCard, getPostInfo } from "@/api"
import formatTime from "@/tools/formatTime"
import storage from "@/tools/storage";
import { isNumber } from "lodash";
import { defineStore } from "pinia"
const useCmtyStore = defineStore('cmtyStore', {
  state() {
    return {
      //c路由中的社区信息
      cmtyInfo: {
        cmtyAvatar: '' || null,
        cmtyDescription: '',
        cmtyCategory: "",
        cmtyCover: '',
        cmtyHots: "",
        cmtyId: 0,
        cmtyJoinedCount: 0,
        cmtyName: "",
        postCount: 0,
        commentCount: 0,
        cmtyReplyCount: 0,
        userCmty: {
          isFavorite: false,
          isJoined: false,
        }
      },
      /** 社区卡片列表数据 **/
      userCmtyCardList: [
        {
          cmtyAvatar: '',
          cmtyDescription: "",
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
      joinedCmtyCardList: [{ cmtyId: 0, cmtyName: '' }],
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
      this.cmtyInfo = {
        cmtyAvatar: '' || null,
        cmtyDescription: '',
        cmtyCategory: "",
        cmtyCover: '',
        cmtyHots: "",
        cmtyId: 0,
        cmtyJoinedCount: 0,
        cmtyName: "",
        postCount: 0,
        commentCount: 0,
        cmtyReplyCount: 0,
        userCmty: {
          isFavorite: false,
          isJoined: false,
        }
      }
      let result
      if (storage.get("token")) {
        result = await getCmtyInfo(params)
      } else {
        result = await getCmtyInfoForV(params)
      }

      //console.log("社区信息:", result);
      result.data.userCmty
        ? result.data.userCmty = result.data.userCmty[0]
        : result.data.userCmty = {
          isFavorite: false,
          isJoined: false
        }
      this.cmtyInfo = result.data
      return result.message
    },
    async getCmtyCard(params: { type: string, userId?: number, keyWords?: string }) {
      //console.log("getCmtyCard");
      switch (params.type) {
        case "search":
          this.searchCmtyCardList = [];
          break;
        case "cmtySquare":
          this.cmtySquareCardList = []
          break;
        case "joined":
          this.joinedCmtyCardList = []
          break;
        case "favorite":
          this.favoriteCmtyCardList = []
          break;
        case "recent":
          this.recentCmtyCardList = []
          break;
        case "user":
          this.userCmtyCardList = []
          break;
      }
      let result
      if (storage.get("token")) {
        result = await getCmtyCard(params);
      } else {
        result = await getCmtyCardForV(params)
      }

      let card = result.data
      if (params.type == "recent") {
        for (let i = 0; i < card.length; i++) {
          card[i].community.userCmty = [{ isJoined: card[i].isJoined, isFavorite: card[i].isFavorite, lastVisitTime: card[i].lastVisitTime }];
          delete card[i].isJoined;
          delete card[i].isFavorite;
          delete card[i].lastVisitTime;
          card[i] = card[i].community
        }
        console.log(card);


      }
      for (let i = 0; i < card.length; i++) {
        card[i].userCmty
          ? (card[i].userCmty = card[i].userCmty[0])
          : (card[i].userCmty = {
            isFavorite: false,
            isJoined: false
          })
      }
      console.log("社区卡片:", card);
      console.log(params.type);

      switch (params.type) {
        case "search":
          this.searchCmtyCardList = card;
          break;
        case "cmtySquare":
          this.cmtySquareCardList = card
          break;
        case "joined":
          this.joinedCmtyCardList = card
          break;
        case "favorite":
          this.favoriteCmtyCardList = card
          break;
        case "recent":
          this.recentCmtyCardList = card
          break;
        case "user":
          this.userCmtyCardList = card
          break;
      }

    },
  },


  getters: {

  }
})
export default useCmtyStore

