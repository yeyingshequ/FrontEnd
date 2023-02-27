import { getCmtyPosts, getCommentInfo, getDiscoverPostCard, getHomePostCard, getNotiCard, getPostCard, getPostInfo, getSavedPostCard } from "@/api"
import formatTime from "@/tools/formatTime"
import rename from "@/tools/rename"
import { defineStore } from "pinia"
interface IpostInfo {
    postId: number,
    postTitle: string,
    content: string,
    updateTime: string,
    pubTime: string,
    isDeleted: boolean,
    cmtyId: number,
    postAuthorId: number,
    commentCount: number,
    likeCount: number,
    giftCount: number,
    shareCount: number,
    topFloor: number,
    comment: [{
        commentAuthor: {
            avatar: string,
            userId: number,
            username: string,
        },
        commentAuthorId: number,
        commentId: number,
        commentTopFloor: number,
        content: string,
        floor: number,
        likeCount: number,
        postAuthorId: number,
        postId: number,
        pubTime: string,
        repliesCount: number,
        reply: [{
            commentAuthorId: number,
            commentId: number,
            content: string,
            likeCount: number,
            postAuthorId: number,
            postId: number,
            pubTime: string,
            repliedAuthor: {
                userId: number,
                username: string,
            },
            repliedAuthorId: number,
            repliedId: number,
            replyAuthor: {
                avatar: string,
                userId: number,
                username: string,
            },
            userComment: {
                isHidden: boolean,
                isSaved: boolean,
                lastVisitTime: boolean,
                isLiked: boolean
            }
            replyAuthorId: number,
            replyFloor: number,
            replyId: number,
            userReply: {
                isHidden: boolean,
                isSaved: boolean,
                lastVisitTime: boolean,
                isLiked: boolean
            }
        }],
        userComment: {
            isHidden: boolean,
            isSaved: boolean,
            lastVisitTime: boolean,
            isLiked: boolean
        }
    }],
    postAuthor: {
        avatar: string,
        userId: number
        username: string,
    },
    community: {
        cmtyAvatar: string,
        cmtyName: string,
        cmtyId: number
    },
    userPost: {
        isHidden: boolean,
        isLiked: boolean,
        isSaved: boolean,
        lastVisitTim: boolean,
    }

}
interface IcommentInfo {
    commentAuthor: {
        avatar: string,
        userId: number,
        username: string,
    },
    commentAuthorId: number,
    commentId: number,
    commentTopFloor: number,
    content: string,
    floor: number,
    likeCount: number,
    postAuthorId: number,
    postId: number,
    pubTime: string,
    repliesCount: number,
    reply: {
        commentAuthorId: number,
        commentId: number,
        content: string,
        postAuthorId: number,
        postId: number,
        pubTime: string,
        repliedAuthor: {
            userId: number,
            username: string,
        },
        repliedAuthorId: number,
        repliedId: number,
        replyAuthor: {
            avatar: string,
            userId: number,
            username: string,
        },
        replyAuthorId: number,
        replyFloor: number,
        replyId: number
    }
}

interface Ireply {
    commentAuthorId: number,
    commentId: number,
    content: string,
    postAuthorId: number,
    postId: number,
    pubTime: string,
    repliedAuthor: {
        userId: number,
        username: string,
    },
    repliedAuthorId: number,
    repliedId: number,
    replyAuthor: {
        avatar: string,
        userId: number,
        username: string,
    },
    replyAuthorId: number,
    replyFloor: number,
    replyId: number
}
interface IpostCard {
    postId: number,
    postTitle: string,
    content: string,
    updateTime: string,
    pubTime: string,
    isDeleted: number | boolean,
    cmtyId: number,
    postAuthorId: number,
    commentCount: number,
    likeCount: number,
    giftCount: number,
    shareCount: number,
    topFloor: number,
    avatar: string,
    userId: number,
    username: string,
    cmtyAvatar: string,
    cmtyName: string,
    userPost: {
        isHidden: boolean,
        isLiked: boolean,
        isSaved: boolean,
        lastVisitTim: boolean,
    }
}
interface InotiCard {
    commentId: number,
    id: number,
    notiType: string,
    postId: number,
    receiverId: number,
    replyId: number,
    senderId: number,
    notiComment: {
        commentId: number,
        content: string,
        pubTime: string
    },
    notiPost: {
        content: string,
        postId: number,
        pubTime: string,
        updateTime: string,
    },
    notiReply: {
        content: string,
        pubTime: string,
        replyId: number
    },
    notiSender: {
        avatar: string,
        userId: number,
        username: string
    },
    content: string,
    notiTime: string,
    postContent: string,
    postTitle: string,
    repliedContent: string,
    repliedId: number,
    cmtyName: string,
    cmtyId: number,

}

const usePostStore = defineStore('postStore', {
    state() {
        return {
            //发现板块的帖子卡片信息
            discoverPostCardList: [],
            //c路由的帖子卡片信息
            cmtyPostCardList: [{} as IpostCard],
            userPostCardList: [{} as IpostCard],
            homePostCardList: [
            ],
            savedPostCardList: [
                {} as IpostCard
            ],
            //p路由中的帖子信息
            postInfo: {
                postId: 0,
                postTitle: "",
                content: "",
                updateTime: "",
                pubTime: "",
                isDeleted: false,
                cmtyId: 0,
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
                    repliesCount: 0,
                    reply: {
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
                    },
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
            } as IpostInfo,
            commentInfo: {
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
                repliesCount: 0,
                reply: [{
                    commentAuthorId: 0,
                    commentId: 0,
                    content: "",
                    likeCount: 0,
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
                }]
            },
            replyInfo: {
                commentAuthorId: 0,
                commentId: 0,
                content: "",
                likeCount: 0,
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
                replyId: 0,
                userReply: {
                    isHidden: false,
                    isSaved: false,
                    lastVisitTime: false,
                    isLiked: false
                }
            } as Ireply,
            //通知
            replyNotiCardList: [
                {
                    commentId: 0,
                    id: 0,
                    notiType: "",
                    postId: 0,
                    receiverId: 0,
                    replyId: 0,
                    senderId: 0,
                    notiComment: {
                        commentId: 0,
                        content: "",
                        pubTime: ""
                    },
                    notiPost: {
                        content: "",
                        postId: 0,
                        pubTime: "",
                        updateTime: "",
                    },
                    notiReply: {
                        content: "",
                        pubTime: "",
                        replyId: 0
                    },
                    notiSender: {
                        avatar: "",
                        userId: 0,
                        username: ""
                    },
                    content: "",
                    notiTime: "",
                    postContent: "",
                    postTitle: "",
                    repliedContent: "",
                    repliedId: 0,
                    cmtyName: "",
                    cmtyId: 0,
                } as InotiCard],
            likeNotiCardList: [{
                id: 0,
                senderId: 0,
                receiverId: 0,
                postId: 0,
                commentId: 0,
                replyId: 0,
                repliedId: 0,
                notiType: '',
                notiTime: '',
                notiMessage: '',
                content: '',
                postTitle: '',
                postContent: '',
                repliedContent: '',
                cmtyName: '',
                cmtyId: 0
            }]

        }
    },
    actions: {
        formatPostCard(result: { status: number; data: any }) {
            if (result.status === 0) {
                for (let i = 0; i < result.data.length; i++) {
                    result.data[i] = Object.assign(result.data[i], result.data[i].user, result.data[i].community)
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
        async getCmtyPosts(params: { cmtyId: number }) {
            let result = await getCmtyPosts(params)
            this.formatPostCard(result)
            this.cmtyPostCardList = result.data

        },
        async getPostCard(params: { type: string, userId?: number }) {
            let result = await getPostCard(params)
            this.formatPostCard(result)
            switch (params.type) {
                case "home":
                    console.log(111);

                    console.log(result.data);
                    this.homePostCardList = result.data
                    break;
                case "user":
                    this.userPostCardList = result.data
                    break;
                case "discover":
                    this.discoverPostCardList = result.data
                    break;
                case "community":
                    this.cmtyPostCardList = result.data
                    break;
            }


        },
        async getSavedPostCard() {
            let result = await getSavedPostCard()
            this.formatPostCard(result)
            this.savedPostCardList = result.data
        },
        async getPostInfo(params: any) {
            //console.log('开始发送访问帖子信息的请求');
            let result = await getPostInfo(params)
            if (result.status == 0) {
                //console.log('已经请求到帖子信息');
                result = result.data
                //console.log(result);
                /*****************result赋值到postInfo******************/
                console.log("帖子信息:", result)
                this.postInfo = result
            }
        },
        async getCommentInfo(params: { postId: number }) {
            let result = await getCommentInfo(params)
            result = result.data
            //console.log("回复信息:", result);
            this.commentInfo = result

        },
        async getNotiCard(params: { type: string }) {
            console.log("参数", params);
            let result = await getNotiCard(params)
            switch (params.type) {
                case "reply":
                    console.log(result.data);
                    this.replyNotiCardList = result.data
                    break;
                case "like":
                    console.log(result.data);
                    this.likeNotiCardList = result.data
                    break;
            }

        },
    },
    getters: {

    }
})
export default usePostStore