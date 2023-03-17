<template>
    <div>
        <PostCard v-if="searchPostCardList" :postCardList="searchPostCardList" />
    </div>
</template>
<script setup lang="ts">
import {onMounted} from 'vue'
import usePostStore from '@/store/post'
import {storeToRefs} from 'pinia'
import {useRoute} from 'vue-router'
import useMainStore from '@/store/index'
const mainStore = useMainStore()
const route = useRoute()
const postStore = usePostStore()
let {searchPostCardList} = storeToRefs(postStore)
function reqGetSearchPostCard() {
    postStore.getPostCard({type: 'search', keyWords: mainStore.searchKeyWord})
}
onMounted(() => {
    reqGetSearchPostCard()
})
</script>
<style lang="scss" scoped></style>
