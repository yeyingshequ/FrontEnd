<template>
    <div class="container">
        <div class="border" v-if="replies.length">
            <div class="reply" v-for="reply in replies" :key="reply.replyId">
                <div class="replybody">
                    <div class="iconWrapper">
                        <img
                            @click="$router.push(`/u/${reply.replyAuthor.userId}`)"
                            :src="reply.replyAuthor.avatar || defaultAvatar"
                            alt=""
                        />
                    </div>
                    <div class="replyText">
                        <div class="replyerName">
                            <span>{{ reply.replyAuthor.username }}</span>
                        </div>
                        <span v-if="reply.repliedAuthorId" style="font-weight: bold; color: #606266"
                            >回复</span
                        >
                        <div v-if="reply.repliedAuthorId" class="replyto">
                            <span @click="router.push(`/u/${reply.repliedAuthor.userId}`)">
                                {{ reply.repliedAuthor.username }}
                            </span>
                        </div>
                        <span style="font-weight: bold; color: #606266; padding-right: 7px">:</span>
                        <span v-html="reply.content" class="text"></span>
                    </div>
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
            <div class="moreReply" v-if="commentInfo.replyCount > 5">
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
const router = useRouter()

let props = defineProps(['commentInfo'])
let commentInfo = computed(() => {
    return props.commentInfo
})

let defaultAvatar = 'https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg'
let replies = computed(() => {
    return commentInfo.value.reply
})
onMounted(() => {
    //console.log('replies:', replies)
})
</script>
<style scoped lang="scss">
$borderWidth: 588px;
$borderPadding: 20px;
$iconWrapperWidth: 35px;

.border {
    margin-top: 15px;
    padding: 20px 20px 0px 20px;
    width: 588px;
    background-color: $borderColor4;
    border-radius: 15px;

    .reply {
        .replybody {
            display: flex;

            .iconWrapper {
                margin-right: 10px;
                width: 35px;
                height: 35px;
                /* background-color: blue; */

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .replyText {
                width: ($borderWidth - $borderPadding * 2 - 10px - $iconWrapperWidth);

                .replyerName {
                    display: inline-block;
                    margin-right: 5px;
                    color: $mainFont;
                    font-weight: bold;
                }

                .replyto {
                    display: inline-block;
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
        }

        .bottom {
            display: flex;
            width: 523px;
            margin-left: 45px;

            .time {
                width: 150px;

                span {
                    color: $regularFont;
                    font-size: 13px;
                    line-height: 40px;
                }
            }

            .tools {
                width: 400px;
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
</style>
