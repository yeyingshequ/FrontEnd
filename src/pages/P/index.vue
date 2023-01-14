<template>
    <div class="container">
        <div class="top">
            <div class="return">
                <i class="iconfont icon-fanhui" @click="back"></i>
            </div>
            <div class="bar" @click="router.push(`/c/${post.cmtyId}`)">
                <div class="icon">
                    <img src="@/images/barIcon.jpg" alt="" />
                </div>
                <div class="barName">
                    <span>{{ post.cmtyName }}吧</span>
                </div>
            </div>
        </div>
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
const postStore = usePostStore()
const mainStore = useMainStore()
const route = useRoute()
const router = useRouter()

let {postInfo} = storeToRefs(postStore)
let post = computed(() => {
    return postInfo.value.post
})

function back() {
    router.back()
}

let params: any = reactive({
    postId: route.params.pid
})
function reqGetPostInfo(params: any) {
    postStore.getPostInfo(params)
}
onMounted(() => {
    postStore.postInfo = {
        post: {
            avatar: '',
            cmtyAvatar: '',
            cmtyHots: '' || 0,
            cmtyId: 1,
            cmtyName: '',
            commentCount: 0,
            content: '',
            giftCount: 0,
            isDelete: 0,
            likeCount: 0,
            postAuthorId: 0,
            postId: 0,
            postTitle: '',
            pubTime: '',
            shareCount: 0,
            topFloor: '',
            updateTime: '',
            userId: '',
            username: ''
        },
        comments: [
            {
                avatar: '',
                commentAuthorId: 0,
                commentId: 0,
                commentTopFloor: 0,
                content: '',
                floor: 0,
                postAuthorId: 0,
                postId: 0,
                pubTime: '',
                replies: [],
                userId: 0,
                username: ''
            }
        ]
    }
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
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            left: 8px;
            border-radius: 50%;
            transition: 0.1s;
            i {
                margin-left: 5px;
                font-size: 20px;
                cursor: pointer;
            }
            &:hover {
                background-color: $onHover;
            }
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
                    line-height: 35px;
                }
            }
        }
    }
}
</style>
