<template>
    <div>
        <UserCard :userCardList="followers" />
    </div>
</template>
<script setup lang="ts">
import UserCard from '@/components/UserCard/index.vue'
import useUserStore from '@/store/user'
import {storeToRefs} from 'pinia'
import {onMounted, reactive} from 'vue'
import {useRoute} from 'vue-router'
import useMainStore from '@/store/index'
const mainStore = useMainStore()
const route = useRoute()
const userStore = useUserStore()
let {followers} = storeToRefs(userStore)
let params = reactive({
    type: route.name!.toString(),
    userId: Number(route.params.uid)
})

async function reqGetFollowers() {

    userStore.getUserCard(params)
}
onMounted(() => {
    reqGetFollowers()
})
</script>
<style lang="scss" scoped></style>
