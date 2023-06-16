<template>
    <div>
        <CmtyCard
            parent="recentCmty"
            :cmtyCardList="recentCmtyCardList"
            @regetCmtyCard="reqGetRecentCmty"
        />
    </div>
</template>
<script setup lang="ts">
import storage from '@/tools/storage'
import {onMounted, reactive} from 'vue'
import {useRouter} from 'vue-router'
import CmtyCard from '@/components/Cards/CmtyCard/index.vue'
import useRouterStore from '@/store/community'
import {storeToRefs} from 'pinia'
import useUserStore from '@/store/user'
const userStore = useUserStore()
const routerStore = useRouterStore()
const router = useRouter()
let {recentCmtyCardList} = storeToRefs(routerStore)

async function reqGetRecentCmty() {
    routerStore.getCmtyCard({type: 'recent'})
}

onMounted(() => {
    //console.log(userStore.myInfo.userId)
    reqGetRecentCmty()
})
</script>
<style scoped lang="scss"></style>
