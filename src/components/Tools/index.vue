<template>
    <!-- 回复、转发、收藏、点赞 -->
    <div class="tools">
        <div class="item" @click="showEditor()">
            <i class="iconfont icon-pinglun"></i><span> {{ getCommentCount || '回复' }}</span>
        </div>
        <!-- <div>
        <i class="iconfont icon-lihe"></i><span></span>
    </div> -->
        <div class="item">
            <i class="iconfont icon-fenxiang"></i><span>{{ getShareCount || '分享' }}</span>
        </div>
        <div class="item">
            <i class="iconfont icon-aixin" @click.stop="setLikeCount()"></i
            ><span>{{ getLikeCount || '点赞' }}</span>
        </div>
        <CommentEditor
            v-if="showCommentEditor"
            @closeEditor="closeEditor"
            :postInfo="postInfo"
            :father="father"
        />
        <ReplyEditor
            v-if="showReplyEditor"
            @closeEditor="closeEditor"
            :commentInfo="commentInfo"
            :replyInfo="replyInfo"
            :father="father"
        />
    </div>
</template>
<script setup lang="ts">
import CommentEditor from '@/components/Tools/CommentEditor/index.vue'
import ReplyEditor from '@/components/Tools/ReplyEditor/index.vue'
import useMainStore from '@/store/index'
import {storeToRefs} from 'pinia'
import {computed, onMounted, ref, toRefs} from 'vue'
import usePostStore from '@/store/post'
import {useRoute} from 'vue-router'
const route = useRoute()
const postStore = usePostStore()
/**************************************************************************/
//主容器
const mainStore = useMainStore()
//父传子
let props = defineProps(['postInfo', 'father', 'commentInfo', 'replyInfo', 'isMain'])

//父组件的组件名
let father = computed(() => {
    return props.father
})
let isLiked = ref(false)
let getLikeCount = computed(() => {
    switch (father!.value) {
        case 'postCard':
        case 'postMain':
            return postInfo.value.likeCount
        case 'comment':
        case 'commentMain':
            return commentInfo.value.likeCount
        case 'reply':
            return replyInfo.value.likeCount
    }
})

function setLikeCount() {
    switch (father.value) {
        case 'postCard':
            switch (route.name) {
                case 'Home':
                    let iHome = postStore.homePostCardList.findIndex(
                        (item) => item.postId === postInfo.value.postId
                    )
                    postStore.homePostCardList[iHome].likeCount++
                    break
                case 'Discover':
                    let iDiscover = postStore.discoverPostCardList.findIndex(
                        (item) => item.postId === postInfo.value.postId
                    )
                    postStore.discoverPostCardList[iDiscover].likeCount++
                    break
                case 'CmtyHome':
                    let iCmty = postStore.cmtyPostCardList.findIndex(
                        (item) => item.postId === postInfo.value.postId
                    )
                    postStore.cmtyPostCardList[iCmty].likeCount++
                    break

                case 'UserHome':
                    let iUser = postStore.userPostCardList.findIndex(
                        (item) => item.postId === postInfo.value.postId
                    )
                    postStore.userPostCardList[iUser].likeCount++
                    break
                case 'Saved':
                    let iSaved = postStore.savedPostCardList.findIndex(
                        (item) => item.postId === postInfo.value.postId
                    )
                    postStore.userPostCardList[iSaved].likeCount++
                    break
            }
        case 'postMain':
            postStore.postInfo.likeCount++
            //console.log(postStore.postInfo)
            break
        case 'comment':
            let iComment = postStore.postInfo.comment.findIndex(
                (item) => item.commentId === commentInfo.value.commentId
            )
            //console.log(postStore.postInfo.comment[iComment])

            postStore.postInfo.comment[iComment].likeCount++
            //console.log(postStore.postInfo.comment[iComment].likeCount)
            break
        case 'reply':
            switch (route.name) {
                case 'P':
                    let iReplyP = postStore.postInfo.comment.findIndex(
                        (item) => item.commentId === replyInfo.value.commentId
                    )
                    //console.log('jReplyP', iReplyP)
                    let jReplyP = postStore.postInfo.comment[iReplyP].reply.findIndex(
                        (item) => item.replyId === replyInfo.value.replyId
                    )
                    //console.log('jReplyP:', jReplyP)

                    postStore.postInfo.comment[iReplyP].reply[jReplyP].likeCount++
                    break
                case 'Comment':
                    let iReplyC = postStore.commentInfo.reply.findIndex(
                        (item) => item.replyId === replyInfo.value.replyId
                    )
                    postStore.commentInfo.reply[iReplyC].likeCount++
                    //console.log(postStore.commentInfo.reply[iReplyC].likeCount)
                    break
            }
        case 'commentMain':
            postStore.commentInfo.likeCount++
            console.log(postStore.commentInfo.likeCount)
    }
}

let getCommentCount = computed(() => {
    switch (father!.value) {
        case 'postCard':
        case 'postMain':
            return postInfo.value.commentCount
            break
        case 'comment':
            //console.log(commentInfo.value.repliesCount)

            return commentInfo.value.repliesCount
        case 'commentMain':
    }
})

let getShareCount = computed(() => {
    switch (father!.value) {
        case 'postCard':
        case 'postMain':
            return postInfo.value.shareCount
        default:
            break
    }
})

//打开评论和回复编辑器
//let {showCommentEditor, showReplyEditor} = storeToRefs(mainStore)

let showCommentEditor = ref(false)
let showReplyEditor = ref(false)

let isMain = computed(() => {
    return props.isMain
})

let commentInfo = computed(() => {
    return props.commentInfo
})

let postInfo = computed(() => {
    return props.postInfo
})

let replyInfo = computed(() => {
    return props.replyInfo
})

/**************************************************************************/
//开启编辑器
function showEditor() {
    console.log('father:', father.value)
    switch (father.value) {
        case 'postCard':
            console.log('post in tools:', postInfo?.value)
            showCommentEditor.value = true
            break
        case 'postMain':
            showCommentEditor.value = true
            break
        case 'commentMain':
            showReplyEditor.value = true
            break
        case 'comment':
            showReplyEditor.value = true
            break
        case 'reply':
            console.log(11)
            showReplyEditor.value = true
            break
    }
}

//关闭 编辑器
function closeEditor(data: string) {
    //console.log('data:', data)
    switch (data) {
        case 'commentEditor':
            showCommentEditor.value = false

            break
        case 'replyEditor':
            showReplyEditor.value = false
            break
    }
}
onMounted(() => {
    //console.log('father:', father!.value)
    /* setTimeout(() => {
        if (father.value == 'comment') {
            console.log('Tools中的commentInfo', commentInfo.value)
        }
    }, 300) */
})
</script>
<style scoped lang="scss">
.tools {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;

    /* background-color: hotpink; */
    .item {
        /* height: 40px; */
        color: $regularFont;
        flex: 1;

        i {
            margin-right: 10px;
            font-size: 20px;
            vertical-align: middle;
            line-height: 2rem;
            text-align: center;
        }

        span {
            font-size: 13px;
            position: relative;
            vertical-align: middle;
            line-height: 2rem;
        }
    }
}
</style>
