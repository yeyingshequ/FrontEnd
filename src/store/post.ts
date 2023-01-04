import { getCmtyPosts, getDiscoverPostCard, getHomePostCard, getPostInfo, getSavedPostCard, loginApi } from "@/api"
import formatTime from "@/tools/formatTime"
import rename from "@/tools/rename"
import storage from "@/tools/storage"
import { defineStore } from "pinia"
interface IpostCardList {
    avatar: "",
    cmtyAvatar: "null",
    cmtyHots: 0,
    cmtyId: 0,
    cmtyName: "",
    commentCount: 0,
    content: "",
    giftCount: 0,
    isDelete: 0,
    likeCount: 0,
    postAuthorId: 0,
    postId: 0,
    postTitle: "",
    pubTime: "",
    shareCount: 0,
    topFloor: 0,
    updateTime: "",
    userId: 0,
    username: "",
    images: '',
    imgSrc: [
        {
            id: 0,
            img: ""
        }
    ][]
}
const usePostStore = defineStore('postStore', {
    state() {
        return {
            //发现板块的帖子卡片信息
            discoverPostCardList: [],
            //c路由的帖子卡片信息
            cmtyPostCardList: [],
            homePostCardList: [
                {
                    avatar: "",
                    cmtyAvatar: "null",
                    cmtyHots: 0,
                    cmtyId: 0,
                    cmtyName: "",
                    commentCount: 0,
                    content: "",
                    giftCount: 0,
                    isDelete: 0,
                    likeCount: 0,
                    postAuthorId: 0,
                    postId: 0,
                    postTitle: "",
                    pubTime: "",
                    shareCount: 0,
                    topFloor: 0,
                    updateTime: "",
                    userId: 0,
                    username: "",
                    images: '',
                    imgSrc: [
                        {
                            id: 0,
                            img: ""
                        }
                    ]
                }
            ],
            savedPostCardList: [
                {
                    avatar: "",
                    cmtyAvatar: "null",
                    cmtyHots: 0,
                    cmtyId: 0,
                    cmtyName: "",
                    commentCount: 0,
                    content: "",
                    giftCount: 0,
                    isDelete: 0,
                    likeCount: 0,
                    postAuthorId: 0,
                    postId: 0,
                    postTitle: "",
                    pubTime: "",
                    shareCount: 0,
                    topFloor: 0,
                    updateTime: "",
                    userId: 0,
                    username: "",
                    images: '',
                    imgSrc: [
                        {
                            id: 0,
                            img: ""
                        }
                    ]
                }
            ],
            //p路由中的帖子信息
            postInfo: {
                post: {
                    avatar: "",
                    cmtyAvatar: '',
                    cmtyHots: "" || 0,
                    cmtyId: 1,
                    cmtyName: "",
                    commentCount: 0,
                    content: "",
                    giftCount: 0,
                    isDelete: 0,
                    likeCount: 0,
                    postAuthorId: 0,
                    postId: 0,
                    postTitle: "",
                    pubTime: "",
                    shareCount: 0,
                    topFloor: "",
                    updateTime: "",
                    userId: "",
                    username: "",
                },
                comments: [{
                    avatar: "",
                    commentAuthorId: 0,
                    commentId: 0,
                    commentTopFloor: 0,
                    content: "",
                    floor: 0,
                    postAuthorId: 0,
                    postId: 0,
                    pubTime: "",
                    replies: [
                        {

                        }
                    ],
                    userId: 0,
                    username: "",

                }]
            },
            commentInfo: {
                avatar: "",
                commentAuthorId: 0,
                commentId: 0,
                commentTopFloor: 0,
                content: "",
                floor: 0,
                postAuthorId: 0,
                postId: 0,
                pubTime: "",
                replies: [
                    {

                    }
                ],
                userId: 0,
                username: "",

            }


        }
    },
    actions: {
        formatPostCard(result: { status: number; data: any }) {
            if (result.status === 0) {
                for (let i = 0; i < result.data.length; i++) {
                    result.data[i] = rename.toHump(result.data[i])
                    result.data[i].updateTime = formatTime(result.data[i].updateTime)
                }
                console.log(result.data)
            }
        },
        /** 获取导航路由的信息 **/
        async getDiscoverPostCard() {
            let result = await getDiscoverPostCard()
            this.formatPostCard(result)
            this.discoverPostCardList = result.data
        },
        async getCmtyPosts(params: { cmtyId: string | number | string[] }) {
            let result = await getCmtyPosts(params)
            this.formatPostCard(result)
            this.cmtyPostCardList = result.data

        },
        async getHomePostCard() {
            let result = await getHomePostCard()
            this.formatPostCard(result)
            this.homePostCardList = result.data
        },
        async getSavedPostCard() {
            let result = await getSavedPostCard()
            this.formatPostCard(result)
            this.savedPostCardList = result.data
        },
        async getPostInfo(params: { postId: number }) {
            let result = await getPostInfo(params)
            if (result.status === 0) {
                result = result.data
                result.post = rename.toHump(result.post)
                /**********************转为驼峰命名***********************/
                let comments = result.comments
                for (let i = 0; i < comments.length; i++) {
                    comments[i] = rename.toHump(comments[i])
                    for (let j = 0; j < comments[i].replies.length; j++) {
                        comments[i].replies[j] = rename.toHump(comments[i].replies[j])
                    }
                }
                /**********************格式化时间***********************/
                result.post.pubTime = formatTime(result.post.pubTime)
                for (let i = 0; i < result.comments.length; i++) {
                    result.comments[i].pubTime = formatTime(result.comments[i].pubTime)
                    for (let j = 0; j < result.comments[i].replies.length; j++) {
                        result.comments[i].replies[j].pubTime = formatTime(
                            result.comments[i].replies[j].pubTime
                        )
                    }
                }
                /*****************result赋值到postInfo******************/
                //console.log(result)
                this.postInfo = result
            }
        }
    }
})
export default usePostStore