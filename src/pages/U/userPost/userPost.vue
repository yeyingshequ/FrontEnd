<template>
    <div>
        <PostCard parent="userPost" :postCardList="userPostCardList" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
import {onMounted, onUnmounted, reactive, watch} from 'vue'
import useUserStore from '@/store/user'
import {useRoute} from 'vue-router'
import BottomLoading from '@/components/littleComponents/Loading/bottomLoading.vue'
import PostCard from '@/components/Cards/PostCard/index.vue'

import emitter from '@/tools/mitt'
const route = useRoute()
const userStore = useUserStore()
const postStore = usePostStore()
let {userPostCardList} = storeToRefs(postStore)

let params = reactive({
    type: 'user',
    userId: Number(route.params.userId)
})
async function reqGetUserPostCard(params: {type: string; userId: number}) {
    postStore.getPostCard(params)
}
watch(route, (nv) => {
    //console.log('nv:', nv.params.userId)
    //console.log(params.userId)
    if (Number(nv.params.userId) != params.userId) {
        params.userId = Number(nv.params.userId)
        reqGetUserPostCard(params)
    }
})
onMounted(() => {
    //console.log('params:', params)
    reqGetUserPostCard(params)
})
</script>
<style lang="scss" scoped></style>
