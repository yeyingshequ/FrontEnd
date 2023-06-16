<template>
    <div class="container">
        <div class="border" v-if="replies.length">
            <div class="reply" v-for="reply in replies" :key="reply.replyId">
                <div class="replybody">
                    <div class="iconWrapper">
                        <img
                            @click="router.push(`/u/${reply.replyAuthor.userId}`)"
                            :src="reply.replyAuthor.avatar || mainStore.defaultAvatar"
                            alt=""
                        />
                    </div>
                    <div class="replyText">
                        <div class="topPanel">
                            <span class="replyerName">
                                <span>{{ reply.replyAuthor.username }}</span>
                            </span>
                            <span
                                v-if="reply.repliedAuthorId"
                                style="font-weight: bold; color: #606266"
                                >回复</span
                            >
                            <span v-if="reply.repliedAuthorId" class="replyto">
                                <span @click="router.push(`/u/${reply.repliedAuthor.userId}`)">
                                    {{ reply.repliedAuthor.username }}
                                </span>
                            </span>
                            <span style="font-weight: bold; color: #606266; padding-right: 7px"
                                >:</span
                            >
                            <span v-html="toRichText(reply.content, 'span')" class="text"></span>
                        </div>
                        <div class="bottom">
                            <div class="time">
                                <span>{{ formatTime(reply.pubTime) }}</span>
                            </div>
                            <div class="tools">
                                <Tools :replyInfo="reply" father="reply" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="moreReply">
                <span @click="router.push(`/comment/${commentInfo.commentId}`)"
                    >点击查看全部{{ commentInfo.replyCount }}条回复</span
                >
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Tools from '@/components/Tools/index.vue'
import {computed, onMounted, toRefs} from 'vue'
import {useRouter} from 'vue-router'
import formatTime from '@/tools/formatTime'
import {toRichText} from '@/tools/postTools'
import useMainStore from '@/store/index'
const mainStore = useMainStore()
const router = useRouter()

let props = defineProps(['commentInfo'])
let commentInfo = computed(() => {
    return props.commentInfo
})
let replies = computed(() => {
    return commentInfo.value.reply
})
onMounted(() => {
    //console.log('replies:', replies)
})
</script>
<style scoped lang="scss">
.container {
    display: flex;
    .border {
        margin-top: 15px;
        padding: 20px 20px 0px 20px;
        width: 100%;
        background-color: $borderColor4;
        border-radius: 15px;
        flex-grow: 1;
        .reply {
            .replybody {
                display: flex;

                .iconWrapper {
                    margin-right: 10px;
                    width: 35px;
                    height: 35px;
                    flex-shrink: 0;
                    /* background-color: blue; */

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }

                .replyText {
                    flex-grow: 1;
                    .topPanel {
                        min-height: 35px;
                        .replyerName {
                            margin-right: 5px;
                            color: $mainFont;
                            font-weight: bold;
                        }

                        .replyto {
                            margin-left: 5px;
                            margin-right: 5px;
                            color: $regularFont;
                            font-weight: bold;
                        }

                        .text {
                            color: $mainFont;
                            word-break: break-all;
                        }
                    }

                    .bottom {
                        display: flex;
                        width: auto;

                        @media (max-width: 717px) {
                            .time {
                                display: none;
                            }
                        }

                        .time {
                            width: 150px;

                            span {
                                color: $regularFont;
                                font-size: 13px;
                                line-height: 40px;
                            }
                        }

                        .tools {
                            width: 100%;
                        }
                    }
                }
            }
        }

        .moreReply {
            padding-bottom: 10px;
            font-size: 14px;
            color: $regularFont;
            span {
                &:hover {
                    color: $mainFont;
                }
            }
        }
    }
}
/* @media (max-width: 517px) {
    .container {
        .border {
            .reply {
                .replybody {
                    .iconWrapper {
                        display: none;
                    }
                }
            }
        }
    }
} */
</style>
