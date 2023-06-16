import { getCommentCard, getCommentCardForV, getCommentInfo, getCommentInfoForV, getDiscoverPostCard, getNotiCard, getPostCard, getPostCardForV, getPostInfo, getPostInfoForV } from "@/api"
import formatTime from "@/tools/formatTime"
import { formatCommentCard, formatUserPost, setRelationShip } from "@/tools/postTools"
import storage from "@/tools/storage"
import { defineStore } from "pinia"
import { IcommentInfo, InotiCard, IpostCard, IpostInfo, IreplyInfo } from "@/store/types"
import { log } from "console"



const usePostStore = defineStore('postStore', {
    state() {
        return {
            //发现板块的帖子卡片信息
            homePostCardList: [] as IpostCard[],
            discoverPostCardList: [] as IpostCard[],
            cmtyPostCardList: [] as IpostCard[],
            userPostCardList: [] as IpostCard[],
            historyPostCardList: [] as IpostCard[],
            searchPostCardList: [] as IpostCard[],
            savedPostCardList: [] as IpostCard[],
            searchCommentCardList: [] as IpostCard[],
            userCommentCardList: [] as IpostCard[],
            savedCommentCardList: [] as IpostCard[],
            //p路由中的帖子信息
            postInfo: {
                postId: 0,
                postTitle: "",
                content: "",
                updateTime: "",
                pubTime: "",
                isDeleted: false,
                images: [''],
                cmtyId: 0,
                cmtyName: "",
                postAuthorId: 0,
                commentCount: 0,
                likeCount: 0,
                giftCount: 0,
                shareCount: 0,
                topFloor: 0,
                comment: [{
                    commentAuthor: {
                        avatar: "",
                        userId: 0,
                        username: "",
                    },
                    commentAuthorId: 0,
                    commentId: 0,
                    commentTopFloor: 0,
                    content: "",
                    floor: 0,
                    likeCount: 0,
                    postAuthorId: 0,
                    postId: 0,
                    pubTime: "",
                    replyCount: 0,
                    reply: [{
                        commentAuthorId: 0,
                        commentId: 0,
                        content: "",
                        postAuthorId: 0,
                        postId: 0,
                        pubTime: "",
                        repliedAuthor: {
                            userId: 0,
                            username: "",
                        },
                        repliedAuthorId: 0,
                        repliedId: 0,
                        replyAuthor: {
                            avatar: "",
                            userId: 0,
                            username: "",
                        },
                        replyAuthorId: 0,
                        replyFloor: 0,
                        replyId: 0
                    }],
                    userComment: {
                        isHidden: false,
                        isSaved: false,
                        lastVisitTime: false,
                        isLiked: false
                    }
                }],
                postAuthor: {
                    avatar: "",
                    userId: 0,
                    username: "",
                },
                community: {
                    cmtyAvatar: "",
                    cmtyName: "",
                    cmtyId: 0
                },
                userPost: {
                    isHidden: false,
                    isLiked: false,
                    isSaved: false,
                    lastVisitTim: false,
                }
            } /* as IpostInfo */,
            commentInfo: {
                commentAuthor: {
                    avatar: "",
                    userId: 0,
                    username: "",
                },
                cmtyId: 0,
                cmtyName: '',
                commentAuthorId: 0,
                commentId: 0,
                commentTopFloor: 0,
                content: "",
                floor: 0,
                likeCount: 0,
                postAuthorId: 0,
                postId: 0,
                pubTime: "",
                replyCount: 0,
                reply: [{
                    commentAuthorId: 0,
                    commentId: 0,
                    content: "",
                    postAuthorId: 0,
                    postId: 0,
                    pubTime: "",
                    repliedAuthor: {
                        userId: 0,
                        username: "",
                    },
                    repliedAuthorId: 0,
                    repliedId: 0,
                    replyAuthor: {
                        avatar: "",
                        userId: 0,
                        username: "",
                    },
                    replyAuthorId: 0,
                    replyFloor: 0,
                    replyId: 0
                }],
                userComment: {
                    isHidden: false,
                    isSaved: false,
                    lastVisitTime: false,
                    isLiked: false
                }
            } as IcommentInfo,
            replyInfo: {
                commentAuthorId: 0,
                commentId: 0,
                content: '',
                likeCount: 0,
                postAuthorId: 0,
                postId: 0,
                pubTime: '',
                repliedAuthor: {
                    userId: 0,
                    username: '',
                },
                repliedAuthorId: 0,
                repliedId: 0,
                replyAuthor: {
                    avatar: '',
                    userId: 0,
                    username: '',
                },
                userComment: {
                    isHidden: false,
                    isSaved: false,
                    lastVisitTime: false,
                    isLiked: false
                },
                replyAuthorId: 0,
                replyFloor: 0,
                replyId: 0,
                userReply: {
                    isHidden: false,
                    isSaved: false,
                    lastVisitTime: false,
                    isLiked: false
                }
            } as IreplyInfo,
            //通知
            replyNotiCardList: [] as InotiCard[],
            likeNotiCardList: [] as InotiCard[]

        }
    },
    actions: {
        async getPostCard(params: { type: string, userId?: number, keyWords?: string, cmtyId?: number, request?: string, extraCondition?: string, reqMorePostCard?: boolean }) {



            const result = storage.get('token')
                ? await getPostCard(params)
                : await getPostCardForV(params);
            let postCard = result.data
            if (postCard.length > 0) {
                for (const card of postCard) {
                    card.userPost = setRelationShip(card, "userPost");
                }
            }
            //console.log(postCard);
            switch (params.type) {
                case "home":
                    this.homePostCardList = postCard
                    break;
                case "moreHome":
                    this.homePostCardList.push(...postCard)
                    break;
                case "user":
                    this.userPostCardList = postCard
                    break;
                case "moreUser":
                    this.userPostCardList.push(...postCard)
                    break;
                case "discover":
                    this.discoverPostCardList = postCard
                    break;
                case "moreDiscover":
                    this.discoverPostCardList.push(...postCard)
                    break;
                case "community":
                    this.cmtyPostCardList = postCard
                    break;
                case "moreCommunity":
                    this.cmtyPostCardList.push(...postCard)
                    break;
                case "search":
                    this.searchPostCardList = postCard
                    break;
                case "moreSearch":
                    this.searchPostCardList.push(...postCard)
                    break;
                case "history":
                    postCard = formatUserPost(postCard)
                    this.historyPostCardList = postCard
                    break;
                case "moreHistory":
                    postCard = formatUserPost(postCard)
                    this.historyPostCardList.push(...postCard)
                    break;
                case "saved":
                    postCard = formatUserPost(postCard)
                    this.savedPostCardList = postCard
                    break
                case "moreSaved":
                    postCard = formatUserPost(postCard)
                    this.savedPostCardList.push(...postCard)
                    break
            }
            return postCard
        },
        async getCommentCard(params: { type: string, userId?: number, keyWords?: string, reqMore?: boolean }) {
            let result = storage.get('token') ? await getCommentCard(params) : getCommentCardForV(params)
            let commentCard = result.data
            //console.log("commentCard:", commentCard);
            if (commentCard.length > 0) {
                for (const card of commentCard) {

                    if (card.commentCardType == 'comment') {
                        card.userComment = setRelationShip(card, 'userComment')
                    } else if (card.commentCardType == 'reply') {
                        card.userReply = setRelationShip(card, 'userReply')
                    }
                }
            }
            switch (params.type) {
                case "user":
                    this.userCommentCardList = commentCard
                    break;
                case "moreUser":
                    this.userCommentCardList.push(...commentCard)
                    break;
                case "search":
                    this.searchCommentCardList = commentCard
                    break;
                case "moreSearch":
                    this.searchCommentCardList.push(...commentCard)
                    break;
                case "saved":
                    commentCard = formatCommentCard(commentCard)
                    this.savedCommentCardList = commentCard
                    break;
                case "moreSaved":
                    commentCard = formatCommentCard(commentCard)
                    this.savedCommentCardList.push(...commentCard)
                    break;
            }
            return commentCard
        },
        async getPostInfo(params: any) {
            let defaultUserPost = {
                isHidden: false,
                isSaved: false,
                lastVisitTime: false,
                isLiked: false
            }
            let defaultUserReply = {
                isHidden: false,
                isLiked: false
            }
            //console.log('开始发送访问帖子信息的请求');
            let result
            if (storage.get('token')) {

                result = await getPostInfo(params)
            } else {
                result = await getPostInfoForV(params)
            }
            if (result.status == 0) {
                //console.log('已经请求到帖子信息');
                result = result.data
                //console.log(result);
                result.userPost = setRelationShip(result, 'userPost')/* result.userPost?.[0] ?? defaultUserPost */
                for (const comment of result.comment) {
                    comment.userComment = setRelationShip(comment, 'userComment')/* comment.userComment?.[0] ?? defaultUserPost */
                    for (const reply of comment.reply) {
                        reply.userReply = setRelationShip(reply, 'userReply') /* reply.userReply?.[0] ?? defaultUserReply */
                    }
                }
                /*****************result赋值到postInfo******************/
                //console.log("帖子信息:", result)
                this.postInfo = result
            }
        },
        async getNotiCard(params: { type: string, extraCondition?: string }) {
            //console.log("参数", params);
            let result = await getNotiCard(params)
            switch (params.type) {
                case "reply":
                    //console.log(result.data);
                    this.replyNotiCardList = result.data
                    break;
                case "moreReply":
                    //console.log(result.data);
                    this.replyNotiCardList.push(...result.data)
                    break;
                case "like":
                    //console.log(result.data);
                    this.likeNotiCardList = result.data
                    break;
                case "moreLike":
                    //console.log(result.data);
                    this.likeNotiCardList.push(...result.data)
                    break;
            }
            return result.data

        },
        async getCommentInfo(params: { postId: number }) {
            let result = storage.get('token') ? await getCommentInfo(params) : await getCommentInfoForV(params)
            result = result.data
            //console.log("回复信息:", result);
            result.userComment = setRelationShip(result, 'userComment')
            if (result.reply) {
                for (const reply of result.reply) {
                    reply.userReply = setRelationShip(reply, 'userReply')
                }
            }
            this.commentInfo = result

        },

    },
    getters: {

    }
})
export default usePostStore