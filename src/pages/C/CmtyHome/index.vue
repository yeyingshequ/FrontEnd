<template>
    <div class="homeContainer">
        <postCard :postCardList="cmtyPostCardList" />
    </div>
</template>
<script setup lang="ts">
import {useRoute} from 'vue-router'
import {onMounted, reactive} from 'vue'
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
const postStore = usePostStore()
const route = useRoute()

let params = reactive({
    type: 'community',
    cmtyId: Number(route.params.cmtyId)
})

let {cmtyPostCardList} = storeToRefs(postStore)
function reqGetCmtyPosts(params: {type: string; cmtyId: number}) {
    //console.log('cmtyId:', typeof params.cmtyId)
    postStore.getPostCard(params)
}
onMounted(() => {
    //console.log(route)
    reqGetCmtyPosts(params)
})
</script>

<style scoped lang="scss"></style>
