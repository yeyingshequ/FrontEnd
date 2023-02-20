<template>
    <div>
        <div class="notification" v-for="noti in notiCardList">
            <div class="userInfo">
                <div class="iconWrapper">
                    <div class="icon">
                        <img
                            :src="noti.notiSender.avatar"
                            @click.stop="$router.push(`/u/${noti.notiSender.userId}`)"
                        />
                    </div>
                </div>
                <div class="user">
                    <div class="userName">
                        <span
                            >{{ noti.notiSender.username }}
                            <span style="color: $regularFont">{{ noti.notiMessage }}</span></span
                        >
                    </div>
                    <div class="updateTime">
                        <span>{{ formatTime(noti.notiTime) }}</span>
                    </div>
                </div>
            </div>
            <div class="reply">
                <div class="content">
                    <span v-html="noti.content"></span>
                </div>
            </div>
            <div class="repliedContent" @click.stop="$router.push(`/p/${noti.postId}`)">
                <span v-html="noti.repliedContent || noti.postTitle || noti.postContent"> </span>
                <div class="postContent" v-if="noti.repliedContent">
                    <span v-html="noti.postTitle || noti.postContent"></span>
                </div>
            </div>
            <Tools style="padding: 0 20px" />
        </div>
    </div>
</template>
<script setup lang="ts">
import formatTime from '@/tools/formatTime'
import {computed, onMounted} from 'vue'

const props = defineProps(['notiCardList', 'parent'])
let notiCardList = computed(() => {
    return props.notiCardList
})

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
    console.log(notiCardList.value)
})
</script>
<style lang="scss" scoped>
.notification {
    width: 100%;
    height: 100%;
    border-bottom: 1px #f1f1f1 solid;
    cursor: pointer;
    /* background-color: blueviolet; */
    &:hover {
        background-color: mix(#ff44aa, white, 10%);
    }
    .userInfo {
        display: flex;
        align-items: center;
        height: 70px;
        width: 100%;

        /* background-color: chartreuse; */

        .iconWrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90px;
            height: 70px;

            /* background-color: pink; */
            .icon {
                width: 50px;
                height: 50px;

                img {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                }
            }
        }

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
        padding: 0 20px 10px 20px;
    }
    .repliedContent {
        margin: 20px;
        margin-top: 0;
        padding: 15px 15px;
        background-color: $borderColor4;
        -webkit-line-clamp: 3;
        border-radius: 10px;
        span {
            color: $mainFont;
        }
        .postContent {
            margin-top: 10px;
            background-color: white;
            padding: 15px;
            border-radius: 10px;
        }
    }
}
</style>
