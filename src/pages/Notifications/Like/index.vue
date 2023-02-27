<template>
    <div>
        <NotiCard v-if="likeNotiCardList[0].id" parent="like" :notiCardList="likeNotiCardList" />
        <div class="msg" v-if="!likeNotiCardList[0].id">
            <h1>还没收到任何点赞通知</h1>
        </div>
    </div>
</template>
<script setup lang="ts">
import NotiCard from '@/components/NotiCard/index.vue'
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
import {onMounted} from 'vue'
const postStore = usePostStore()
let {likeNotiCardList} = storeToRefs(postStore)
async function reqGetLikeNotiCard() {
    postStore.getNotiCard({type: 'like'})
}

onMounted(() => {
    console.log('加载点赞通知')
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
