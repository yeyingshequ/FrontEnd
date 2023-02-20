<template>
    <div>
        <NotiCard paarent="reply" :notiCardList="replyNotiCardList" />
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
    reqGetReplyNotiCard()
})
</script>
<style scoped lang="scss"></style>
