<template>
    <div>
        <CommentCard parent="savedComment" :commentCardList="savedCommentCardList" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {nextTick, onMounted, watch} from 'vue'
import CommentCard from '@/components/Cards/CommentCard/CommentCard.vue'
import usePostStore from '@/store/post'
const postStore = usePostStore()
let {savedCommentCardList} = storeToRefs(postStore)
//console.log('savedCommentCardList:', savedCommentCardList)
watch(
    savedCommentCardList,
    (ov, nv) => {
        nextTick(() => {
            //console.log('更新')
            //console.log('savedCommentCardList:', savedCommentCardList.value)
        })
    },
    {immediate: true}
)
function reqGetSavedPostCard() {
    postStore.getCommentCard({
        type: 'saved'
    })
}
onMounted(() => {
    reqGetSavedPostCard()
})
</script>
<style lang="scss" scoped></style>
