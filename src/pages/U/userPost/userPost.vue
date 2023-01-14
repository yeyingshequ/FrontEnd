<template>
    <div>
        <PostCard :postCardList="userPostCardList" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
import {onMounted, onUnmounted, reactive} from 'vue'
import useUserStore from '@/store/user'
import {useRoute} from 'vue-router'
import emitter from '@/tools/mitt'
const route = useRoute()
const userStore = useUserStore()
const postStore = usePostStore()
let {userPostCardList} = storeToRefs(postStore)

let params = reactive({
    type: 'user',
    userId: route.params.uid
})
async function reqGetUserPostCard(params: any) {
    postStore.getPostCard(params)
}
onMounted(() => {
    //console.log('params:', params)
    reqGetUserPostCard(params)
})
</script>
<style lang="scss" scoped></style>
