<template>
    <div class="container">
        <Top parent="comment" :info="commentInfo" />
        <Comment :commentInfo="commentInfo" />
        <Reply :replyInfo="commentInfo.reply" />
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
import Top from '@/components/Top/Top.vue'
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
    //console.log('commentInfo:', commentInfo.value)
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
}
</style>
