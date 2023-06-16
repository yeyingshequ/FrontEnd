<template>
    <div>
        <PostCard parent="savedPost" :postCardList="savedPostCardList" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {nextTick, onMounted, watch} from 'vue'
import usePostStore from '@/store/post'
import PostCard from '@/components/Cards/PostCard/index.vue'
const postStore = usePostStore()
let {savedPostCardList} = storeToRefs(postStore)
//console.log('savedPostCardList:', savedPostCardList)
watch(
    savedPostCardList,
    (ov, nv) => {
        nextTick(() => {
            //console.log('更新')
            //console.log('savedPostCardList:', savedPostCardList.value)
        })
    },
    {immediate: true}
)
function reqGetSavedPostCard() {
    postStore.getPostCard({
        type: 'saved'
    })
}
onMounted(() => {
    reqGetSavedPostCard()
})
</script>
<style lang="scss" scoped></style>
