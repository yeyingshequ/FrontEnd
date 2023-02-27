<template>
    <div>
        <div
            class="post"
            v-for="post in postCardList"
            :key="post.postId"
            @click="$router.push(`/p/${post.postId}`)"
        >
            <div class="leftPart">
                <div class="iconWrapper">
                    <div class="icon">
                        <img
                            :src="post.avatar"
                            @click.stop="router.push(`/u/${post.postAuthorId}`)"
                        />
                    </div>
                </div>
            </div>
            <!-- 用户信息、帖子更新时间 -->
            <div class="rightPart">
                <div class="userInfo">
                    <PostMenu
                        class="postMenu"
                        :content="post.content"
                        father="post"
                        :postId="post.postId"
                        @click.stop
                    />
                    <div class="user">
                        <div class="userName">
                            <span>{{ post.username }}</span>
                        </div>
                        <div class="updateTime">
                            <span>{{ post.updateTime }}</span>
                        </div>
                    </div>
                </div>
                <!-- 标题和正文 -->
                <div class="TitleAndContent">
                    <div class="title">
                        <h4>{{ post.postTitle }}</h4>
                    </div>
                    <div class="content">
                        <span v-html="post.content"></span>
                    </div>
                </div>
                <button
                    class="bar"
                    @click.stop="router.push(`/c/${post.cmtyId}`)"
                    v-if="route.matched[0].name != 'C'"
                >
                    <span> {{ post.cmtyName }}吧 </span>
                </button>
                <Tools :postInfo="post" father="postCard" style="padding-right: 20px" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref, toRefs} from 'vue'
import useRouterStore from '@/store/community'
import {storeToRefs} from 'pinia'
import PostMenu from '@/components/PostMenu/index.vue'
import {useRoute, useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
const routerStore = useRouterStore()
const props = defineProps(['postCardList'])

let postCardList = computed(() => {
    return props.postCardList
})
let showMenu = ref(false)
onMounted(() => {
    console.log('postCard组件')

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

    &:hover {
        background-color: mix(#ff44aa, white, 10%);
    }
    .leftPart {
        .iconWrapper {
            display: flex;
            justify-content: center;
            align-items: center;
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
    .rightPart {
        .userInfo {
            position: relative;
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

        .TitleAndContent {
            padding-right: 20px;
            width: 608px;
            margin-top: -10px;
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
            display: flex;
            justify-content: center;
            align-items: center;
            height: 26px;
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
                //line-height: 26px;
            }
        }
    }
}
</style>
