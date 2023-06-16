<template>
    <div>
        <CmtyCard
            parent="joinedCmty"
            :cmtyCardList="joinedCmtyCardList"
            @regetCmtyCard="reqGetJoinedCmty"
        />
    </div>
</template>
<script setup lang="ts">
import storage from '@/tools/storage'
import {onMounted, reactive, watch, watchEffect} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import CmtyCard from '@/components/Cards/CmtyCard/index.vue'
import {storeToRefs} from 'pinia'
import useRouterStore from '@/store/community'
import useCmtyStore from '@/store/community'
const cmtyStore = useCmtyStore()
const routerStore = useRouterStore()
const router = useRouter()
const route = useRoute()
let {joinedCmtyCardList} = storeToRefs(routerStore)

async function reqGetJoinedCmty() {
    routerStore.getCmtyCard({type: 'joined'})
}
watch(cmtyStore.joinedCmtyCardList, () => {
    //console.log('myArray has changed:')
})
onMounted(() => {
    //如果没有登录就跳转到社区广场
    /* if (!storage.get('token')) {
        router.push('/communities/square/全部')
    } else {
        reqGetJoinedCmty()
    } */
    reqGetJoinedCmty()
})
</script>
<style scoped lang="scss"></style>
