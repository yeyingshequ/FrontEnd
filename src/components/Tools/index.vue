<template>
    <!-- 回复、转发、收藏、点赞 -->
    <div class="tools">
        <div class="item" @click="showEditor()">
            <i class="iconfont icon-pinglun"></i><span> {{ getCommentCount || '回复' }}</span>
        </div>
        <!-- <div><i class="iconfont icon-lihe"></i><span></span></div> -->
        <div class="item">
            <i class="iconfont icon-fenxiang"></i><span>{{ getShareCount || '分享' }}</span>
        </div>
        <div class="item">
            <i class="iconfont" :class="getLikeStatus" @click.stop="setLikeCount()"></i
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
import {computed, nextTick, onMounted, onUpdated, ref, toRefs, watch} from 'vue'
import usePostStore from '@/store/post'
import {useRoute} from 'vue-router'
import {updateUserPost, updateUserComment, updateUserReply} from '@/api'

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

let isLiked = ref(false)
watch(
    info,
    (ov, nv) => {
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

//监听点赞情况,更换样式
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
    isLiked.value = !isLiked.value
    let request
    isLiked.value ? info.value.likeCount++ : info.value.likeCount--
    isLiked.value ? (request = 'like') : (request = 'unLike')
    switch (father.value) {
        case 'postCard':
        case 'postMain':
            await updateUserPost({
                request: request,
                postId: info.value.postId,
                likedContent: info.value.content
            })
            break
        case 'comment':
        case 'commentMain':
            console.log()

            await updateUserComment({
                request: request,
                commentId: info.value.commentId,
                likedContent: info.value.content
            })
            break
        case 'reply':
            await updateUserReply({
                request: request,
                replyId: info.value.replyId,
                likedContent: info.value.content
            })
            break
    }
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
    //console.log(info.value)
    /* setTimeout(() => {
        if (father.value == 'comment') {
            console.log('Tools中的commentInfo', commentInfo.value)
        }
    }, 300) */
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
