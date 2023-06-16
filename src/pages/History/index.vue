<template>
    <div>
        <PostCard parent="historyPost" :postCardList="historyPostCardList" />
    </div>
</template>
<script setup lang="ts">
import useRouterStore from '@/store/community'
import usePostStore from '@/store/post'
import PostCard from '@/components/Cards/PostCard/index.vue'
import {storeToRefs} from 'pinia'
import {nextTick, onMounted, watch} from 'vue'

const postStore = usePostStore()
let {historyPostCardList} = storeToRefs(postStore)
const routerStore = useRouterStore()
watch(
    historyPostCardList,
    (ov, nv) => {
        nextTick(() => {
            //console.log('更新')
            //console.log('historyPostCardList:', historyPostCardList.value)
        })
    },
    {immediate: true}
)
function reqGetHistoryPostCard() {
    postStore.getPostCard({
        type: 'history'
    })
}
onMounted(() => {
    reqGetHistoryPostCard()
})
</script>
<style lang="scss" scoped></style>
