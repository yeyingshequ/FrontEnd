<template>
    <div class="commentContainer">
        <div class="commentWrapper" v-for="comment in comments" :key="comment.commentId">
            <div class="iconPart">
                <div class="iconWrapper">
                    <img
                        @click="$router.push(`/u/${comment.commentAuthorId}`)"
                        :src="comment.commentAuthor.avatar || defaultAvatar"
                        alt=""
                    />
                </div>
            </div>
            <div class="commentPart">
                <PostMenu
                    class="postMenu"
                    :content="comment.content"
                    father="comment"
                    :postId="comment.postId"
                />
                <div class="commentInfo">
                    <div class="name">
                        <span>{{ comment.commentAuthor.username }}</span>
                    </div>
                    <div class="timeAndFloor">
                        <div class="floor">
                            <span>{{ comment.floor }}楼</span>
                        </div>
                        <div class="dot">
                            <span>·</span>
                        </div>
                        <span class="pubTime">{{ formatTime(comment.pubTime) }}</span>
                    </div>
                </div>
                <div class="comment">
                    <span v-html="comment.content"></span>
                    <div class="reply">
                        <Reply :commentInfo="comment" />
                    </div>
                </div>
                <Tools :commentInfo="comment" father="comment" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {computed, onMounted, provide} from 'vue'
import Reply from '../Reply/index.vue'
import PostMenu from '@/components/PostMenu/index.vue'
import usePostStore from '@/store/post'
import Tools from '@/components/Tools/index.vue'
import formatTime from '@/tools/formatTime'
import {sendComment} from '@/api'
const postStore = usePostStore()
let {postInfo} = storeToRefs(postStore)
let defaultAvatar = 'https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg'

let comments = computed(() => {
    return postInfo.value.comment
})
//console.log('comments:', comments)
</script>
<style scoped lang="scss">
@import '@/assets/css/variable.scss';

$iconPartWidth: 90px;
$containerWidth: 698px;

.commentContainer {
    width: $viewPageWidth;
    //border-bottom: 1px solid #f1f1f1;

    .commentWrapper {
        display: flex;
        cursor: pointer;
        &:hover {
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

        .commentPart {
            position: relative;
            width: ($containerWidth - $iconPartWidth);
            border-bottom: 1px solid #f1f1f1;

            .postMenu {
                position: absolute;
                top: 10px;
                right: 10px;
            }

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
                margin-top: -10px;
                padding-right: 20px;
                word-break: break-all;
            }
        }
    }
}
</style>
