<template>
    <div>
        <div
            v-if="postCardList"
            class="post"
            v-for="post in postCardList"
            :key="post.postId"
            @click="$router.push(`/p/${post.postId}`)"
        >
            <LeftAvatarPanel :id="post.postAuthor.userId" :avatar="post.postAuthor.avatar" />
            <!-- 用户信息、帖子更新时间 -->
            <div class="rightPanel">
                <div class="userInfo">
                    <PostMenu class="postMenu" :info="post" parent="post" @click.stop />
                    <div class="user">
                        <div class="userName">
                            <span>{{ post.postAuthor.username }}</span>
                            <span class="dot"> · </span>
                            <span class="updateTime">{{ formatTime(post.updateTime) }}</span>
                        </div>
                    </div>
                </div>
                <!-- 标题和正文 -->
                <div class="TitleAndContent">
                    <div class="title">
                        <h4>{{ post.postTitle }}</h4>
                    </div>
                    <div class="content">
                        <span v-html="toRichText(post.content)"></span>
                    </div>
                </div>
                <Images :imageList="post.images" />
                <button
                    class="bar"
                    @click.stop="router.push(`/c/${post.cmtyId}`)"
                    v-if="route.matched[0].name != 'C'"
                >
                    <span> {{ post.community.cmtyName }}吧 </span>
                </button>
                <Tools :postInfo="post" father="postCard" style="padding-right: 20px" />
            </div>
        </div>
        <BottomLoading :parent="parent" :list="postCardList" />
    </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref, toRefs} from 'vue'
import useRouterStore from '@/store/community'
import {storeToRefs} from 'pinia'
import PostMenu from '@/components/PostMenu/index.vue'
import {useRoute, useRouter} from 'vue-router'
import Images from '@/components/Images/Images.vue'
import {formatDate} from '@vueuse/shared'

import formatTime from '@/tools/formatTime'
import usePostStore from '@/store/post'
import Tools from '@/components/Tools/index.vue'
import {toRichText} from '@/tools/postTools'
import BottomLoading from '@/components/littleComponents/Loading/bottomLoading.vue'
import LeftAvatarPanel from '@/components/littleComponents/Avatar/LeftAvatarPanel.vue'

const postStore = usePostStore()
const route = useRoute()
const router = useRouter()
const routerStore = useRouterStore()
const props = defineProps(['postCardList', 'parent'])

let {postCardList, parent} = toRefs(props)
let showMenu = ref(false)
onMounted(() => {
    //console.log('postCard组件')
    //console.log('postCardList', postCardList.value)
    //console.log('route:', route)
})
</script>

<style scoped lang="scss">
.post {
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
            /* .icon {
                width: 50px;
                height: 50px;

                img {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                }
            } */
        }
    }
    .rightPanel {
        flex-grow: 1;
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
                    .dot {
                        line-height: 25px;
                        color: $regularFont;
                    }
                    .updateTime {
                        line-height: 25px;
                        color: $regularFont;
                        font-weight: normal;
                    }
                }
            }
        }

        .TitleAndContent {
            padding-right: 20px;
            //width: 608px;
            margin-top: -40px;
            /* background-color: firebrick; */
            .title {
                font-weight: bold;
                margin-bottom: 5px;
            }

            .content {
                color: $mainFont;
                word-break: break-all;
                //width: 658px;
                span {
                    /**********多行省略***************/
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
            }

            .imgDisplay {
                font-size: 0;
                display: inline-block;
                margin-top: 10px;
                border-radius: 20px;
                overflow: hidden;

                .img {
                    img {
                        max-width: 550px;
                        max-height: 550px;
                    }
                }
            }

            .twoImgDisplay,
            .threeImgDisplay {
                font-size: 0;
                display: inline-block;
                margin-top: 10px;
                border-radius: 20px;
                overflow: hidden;
                box-sizing: content-box;
                border: 1px solid #f1f1f1;

                .img {
                    display: inline-block;
                    margin-left: 3px;

                    &:first-child {
                        margin-left: 0;
                    }

                    img {
                        width: 216px;
                        height: 216px;
                        object-fit: cover;
                    }
                }
            }
        }
        .bar {
            @extend .flexCentreGSC;
            height: 26px;
            max-width: 200px;
            margin-top: 10px;
            background-color: white;
            border: $brandColor solid 1px;
            border-radius: 50px;
            outline: none;
            cursor: pointer;
            &:hover {
                background-color: $onHover20;
            }

            span {
                padding: 0 10px;
                font-size: 15px;
                font-weight: bold;
                color: $brandColor;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                //line-height: 26px;
            }
        }
    }
}
</style>
