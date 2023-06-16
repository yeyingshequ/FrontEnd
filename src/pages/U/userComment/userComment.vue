<template>
    <div>
        <CommentCard parent="userComment" :commentCardList="userCommentCardList" />
    </div>
</template>
<script setup lang="ts">
import CommentCard from '@/components/Cards/CommentCard/CommentCard.vue'
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
import useMainStore from '@/store/index'
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'
const route = useRoute()
const mainStore = useMainStore()
const postStore = usePostStore()
let {userCommentCardList} = storeToRefs(postStore)
function reqGetUserCommentCard() {
    postStore.getCommentCard({type: 'user', userId: parseInt(route.params.userId as string)})
}
onMounted(() => {
    reqGetUserCommentCard()
})
</script>

<style lang="scss" scoped></style>
