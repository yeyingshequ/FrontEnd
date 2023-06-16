<template>
    <!-- 回复、转发、收藏、点赞 -->
    <div class="tools" ref="tools">
        <div class="item" @click="showEditor()">
            <i class="iconfont icon-pinglun"></i
            ><span v-show="width > 220"> {{ getCommentCount || '回复' }}</span>
        </div>
        <!-- <div><i class="iconfont icon-lihe"></i><span></span></div> -->

        <div class="item">
            <i class="iconfont" :class="getLikeStatus" @click.stop="setLikeCount()"></i
            ><span v-show="width > 220">{{ getLikeCount || '点赞' }}</span>
        </div>
        <div class="item">
            <i class="iconfont icon-fenxiang"></i
            ><span v-show="width > 220">{{ getShareCount || '分享' }}</span>
        </div>
        <CommentEditor
            v-if="showCommentEditor"
            :postInfo="postInfo"
            :father="father"
            @setEditor="setEditor"
        />
        <ReplyEditor
            v-if="showReplyEditor"
            :commentInfo="commentInfo"
            :replyInfo="replyInfo"
            :father="father"
            @setEditor="setEditor"
        />
    </div>
</template>
<script setup lang="ts">
import CommentEditor from '@/components/Editor/CommentEditor/index.vue'
import ReplyEditor from '@/components/Editor/ReplyEditor/index.vue'
import {computed, nextTick, onMounted, onUnmounted, ref, watch, watchEffect} from 'vue'
import {updateUserPost, updateUserComment, updateUserReply} from '@/api'
import useMainStore from '@/store/index'
import emitter from '@/tools/mitt'
const mainStore = useMainStore()
//父传子
function setEditor(type: string) {
    if (type == 'comment') {
        showCommentEditor.value = false
    } else if (type == 'reply') {
        showReplyEditor.value = false
    }
}
let props = defineProps(['postInfo', 'father', 'commentInfo', 'replyInfo', 'isMain'])

//父组件的组件名
let father = computed(() => {
    return props.father
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
let info = computed(() => {
    switch (father.value) {
        case 'postCard':
        case 'postMain':
            return postInfo.value
        case 'comment':
        case 'commentMain':
            return commentInfo.value
        case 'reply':
            return replyInfo.value
    }
})
let tools = ref()
let width = ref(0)
const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.target === tools.value) {
            width.value = entry.contentRect.width
        }
    })
})
let isLiked = ref(false)
watch(
    info,
    () => {
        nextTick(() => {
            //console.log('旧数据:', ov)
            //console.log('新数据:', nv)

            switch (father.value) {
                case 'postCard':
                case 'postMain':
                    if (info.value.userPost) isLiked.value = info.value.userPost.isLiked
                    break
                case 'comment':
                case 'commentMain':
                    if (info.value.userComment) isLiked.value = info.value.userComment.isLiked
                    break
                case 'reply':
                    if (info.value.userReply) isLiked.value = info.value.userReply.isLiked
                    break
            }
            return false
        })
    },
    {immediate: true /* , deep: true */}
)

//当点赞或取消点赞时,更换样式
let getLikeStatus = computed(() => {
    {
        return isLiked.value ? 'iconfont icon-aixin_clicked' : 'iconfont icon-aixin'
    }
})

//统计点赞数量
let getLikeCount = computed(() => {
    return info.value.likeCount
})

async function setLikeCount() {
    //console.log('点赞的父组件是', father.value)
    let request
    let result
    //console.log('isLiked.value:', isLiked.value)
    isLiked.value ? (request = 'unLike') : (request = 'like')
    switch (father.value) {
        case 'postCard':
        case 'postMain':
            result = await updateUserPost({
                request: request,
                postId: info.value.postId,
                likedContent: info.value.content
            })
            break
        case 'comment':
        case 'commentMain':
            //console.log()

            result = await updateUserComment({
                request: request,
                commentId: info.value.commentId,
                likedContent: info.value.content
            })
            break
        case 'reply':
            result = await updateUserReply({
                request: request,
                replyId: info.value.replyId,
                likedContent: info.value.content
            })
            break
    }
    //console.log('result:', result)
    if (!result.status) {
        isLiked.value = !isLiked.value
        isLiked.value ? info.value.likeCount++ : info.value.likeCount--
    }
    mainStore.setShowLoginScreen(result)
}

let getCommentCount = computed(() => {
    switch (father.value) {
        case 'postCard':
        case 'postMain':
            return info.value.totalCommentingCount
        /* case 'comment':
        case 'commentMain':
            return info.value.replyCount */
    }
})
let getShareCount = computed(() => {
    return info.value.shareCount
})

//打开评论和回复编辑器
//let {showCommentEditor, showReplyEditor} = storeToRefs(mainStore)

let showCommentEditor = ref(false)
let showReplyEditor = ref(false)

/**************************************************************************/
//开启编辑器
function showEditor() {
    //console.log('father:', father.value)
    switch (father.value) {
        case 'postCard':
            //console.log('post in tools:', postInfo?.value)
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
            showReplyEditor.value = true
            break
    }
}
emitter.on('showEditor', (type) => {
    //console.log(father.value)
    //console.log(type)
    if (type == 'post' && father.value == 'postMain') {
        showCommentEditor.value = true
    } else if (type == 'comment' && father.value == 'commentMain') {
        showReplyEditor.value = true
    }
})
onMounted(() => {
    resizeObserver.observe(tools.value)
})

onUnmounted(() => {
    resizeObserver.disconnect()
    //emitter.off('showEditor')
})
</script>
<style scoped lang="scss">
.icon-aixin_clicked {
    color: deeppink;
}

.tools {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    -webkit-user-select: none;
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
