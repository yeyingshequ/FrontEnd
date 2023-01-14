<template>
    <div class="container">
        <div class="top">
            <div class="return">
                <i class="iconfont icon-fanhui" @click="back"></i>
            </div>
            <div class="bar" @click="router.push(`/p/${comment.postId}`)">
                <div class="showAllComments">
                    <span>查看所有评论</span>
                </div>
            </div>
        </div>
        <Comment :commentInfo="commentInfo" />
        <Reply :replyInfo="commentInfo.replies" />
    </div>
</template>
<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import Comment from '@/pages/Comment/Comment/index.vue'
import Reply from '@/pages/Comment/Reply/index.vue'
import {storeToRefs} from 'pinia'
import {computed, onMounted, onUnmounted, reactive} from 'vue'
import usePostStore from '@/store/post'
import emitter from '@/tools/mitt'
const postStore = usePostStore()
const router = useRouter()
const route = useRoute()

let {commentInfo} = storeToRefs(postStore)
let comment = computed(() => {
    return commentInfo.value
})

/***************************************/

function back() {
    router.back()
}

/***************************************/

let params: any = reactive({
    commentId: route.params.commentId
})

function reqGetCommentInfo(params: any) {
    postStore.getCommentInfo(params)
}

onMounted(() => {
    reqGetCommentInfo(params)
    console.log('commentInfo:', commentInfo.value)
    emitter.on('regetCommentInfo', () => {
        reqGetCommentInfo(params)
    })
})
onUnmounted(() => {
    emitter.off('regetCommentInfo')
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
            cursor: pointer;
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
            padding-left: 20px;
            padding-right: 20px;
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
