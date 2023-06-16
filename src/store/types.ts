export interface IpostInfo {
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
        replyCount: number,
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

export interface IcommentInfo {
    commentAuthor: {
        avatar: string,
        userId: number,
        username: string,
    },
    cmtyId: number,
    cmtyName: string,
    commentAuthorId: number,
    commentId: number,
    commentTopFloor: number,
    content: string,
    floor: number,
    likeCount: number,
    postAuthorId: number,
    postId: number,
    pubTime: string,
    replyCount: number,
    reply: [{
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
    }]
}

export interface IreplyInfo {
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

export interface IpostCard {
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



export interface InotiCard {
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

export interface IcmtyCard {
    cmtyId: number,
    cmtyName: string,
    cmtyAvatar: string,
    cmtyCover: string,
    cmtyJoinedCount: number,
    cmtyDescription: string,
    cmtyHots: number,
    cmtyCategory: string,
    commentCount: number,
    replyCount: number,
    postCount: number,
    totalPostingCount: number,
    totalCommentingCount: number,
    userCmty: { isJoined: boolean, isFavorite: boolean }
}