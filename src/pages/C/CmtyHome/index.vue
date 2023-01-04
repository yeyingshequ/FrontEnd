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

let params: any = reactive({
    cmtyId: route.params.cmtyId
})

let {cmtyPostCardList} = storeToRefs(postStore)
function reqGetCmtyPosts(params: {cmtyId: string | number}) {
    postStore.getCmtyPosts(params)
}
onMounted(() => {
    //console.log(route)
    reqGetCmtyPosts(params)
})
</script>

<style scoped lang="scss"></style>
