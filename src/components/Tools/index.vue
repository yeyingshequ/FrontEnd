<template>
    <!-- 回复、转发、收藏、点赞 -->
    <div class="tools">
        <div @click="showEditor">
            <i class="iconfont icon-pinglun"></i
            ><span><!--   {{ postInfo.commentCount || '回复' }}--></span>
        </div>
        <!-- <div>
        <i class="iconfont icon-lihe"></i><span></span>
    </div> -->
        <div>
            <i class="iconfont icon-fenxiang"></i
            ><span><!-- {{postInfo.shareCount||'分享' }}--></span>
        </div>
        <div>
            <i class="iconfont icon-aixin"></i><span><!--{{postInfo.likeCount||'点赞' }}--></span>
        </div>
        <CommentEditor v-if="showCommentEditor" @closeEditor="closeEditor" :postInfo="postInfo" />
        <ReplyEditor v-if="showReplyEditor" @closeEditor="closeEditor" :commentInfo="commentInfo" />
    </div>
</template>
<script setup lang="ts">
import CommentEditor from '@/components/Tools/CommentEditor/index.vue'
import ReplyEditor from '@/components/Tools/ReplyEditor/index.vue'
import useMainStore from '@/store/index'
import {storeToRefs} from 'pinia'
import {computed, ref, toRefs} from 'vue'
/**************************************************************************/
//主容器
const mainStore = useMainStore()
//父传子
let props = defineProps(['postInfo', 'father', 'commentInfo'])

//父组件的组件名
let {father} = toRefs(props)

//打开评论和回复编辑器
let {showCommentEditor, showReplyEditor} = storeToRefs(mainStore)
let commentInfo = computed(() => {
    return props.commentInfo
})

let postInfo = computed(() => {
    return props.postInfo
})
/**************************************************************************/
//开启编辑器
function showEditor() {
    console.log('father:', father?.value)
    switch (father?.value) {
        case 'post':
            console.log('post in tools:', postInfo?.value)
            showCommentEditor.value = true
            break
        case 'comment':
            console.log('在子组件Tools中的CommentInfo:', commentInfo?.value)
            showReplyEditor.value = true
    }
}

//关闭 编辑器
function closeEditor(data: string) {
    switch (data) {
        case 'showCommentEditor':
            showCommentEditor.value = false
            break
        case 'showReplyEditor':
            showReplyEditor.value = false
            break
    }
}
</script>
<style scoped lang="scss">
.tools {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 40px;

    /* background-color: hotpink; */
    div {
        /* height: 40px; */
        color: $regularFont;

        i {
            margin-right: 5px;
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
