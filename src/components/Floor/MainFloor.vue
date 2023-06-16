<template>
    <div class="poster">
        <!-- 用户信息、帖子更新时间 -->
        <div class="userInfo">
            <PostMenu class="postMenu" :info="MainFloorInfo" :parent="parent" />
            <div class="iconWrapper">
                <Avatar type="user" :id="author.userId" :avatar="author.avatar" />
            </div>
            <div class="user">
                <div class="userName">
                    <span>{{ author.username }}</span>
                </div>

                <div class="timeAndFloor">
                    <div class="floor">
                        <span>{{ floor }}</span>
                    </div>
                    <div class="dot">
                        <span>·</span>
                    </div>
                    <div class="updateTime">
                        <span>{{ formatTime(MainFloorInfo.pubTime) }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 标题和正文 -->
        <div class="content">
            <div v-if="parent == 'post'" class="title">
                <h4>{{ MainFloorInfo.postTitle }}</h4>
            </div>

            <div class="bodyText">
                <div v-html="MainFloorInfo.content"></div>
            </div>
            <!-- 图片 -->
            <div class="imageList">
                <div v-for="img in MainFloorInfo.images" class="img">
                    <img :src="img" alt="" @click="mainStore.reqDisplayImg(img)" />
                </div>
            </div>
        </div>
        <div class="toolWrapper">
            <Tools
                :commentInfo="MainFloorInfo"
                :postInfo="MainFloorInfo"
                :father="parent + 'Main'"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
/* 这个组件的parent目前只有"post"和"comment" */
import {storeToRefs} from 'pinia'
import {computed, onMounted, onUnmounted, reactive, ref, toRefs} from 'vue'
import PostMenu from '@/components/PostMenu/index.vue'
import usePostStore from '@/store/post'
import Tools from '@/components/Tools/index.vue'
import formatTime from '@/tools/formatTime'
import {toRichText} from '@/tools/postTools'
import useMainStore from '@/store/index'
import Avatar from '@/components/littleComponents/Avatar/Avatar.vue'

const mainStore = useMainStore()
const postStore = usePostStore()
const props = defineProps(['MainFloorInfo', 'parent'])
let {MainFloorInfo, parent} = toRefs(props)

let author = computed(() => {
    return parent?.value == 'post'
        ? MainFloorInfo?.value.postAuthor
        : MainFloorInfo?.value.commentAuthor
})

let floor = computed(() => {
    return parent?.value == 'post' ? '1楼' : MainFloorInfo?.value.floor + '楼'
})
onMounted(() => {
    //console.log('parent:', parent?.value)
    //console.log('MainFloorInfo:', MainFloorInfo?.value)
})
</script>
<style lang="scss" scoped>
@import '@/components/Floor/style.scss';
.poster {
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
            @extend .flexCentreGSC;
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

            :deep(p:not(:last-child)) {
                margin-bottom: 15px;
            }
        }
        .imageList {
            @extend .imageListSC;
        }
    }

    .toolWrapper {
        padding-right: 20px;
        margin-left: 90px;
    }
}
</style>
