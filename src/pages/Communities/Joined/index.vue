<template>
    <div>
        <CmtyCard :cmtyCardList="joinedCmtyCardList" @regetJoinedCmty="reqGetJoinedCmty" />
    </div>
</template>
<script setup lang="ts">
import rename from '@/tools/rename'
import {getJoinedCmty} from '@/api'
import storage from '@/tools/storage'
import {onMounted, reactive, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import CmtyCard from '@/components/CmtyCard/index.vue'
import {storeToRefs} from 'pinia'
import useRouterStore from '@/store/community'
const routerStore = useRouterStore()
const router = useRouter()
const route = useRoute()
let {joinedCmtyCardList} = storeToRefs(routerStore)

async function reqGetJoinedCmty() {
    routerStore.getJoinedCmty()
}
watch(route, (nv: any, ov: any) => {
    reqGetJoinedCmty()
})
onMounted(() => {
    //如果没有登录就跳转到社区广场
    if (!storage.get('token')) {
        router.push('/communities/square/全部')
    } else {
        reqGetJoinedCmty()
    }
})
</script>
<style scoped lang="scss"></style>
