<template>
    <div class="container">
        <div class="poster">
            <!-- 用户信息、帖子更新时间 -->
            <div class="userInfo">
                <PostMenu
                    class="postMenu"
                    :content="post.content"
                    father="post"
                    :postId="post.postId"
                />
                <div class="iconWrapper">
                    <div class="icon">
                        <img
                            @click="$router.push(`/u/${post.postAuthorId}`)"
                            :src="postAuthor.avatar || defaultAvatar"
                        />
                    </div>
                </div>
                <div class="user">
                    <div class="userName">
                        <span>{{ postAuthor.username }}</span>
                    </div>

                    <div class="timeAndFloor">
                        <div class="floor">
                            <span>1楼</span>
                        </div>
                        <div class="dot">
                            <span>·</span>
                        </div>
                        <div class="updateTime">
                            <span>{{ formatTime(post.pubTime) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 标题和正文 -->
            <div class="content">
                <div class="title">
                    <h4>{{ post.postTitle }}</h4>
                </div>
                <div class="bodyText" v-show="true /* post.bodyText */">
                    <div v-html="toRichText(post.content)"></div>
                </div>
                <!-- 图片 -->
                <!-- <div class="imgDisplay">
                    <div class="img" v-for="img in post.imgSrc" :key="post.imgSrc.id">
                        <img :src="img.img" />
                    </div>
                </div> -->
            </div>
            <div class="toolWrapper">
                <Tools :postInfo="post" father="postMain" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {computed, reactive, ref} from 'vue'
import PostMenu from '@/components/PostMenu/index.vue'
import usePostStore from '@/store/post'
import Tools from '@/components/Tools/index.vue'
import formatTime from '@/tools/formatTime'
import {toRichText} from '@/tools/postTools'

const postStore = usePostStore()
let {postInfo} = storeToRefs(postStore)
let post = computed(() => {
    return postInfo.value
})
let postAuthor = computed(() => {
    return postInfo.value.postAuthor
})
/****** 默认头像 ******/
let defaultAvatar = 'https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg'
</script>
<style scoped lang="scss">
.container {
    .poster {
        //padding-top: 10px;
        border-bottom: 1px solid #f1f1f1;
        transition: 0.1s;
        cursor: pointer;

        &:hover:not(:has(.menu)) {
            background-color: mix($brandColor, white, 10%);
        }

        .userInfo {
            position: relative;
            display: flex;
            align-items: center;
            height: 90px;
            width: 100%;

            .postMenu {
                position: absolute;
                top: 10px;
                right: 10px;
            }

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
                    color: $mainFont;
                    line-height: 25px;
                    height: 25px;

                    span {
                        font-weight: bold;
                    }
                }

                .timeAndFloor {
                    display: flex;
                    line-height: 25px;

                    .floor {
                        margin-right: 7px;

                        span {
                            color: $regularFont;
                        }
                    }

                    .dot {
                        span {
                            color: $regularFont;
                        }
                    }

                    .updateTime {
                        margin-left: 7px;

                        span {
                            line-height: 25px;
                            color: $regularFont;
                        }
                    }
                }
            }
        }

        .content {
            margin-top: -10px;
            padding: 0 20px;
            height: 100%;
            width: 100%;
            word-break: break-all;

            /* background-color: firebrick; */
            .title {
                margin-bottom: 5px;
                color: $mainFont;
                font-weight: bold;
            }

            .bodyText {
                color: $mainFont;
                .postStyle {
                    white-space: pre-wrap;
                }
            }

            .imgDisplay {
                font-size: 0;
                display: inline-block;
                margin-top: 10px;
                /* border-radius: 20px; */
                overflow: hidden;

                /* .img {

             img{
                border-radius: 20px;
                max-width: 550px;
                max-height: 550px;
            }
        } */

                img {
                    border-radius: 15px;
                    max-width: 550px;
                    max-height: 550px;
                    border: 1px solid $borderColor1;
                }
            }
        }

        .toolWrapper {
            width: 608px;
            margin-left: 90px;
        }
    }
}
</style>
