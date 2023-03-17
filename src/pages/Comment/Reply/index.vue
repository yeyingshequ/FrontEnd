<template>
    <div class="replyContainer">
        <div class="replyWrapper" v-for="reply in replies" :key="reply.replyId">
            <div class="iconPart">
                <div class="iconWrapper">
                    <img
                        @click="$router.push(`/u/${reply.replyAuthorId}`)"
                        :src="reply.replyAuthor.avatar || defaultAvatar"
                        alt=""
                    />
                </div>
            </div>
            <div class="replyPart">
                <PostMenu
                    class="postMenu"
                    :content="reply.content"
                    father="reply"
                    :postId="reply.postId"
                />
                <div class="replyInfo">
                    <div class="name">
                        <span>{{ reply.replyAuthor.username }}</span>
                    </div>
                    <div class="timeAndFloor">
                        <div class="floor">
                            <span>#{{ reply.replyFloor }}</span>
                        </div>
                        <div class="dot">
                            <span>·</span>
                        </div>
                        <span class="pubTime">{{ formatTime(reply.pubTime) }}</span>
                    </div>
                </div>
                <div class="reply">
                    <span v-if="reply.repliedAuthorId" style="font-weight: bold; color: #606266"
                        >回复</span
                    >
                    <div v-if="reply.repliedAuthorId" class="replyto">
                        <span @click="router.push(`/u/${reply.repliedAuthor.userId}`)">
                            {{ reply.repliedAuthor.username }}
                        </span>
                    </div>
                    <span
                        v-if="reply.repliedAuthorId"
                        style="
                            font-weight: bold;
                            color: #606266;
                            padding-right: 7px;
                            word-break: break-all;
                        "
                        >:</span
                    >
                    <span>{{ reply.content }}</span>
                </div>
                <Tools :replyInfo="reply" father="reply" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {computed, onMounted} from 'vue'
import usePostStore from '@/store/post'
import {storeToRefs} from 'pinia'
import Tools from '@/components/Tools/index.vue'
import formatTime from '@/tools/formatTime'
import {useRouter} from 'vue-router'
const router = useRouter()
const postStore = usePostStore()
let {commentInfo} = storeToRefs(postStore)
let replies = computed(() => {
    return commentInfo.value.reply
})
let defaultAvatar = 'https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg'
onMounted(() => {
    console.log('回复信息:', replies)
})
</script>
<style lang="scss" scoped>
$iconPartWidth: 90px;
$containerWidth: 698px;
.replyContainer {
    width: $viewPageWidth;
    //border-bottom: 1px solid #f1f1f1;

    .replyWrapper {
        display: flex;
        cursor: pointer;

        &:hover:not(:has(.menu)) {
            background-color: mix(#ff44aa, white, 10%);
        }

        .iconPart {
            width: $iconPartWidth;
            /* background-color: yellowgreen; */

            .iconWrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 90px;
                /* background-color: blue; */

                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
            }
        }

        .replyPart {
            position: relative;
            width: ($containerWidth - $iconPartWidth);
            border-bottom: 1px solid #f1f1f1;

            .postMenu {
                position: absolute;
                top: 0;
                right: 10px;
            }

            .replyInfo {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 90px;
                width: 100%;

                .name,
                .timeAndFloor {
                    height: 25px;

                    /* background-color: red; */
                    span {
                        line-height: 25px;
                    }

                    .floor {
                        margin-right: 7px;
                    }

                    .pubTime {
                        margin-left: 7px;
                    }
                }

                .name {
                    span {
                        font-weight: bold;
                        color: $mainFont;
                    }
                }

                .timeAndFloor {
                    display: flex;

                    span {
                        color: $regularFont;
                    }
                }
            }

            .reply {
                padding-right: 20px;
                margin-top: -10px;
                .replyto {
                    display: inline-block;
                    margin-left: 5px;
                    margin-right: 5px;
                    color: $regularFont;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
