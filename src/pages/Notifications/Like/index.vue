<template>
    <div>
        <NotiCard parent="likeNoti" :notiCardList="likeNotiCardList" />
    </div>
</template>
<script setup lang="ts">
import NotiCard from '@/components/Cards/NotiCard/index.vue'
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
import {onMounted} from 'vue'
const postStore = usePostStore()
let {likeNotiCardList} = storeToRefs(postStore)
async function reqGetLikeNotiCard() {
    postStore.getNotiCard({type: 'like'})
}

onMounted(() => {
    //console.log('加载点赞通知')
    reqGetLikeNotiCard()
})
</script>
<style lang="scss" scoped>
.msg {
    margin-top: 200px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}
</style>
