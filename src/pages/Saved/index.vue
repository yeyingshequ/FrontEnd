<template>
    <div>
        <PostCard :postCardList="savedPostCardList" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {onMounted} from 'vue'
import usePostStore from '@/store/post'
const postStore = usePostStore()
let {savedPostCardList} = storeToRefs(postStore)
console.log('savedPostCardList:', savedPostCardList)

function reqGetSavedPostCard() {
    postStore.getSavedPostCard()
}
onMounted(() => {
    reqGetSavedPostCard()
})
</script>
<style lang="scss" scoped></style>
