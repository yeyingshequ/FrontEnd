<template>
    <div class="container">
        <Top parent="post" :info="postInfo" />
        <!-- <div class="top">
            <div class="return">
                <yyReturn />
            </div>
            <div class="bar" @click="router.push(`/c/${post.cmtyId}`)">
                <div class="icon">
                    <img src="@/images/barIcon.jpg" alt="" />
                </div>
                <div class="barName">
                    <span>{{ cmty.cmtyName }}吧</span>
                </div>
            </div>
        </div> -->
        <Poster :postInfo="postInfo" />
        <Comment :postInfo="postInfo" />
    </div>
</template>

<script setup lang="ts">
import Poster from './Post/index.vue'
import Comment from './Comment/index.vue'
import {computed, onMounted, onUnmounted, reactive} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import useMainStore from '@/store/index'
import {storeToRefs} from 'pinia'
import emitter from '@/tools/mitt'
import usePostStore from '@/store/post'
import yyReturn from '@/components/littleComponents/yy-button/yy-return.vue'
import Top from '@/components/Top/Top.vue'
const postStore = usePostStore()
const mainStore = useMainStore()
const route = useRoute()
const router = useRouter()

let {postInfo} = storeToRefs(postStore)
let post = computed(() => {
    return postInfo.value
})
let cmty = computed(() => {
    return postInfo.value.community
})

let params: any = reactive({
    postId: route.params.pid
})
function reqGetPostInfo(params: any) {
    postStore.getPostInfo(params)
}
onMounted(() => {
    /* postStore.postInfo = {
        postId: 0,
        postTitle: '',
        content: '',
        updateTime: '',
        pubTime: '',
        isDeleted: false,
        cmtyId: 0,
        postAuthorId: 0,
        commentCount: 0,
        likeCount: 0,
        giftCount: 0,
        shareCount: 0,
        topFloor: 0,
        comment: [
            {
                commentAuthor: {
                    avatar: '',
                    userId: 0,
                    username: ''
                },
                commentAuthorId: 0,
                commentId: 0,
                commentTopFloor: 0,
                content: '',
                floor: 0,
                postAuthorId: 0,
                postId: 0,
                pubTime: '',
                replyCount: 0,
                reply: {
                    commentAuthorId: 0,
                    commentId: 0,
                    content: '',
                    postAuthorId: 0,
                    postId: 0,
                    pubTime: '',
                    repliedAuthor: {
                        userId: 0,
                        username: ''
                    },
                    repliedAuthorId: 0,
                    repliedId: 0,
                    replyAuthor: {
                        avatar: '',
                        userId: 0,
                        username: ''
                    },
                    replyAuthorId: 0,
                    replyFloor: 0,
                    replyId: 0
                }
            }
        ],
        postAuthor: {
            avatar: '',
            userId: 0,
            username: ''
        },
        community: {
            cmtyAvatar: '',
            cmtyName: '',
            cmtyId: 0
        }
    } */
    reqGetPostInfo(params)
})
onMounted(() => {
    emitter.on('regetPostInfo', () => {
        reqGetPostInfo(params)
    })
})
onUnmounted(() => {
    emitter.off('regetPostInfo')
})
</script>
<style scoped lang="scss">
.container {
    .top {
        position: sticky;
        top: 60px;
        display: flex;
        /* background-color: orangered; */
        align-items: center;
        justify-content: center;
        background-color: white;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #f1f1f1;
        z-index: 1;

        .return {
            position: absolute;
            height: 40px;
            left: 20px;
            border: 0;
        }

        .bar {
            padding-left: 5px;
            padding-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            border-radius: 50px;
            cursor: pointer;

            /* background-color: blueviolet; */
            &:hover {
                background-color: mix(#ff44aa, white, 10%);
            }

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 5px;
                width: 30px;
                height: 30px;
                /* background-color: red; */

                img {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                }
            }

            .barName {
                span {
                    //font-weight: bold;
                    line-height: 35px;
                }
            }
        }
    }
}
</style>
