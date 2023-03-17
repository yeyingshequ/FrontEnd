<template>
    <div>
        <PostCard v-if="postStore.userPostCardList" :postCardList="userPostCardList" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
import {onMounted, onUnmounted, reactive, watch} from 'vue'
import useUserStore from '@/store/user'
import {useRoute} from 'vue-router'
import emitter from '@/tools/mitt'
const route = useRoute()
const userStore = useUserStore()
const postStore = usePostStore()
let {userPostCardList} = storeToRefs(postStore)

let params = reactive({
    type: 'user',
    userId: Number(route.params.uid)
})
async function reqGetUserPostCard(params: {type: string; userId: number}) {
    postStore.getPostCard(params)
}
watch(route, (nv) => {
    //console.log('nv:', nv.params.uid)
    //console.log(params.userId)
    if (Number(nv.params.uid) != params.userId) {
        params.userId = Number(nv.params.uid)
        reqGetUserPostCard(params)
    }
})
onMounted(() => {
    //console.log('params:', params)
    reqGetUserPostCard(params)
})
</script>
<style lang="scss" scoped></style>
