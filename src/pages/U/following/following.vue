<template>
    <div>
        <UserCard parent="followers" :userCardList="following" />
    </div>
</template>
<script setup lang="ts">
import UserCard from '@/components/UserCard/index.vue'
import useUserStore from '@/store/user'
import {storeToRefs} from 'pinia'
import {onMounted, reactive} from 'vue'
import {useRoute} from 'vue-router'
const route = useRoute()
const userStore = useUserStore()
let {following} = storeToRefs(userStore)
let params = reactive({
    type: route.name!.toString(),
    userId: Number(route.params.userId)
})

async function reqGetFollowers() {
    userStore.getUserCard(params)
}
onMounted(() => {
    reqGetFollowers()
})
</script>
<style lang="scss" scoped></style>
