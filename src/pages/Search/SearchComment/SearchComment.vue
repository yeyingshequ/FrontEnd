<template>
    <div>
        <CommentCard v-if="searchCommentCardList" />
    </div>
</template>
<script setup lang="ts">
import CommentCard from '@/components/CommentCard/CommentCard.vue'
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
import useMainStore from '@/store/index'
import {onMounted} from 'vue'
const mainStore = useMainStore()
const postStore = usePostStore()
let {searchCommentCardList} = storeToRefs(postStore)
function reqGetSearchCommentCard() {
    postStore.getCommentCard({type: 'search', keyWords: mainStore.searchKeyWord})
}
onMounted(() => {
    reqGetSearchCommentCard()
})
</script>

<style lang="scss" scoped></style>
