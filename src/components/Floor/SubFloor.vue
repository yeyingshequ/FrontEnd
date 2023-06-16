<template>
    <div>
        <div
            class="commentWrapper"
            v-for="comment in comments"
            :key="parent == 'post' ? comment.commentId : comment.replyId"
        >
            <LeftAvatarPanel :id="getAuthor(comment).userId" :avatar="getAuthor(comment).avatar" />
            <div class="rightPanel">
                <PostMenu class="postMenu" :info="comment" :parent="parent" />
                <div class="commentInfoContainer">
                    <div class="commentInfo">
                        <div class="name">
                            <span>{{ getAuthor(comment).username }}</span>
                        </div>
                        <div class="timeAndFloor">
                            <div class="floor">
                                <span>{{ getFloor(comment) }}</span>
                            </div>
                            <div class="dot">
                                <span>·</span>
                            </div>
                            <span class="pubTime">{{ formatTime(comment.pubTime) }}</span>
                        </div>
                    </div>
                    <div class="comment">
                        <span
                            v-if="comment.repliedAuthorId"
                            style="font-weight: bold; color: #606266"
                            >回复</span
                        >
                        <div v-if="comment.repliedAuthorId" class="replyto">
                            <span @click="router.push(`/u/${comment.repliedAuthor.userId}`)">
                                {{ comment.repliedAuthor.username }}
                            </span>
                        </div>
                        <span
                            v-if="comment.repliedAuthorId"
                            style="
                                font-weight: bold;
                                color: #606266;
                                padding-right: 7px;
                                word-break: break-all;
                            "
                            >:</span
                        >
                        <span v-html="comment.content"></span>
                        <!-- 图片 -->
                        <div class="imageList">
                            <div v-for="img in comment.images" class="img">
                                <img :src="img" alt="" @click="mainStore.reqDisplayImg(img)" />
                            </div>
                        </div>
                        <div class="reply">
                            <Reply v-if="parent == 'post'" :commentInfo="comment" />
                        </div>
                    </div>

                    <Tools
                        :commentInfo="comment"
                        :replyInfo="comment"
                        :father="parent == 'post' ? 'comment' : 'reply'"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'

import {computed, onMounted, provide, toRefs} from 'vue'
import Reply from '@/components/Floor/Reply.vue'
import PostMenu from '@/components/PostMenu/index.vue'
import usePostStore from '@/store/post'
import Tools from '@/components/Tools/index.vue'
import formatTime from '@/tools/formatTime'
import {toRichText} from '@/tools/postTools'
import {sendComment} from '@/api'
import useMainStore from '@/store/index'
import {useRouter} from 'vue-router'
import LeftAvatarPanel from '@/components/littleComponents/Avatar/LeftAvatarPanel.vue'

const router = useRouter()
const mainStore = useMainStore()
const postStore = usePostStore()
let {postInfo} = storeToRefs(postStore)
const props = defineProps(['SubFloorInfo', 'parent'])
let {SubFloorInfo, parent} = toRefs(props)
let comments = computed(() => {
    return parent?.value == 'post' ? SubFloorInfo?.value.comment : SubFloorInfo?.value.reply
})
function getFloor(comment: {floor: string; replyFloor: string}) {
    return parent?.value == 'post' ? comment.floor + '楼' : '#' + comment.replyFloor
}
function getAuthor(info: {commentAuthor: any; replyAuthor: any}) {
    return parent?.value == 'post' ? info.commentAuthor : info.replyAuthor
}
</script>
<style lang="scss" scoped>
@import '@/components/Floor/style.scss';
.commentWrapper {
    display: flex;
    cursor: pointer;
    width: 100%;
    &:hover:not(:has(.menu)) {
        background-color: mix(#ff44aa, white, 10%);
    }

    .leftPanel {
        flex-shrink: 0;
        width: 90px;
        /* background-color: yellowgreen; */

        .iconWrapper {
            @extend .flexCentreGSC;
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

    .rightPanel {
        position: relative;
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        display: flex;
        padding-right: 20px;

        .postMenu {
            position: absolute;
            top: 10px;
            right: 10px;
        }
        .commentInfoContainer {
            width: 100%;
            .commentInfo {
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

            .comment {
                margin-top: -15px;
                word-break: break-all;
                .imageList {
                    @extend .imageListSC;
                }
                .replyto {
                    display: inline-block;
                    margin-left: 5px;
                    margin-right: 5px;
                    color: $regularFont;
                    font-weight: bold;
                }
                :deep(p:not(:last-child)) {
                    margin-bottom: 15px;
                }
            }
        }
    }
}
</style>
