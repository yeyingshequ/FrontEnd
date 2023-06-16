import { getCmtyCard, getCmtyCardForV, getCmtyInfo, getCmtyInfoForV, getCmtyPosts, getDiscoverPostCard, getPostInfo } from "@/api"
import formatTime from "@/tools/formatTime"
import storage from "@/tools/storage";
import { isNumber } from "lodash";
import { defineStore } from "pinia"
import { IcmtyCard } from "./types";
import { formatUserCmty } from "@/tools/postTools";
import useUserStore from "@/store/user"
const userStore = useUserStore()
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
        totalPostingCount: 0,
        userCmty: {
          isFavorite: false,
          isJoined: false,
          lastVisitTime: false,
          joinedTime: false,
          rankTime: false,
          favoriteTime: false
        }
      },
      /** 社区卡片列表数据 **/
      userCmtyCardList: [] as IcmtyCard[],
      joinedCmtyCardList: [] as IcmtyCard[],
      cmtySquareCardList: [] as IcmtyCard[],
      recentCmtyCardList: [] as IcmtyCard[],
      favoriteCmtyCardList: [] as IcmtyCard[],
      searchCmtyCardList: [] as IcmtyCard[],
      editorCmtyCardList: [] as IcmtyCard[],
    }
  },
  actions: {
    async formatCmtyCard(cmtyCard: Object, result: { status: number, data: Object }) {
      //console.log('社区卡片:', cmtyCard);
      //console.log('数据:', result);
      if (result.status == 0) {
        cmtyCard = result.data
        //console.log("joinedCmtyCardList:", joinedCmtyCardList);
      }

      //console.log('更新后的社区卡片:', cmtyCard);

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
        totalPostingCount: 0,
        cmtyName: "",
        postCount: 0,
        commentCount: 0,
        cmtyReplyCount: 0,
        userCmty: {
          isJoined: false,
          isFavorite: false,
          lastVisitTime: false,
          joinedTime: false,
          rankTime: false,
          favoriteTime: false
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
          isJoined: false,
          lastVisitTime: false,
          joinedTime: false,
          rankTime: false,
          favoriteTime: false
        }
      this.cmtyInfo = result.data
      return result.message
    },
    async getCmtyCard(params: { type: string, userId?: number, keyWords?: string, extraCondition?: string }) {
      //console.log("params:", params);

      let result
      if (userStore.myInfo.userId || storage.get('token')) {
        result = await getCmtyCard(params);
      } else {
        result = await getCmtyCardForV(params)
      }

      let card = result.data

      for (let i = 0; i < card.length; i++) {
        card[i].userCmty
          ? (card[i].userCmty = card[i].userCmty[0])
          : (card[i].userCmty = {
            isFavorite: false,
            isJoined: false,
            lastVisitTime: false,
            joinedTime: false,
            rankTime: false,
            favoriteTime: false
          })
      }
      //console.log("社区卡片:", card);
      //console.log(params.type);

      switch (params.type) {
        case "search":
          this.searchCmtyCardList = card;
          break;
        case "cmtySquare":
          this.cmtySquareCardList = card
          break;
        case "joined":
          this.joinedCmtyCardList = formatUserCmty(card)
          break;
        case "favorite":
          this.favoriteCmtyCardList = formatUserCmty(card)
          break;
        case "recent":
          this.recentCmtyCardList = formatUserCmty(card)
          break;
        case "user":
          this.userCmtyCardList = formatUserCmty(card)
          break;
        case "moreSearch":
          this.searchCmtyCardList.push(...card);
          break;
        case "moreCmtySquare":
          this.cmtySquareCardList.push(...card)
          break;
        case "moreJoined":
          this.joinedCmtyCardList.push(...formatUserCmty(card))
          break;
        case "moreFavorite":
          this.favoriteCmtyCardList.push(...formatUserCmty(card))
          break;
        case "moreRecent":
          this.recentCmtyCardList.push(...formatUserCmty(card))
          break;
        case "moreUser":
          this.userCmtyCardList.push(...formatUserCmty(card))
          break;
        case "editor":
          this.editorCmtyCardList = formatUserCmty(card)
          break;
      }
      return card

    }
  },


  getters: {

  }
})
export default useCmtyStore

