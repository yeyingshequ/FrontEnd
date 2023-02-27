<template>
    <div>
        <NotiCard parent="reply" :notiCardList="replyNotiCardList" />
        <div class="msg" v-if="!replyNotiCardList[0]">
            <h1>还没收到任何通知</h1>
        </div>
    </div>
</template>
<script setup lang="ts">
import NotiCard from '@/components/NotiCard/index.vue'
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
import {onMounted} from 'vue'
const postStore = usePostStore()
let {replyNotiCardList} = storeToRefs(postStore)
//console.log('notification:', replyNotiCardList.value)
async function reqGetReplyNotiCard() {
    postStore.getNotiCard({type: 'reply'})
}
onMounted(() => {
    console.log('加载回复通知')

    reqGetReplyNotiCard()
})
</script>
<style scoped lang="scss">
.msg {
    margin-top: 200px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}
</style>
