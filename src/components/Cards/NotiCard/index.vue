<template>
    <div>
        <div class="notification" v-for="noti in notiCardList" @click="pushRouter(noti, parent)">
            <LeftAvatarPanel
                :id="parent == 'replyNoti' ? noti.notiSender.userId : noti.likeNotiSender.userId"
                :avatar="
                    parent == 'replyNoti' ? noti.notiSender.avatar : noti.likeNotiSender.avatar
                "
            />
            <div class="rightPanel">
                <div v-if="parent == 'replyNoti'" class="replyNoti">
                    <div class="userInfo">
                        <div class="user">
                            <div class="userName">
                                <span
                                    >{{ noti.notiSender.username }}
                                    <span style="color: $regularFont">{{
                                        noti.notiMessage
                                    }}</span></span
                                >
                            </div>
                            <div class="updateTime">
                                <span>{{ formatTime(noti.notiTime) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="reply">
                        <div class="content">
                            <span v-html="toRichText(noti.content)"></span>
                        </div>
                    </div>
                    <div
                        class="repliedContent"
                        @click.stop="
                            noti.notiType == 'comment'
                                ? router.push(`/p/${noti.postId}`)
                                : router.push(`/comment/${noti.commentId}`)
                        "
                    >
                        <span
                            v-html="
                                toRichText(
                                    noti.repliedContent || noti.postTitle || noti.postContent
                                )
                            "
                        >
                        </span>
                        <div
                            class="postContent"
                            @click.stop="router.push(`/p/${noti.postId}`)"
                            v-if="noti.repliedContent"
                        >
                            <span v-html="toRichText(noti.postTitle || noti.postContent)"></span>
                        </div>
                    </div>
                    <!-- <Tools style="padding: 0 20px" /> -->
                </div>
                <!-- <div class="likeNoti">
            </div> -->
                <div v-if="parent == 'likeNoti'" class="replyNoti">
                    <div class="userInfo">
                        <div class="user">
                            <div class="userName">
                                <span
                                    >{{ noti.likeNotiSender.username }}
                                    <!-- <span style="color: $regularFont">{{
                                    noti.notiMessage
                                }}</span> --></span
                                >
                            </div>
                            <div class="updateTime">
                                <span>{{ formatTime(noti.notiTime) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="reply">
                        <div class="content">
                            <span v-html="toRichText(noti.notiMessage)"></span>
                        </div>
                    </div>
                    <div class="repliedContent" @click.stop="$router.push(`/p/${noti.postId}`)">
                        <span
                            v-html="
                                toRichText(noti.likedContent || noti.postTitle || noti.postContent)
                            "
                        >
                        </span>
                        <div class="postContent" v-if="noti.likedContent">
                            <span v-html="toRichText(noti.postTitle || noti.postContent)"></span>
                        </div>
                    </div>
                    <!-- <Tools style="padding: 0 20px" /> -->
                </div>
            </div>
        </div>
        <BottomLoading :parent="parent" :list="notiCardList" />
    </div>
</template>
<script setup lang="ts">
import formatTime from '@/tools/formatTime'
import {toRichText} from '@/tools/postTools'
import {nextTick} from 'process'
import {computed, onMounted, watch} from 'vue'
import {useRouter} from 'vue-router'
import BottomLoading from '../../littleComponents/Loading/bottomLoading.vue'

const router = useRouter()
function pushRouter(
    data: {notiType: string; commentId: any; repliedContent: any; postId: any},
    parent: string
) {
    console.log(parent)
    console.log(data)
    let type = data.notiType
    switch (parent) {
        case 'replyNoti':
            switch (type) {
                case 'replyToComment':
                case 'replyToReply':
                    router.push(`/comment/${data.commentId}`)
                    break
                case 'comment':
                    router.push(`/p/${data.postId}`)
                    break
            }
            break
        case 'likeNoti':
            switch (type) {
                case 'likedPost':
                    router.push(`/p/${data.postId}`)
                    break
                case 'likedComment':
                case 'likedReply':
                    router.push(`/comment/${data.commentId}`)
                default:
                    break
            }
        default:
            break
    }
}
const props = defineProps(['notiCardList', 'parent'])
let notiCardList = computed(() => {
    return props.notiCardList
})
watch(
    notiCardList,
    (ov, nv) => {
        nextTick(() => {
            //console.log('更新')
            //console.log('notiCardList:', notiCardList)
        })
    },
    {immediate: true}
)

let parent = computed(() => {
    return props.parent
})

function getPubTime(noti: {
    notiType: string
    notiComment: {pubTime: string}
    notiReply: {pubTime: string}
}) {
    if (noti.notiType == 'comment') {
        return noti.notiComment.pubTime
    } else {
        return noti.notiReply.pubTime
    }
}
function getContent(noti: {
    notiType: string
    notiComment: {content: string}
    notiReply: {content: string}
}) {
    if (noti.notiType == 'comment') {
        return noti.notiComment.content
    } else {
        return noti.notiReply.content
    }
}
function getReplyTo(noti: {
    notiType: string
    notiReply: {repliedAuthorId: any}
    receiverId: any
    notiComment: {commentAuthorId: any}
}) {
    if (noti.notiType == 'reply') {
        if (noti.notiReply.repliedAuthorId == noti.receiverId) {
            return '回复了你的回复'
        } else if (noti.notiComment.commentAuthorId == noti.receiverId) {
            return '回复了你的评论'
        } else {
            return '回复了你的帖子'
        }
    } else if (noti.notiType == 'comment') {
        return '评论了你的帖子'
    }
}
onMounted(() => {
    //console.log(notiCardList.value)
})
</script>
<style lang="scss" scoped>
.notification {
    display: flex;
    padding-right: 20px;
    width: 100%;
    height: 100%;
    border-bottom: 1px #f1f1f1 solid;
    cursor: pointer;
    /* background-color: blueviolet; */
    &:hover {
        background-color: mix(#ff44aa, white, 10%);
    }
    .leftPanel {
        flex-shrink: 0;
        /* background-color: pink; */
        .iconWrapper {
            @extend .flexCentreGSC;
            width: 90px;
            height: 90px;
        }
    }
    .rightPanel {
        flex-grow: 1;
        width: 100%;
        .userInfo {
            display: flex;
            align-items: center;
            height: 70px;
            width: 100%;

            /* background-color: chartreuse; */

            .user {
                height: 50px;

                /* background-color: blueviolet; */
                .userName {
                    line-height: 25px;
                    height: 25px;

                    span {
                        font-weight: bold;
                        span {
                            font-weight: 500;
                            color: $regularFont;
                        }
                    }
                }

                .updateTime {
                    height: 25px;

                    span {
                        line-height: 25px;
                        color: $regularFont;
                    }
                }
            }
        }
        .content {
            margin-bottom: 10px;
        }
        .repliedContent {
            margin-bottom: 20px;
            padding: 15px 15px;
            background-color: $borderColor4;
            border-radius: 10px;
            span {
                /**********多行省略***************/
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                color: $mainFont;
            }
            .postContent {
                margin-top: 10px;
                background-color: white;
                padding: 15px;
                border-radius: 10px;
                /**********多行省略***************/
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>
