<template>
    <div>
        <CmtyCard :cmtyCardList="recentCmtyCardList" @regetRecentCmty="reqGetRecentCmty" />
    </div>
</template>
<script setup lang="ts">
import {getRecentCmty} from '@/api/index'
import rename from '@/tools/rename'
import storage from '@/tools/storage'
import {onMounted, reactive} from 'vue'
import {useRouter} from 'vue-router'
import CmtyCard from '@/components/CmtyCard/index.vue'
import useRouterStore from '@/store/community'
import {storeToRefs} from 'pinia'
const routerStore = useRouterStore()
const router = useRouter()
let {recentCmtyCardList} = storeToRefs(routerStore)

async function reqGetRecentCmty() {
    routerStore.getRecentCmty()
}

onMounted(() => {
    if (!storage.get('token')) {
        router.push('/communities/square/全部')
    } else {
        reqGetRecentCmty()
    }
})
</script>
<style scoped lang="scss"></style>
