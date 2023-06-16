<template>
    <div>
        <div v-for="card in commentCardList" class="commentCard">
            <LeftAvatarPanel
                :id="card.commentAuthor?.userId || card.replyAuthor?.userId"
                :avatar="card.commentAuthor?.avatar || card.replyAuthor?.avatar"
            />
            <!-- 用户信息、帖子更新时间 -->
            <div class="rightPanel">
                <div class="userInfo">
                    <!-- <PostMenu
                        class="postMenu"
                        :content="card.content"
                        father="post"
                        :postId="card.postId"
                        @click.stop
                    /> -->
                    <div class="user">
                        <div class="userName">
                            <span>{{
                                card.commentCardType == 'comment'
                                    ? card.commentAuthor?.username
                                    : card.replyAuthor?.username
                            }}</span>
                        </div>
                        <div class="updateTime">
                            <span>{{ formatTime(card.pubTime) }}</span>
                        </div>
                    </div>
                </div>
                <!-- 标题和正文 -->
                <div class="reply">
                    <div class="content">
                        <span v-html="toRichText(card.content)"></span>
                    </div>
                </div>
                <div class="repliedContent" @click.stop="$router.push(`/p/${card.postId}`)">
                    <span
                        v-html="
                            toRichText(card.repliedContent || card.postTitle || card.postContent)
                        "
                    >
                    </span>
                    <div class="postContent" v-if="card.repliedContent">
                        <span v-html="toRichText(card.postTitle || card.postContent)"></span>
                    </div>
                </div>
            </div>
        </div>
        <BottomLoading :parent="parent" :list="commentCardList" />
    </div>
</template>
<script setup lang="ts">
import formatTime from '@/tools/formatTime'
import {toRefs} from 'vue'
import {useRouter} from 'vue-router'
import BottomLoading from '@/components/littleComponents/Loading/bottomLoading.vue'
import Tools from '@/components/Tools/index.vue'
import {toRichText} from '@/tools/postTools'
import LeftAvatarPanel from '@/components/littleComponents/Avatar/LeftAvatarPanel.vue'

const router = useRouter()
const props = defineProps(['commentCardList', 'parent'])
let {commentCardList, parent} = toRefs(props)
</script>

<style lang="scss" scoped>
.commentCard {
    display: flex;
    position: relative;
    border-bottom: 1px solid #f1f1f1;
    transition: 0.1s;
    cursor: pointer;
    &:hover:not(:has(.menu)) {
        background-color: mix(#ff44aa, white, 10%);
    }
    .leftPanel {
        flex-shrink: 0;
        .iconWrapper {
            @extend .flexCentreGSC;
            width: 90px;
            height: 90px;

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
    }
    .rightPanel {
        padding-right: 20px;
        padding-bottom: 20px;
        width: 100%;
        .userInfo {
            position: relative;
            justify-content: left;
            display: flex;
            align-items: center;
            height: 90px;
            width: 100%;
            //padding-top: 15px;
            .postMenu {
                position: absolute;
                top: 10px;
                right: 10px;
            }

            /* background-color: chartreuse; */

            .user {
                height: 50px;

                /* background-color: blueviolet; */
                .userName {
                    line-height: 25px;
                    height: 25px;

                    span {
                        font-weight: bold;
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
            margin-top: -10px;
        }
        .repliedContent {
            //margin-bottom: 10px;
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
