<template>
    <div class="container">
        <div class="border" v-if="replies.length">
            <div class="reply" v-for="reply in replies" :key="reply.replyId">
                <div class="replybody">
                    <div class="iconWrapper">
                        <img
                            @click="$router.push(`/u/${reply.replyAuthorId}`)"
                            :src="reply.avatar || defaultAvatar"
                            alt=""
                        />
                    </div>
                    <div class="replyText">
                        <div class="replyerName">
                            <span>{{ reply.authorName }}</span>
                        </div>
                        <span v-if="reply" style="font-weight: bold; color: #606266">回复</span>
                        <div class="replyto">
                            <span> 提亚马特 </span>
                        </div>
                        <span style="font-weight: bold; color: #606266; padding-right: 7px">:</span>
                        <span class="text">{{ reply.content }}</span>
                    </div>
                </div>
                <div class="bottom">
                    <div class="time">
                        <span>{{ reply.pubTime }}</span>
                    </div>
                    <div class="tools">
                        <Tools />
                    </div>
                </div>
            </div>
            <div class="moreReply" v-if="replies.length > 4">
                <span>点击查看全部{{ commentInfo.repliesCount }}条回复</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Tools from '@/components/Tools/index.vue'
import {computed, toRefs} from 'vue'

let props = defineProps(['commentInfo'])
let {commentInfo} = toRefs(props)

let defaultAvatar = 'https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg'
let replies = computed(() => {
    return commentInfo?.value.replies
})
</script>
<style scoped lang="scss">
$borderWidth: 588px;
$borderPadding: 20px;
$iconWrapperWidth: 35px;

.border {
    margin-top: 15px;
    padding: 20px;
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
        font-size: 14px;
        color: $regularFont;
    }
}
</style>
