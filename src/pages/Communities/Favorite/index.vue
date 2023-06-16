<template>
    <div>
        <CmtyCard
            parent="favoriteCmty"
            :cmtyCardList="favoriteCmtyCardList"
            @regetCmtyCard="reqGetFavoriteCmty"
        />
    </div>
</template>
<script setup lang="ts">
import CmtyCard from '@/components/Cards/CmtyCard/index.vue'
import storage from '@/tools/storage'
import {onMounted, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import useRouterStore from '@/store/community'
import {storeToRefs} from 'pinia'
const routerStore = useRouterStore()
const router = useRouter()
const route = useRoute()
let {favoriteCmtyCardList} = storeToRefs(routerStore)
async function reqGetFavoriteCmty() {
    routerStore.getCmtyCard({type: 'favorite'})
}
watch(route, (nv: any, ov: any) => {
    reqGetFavoriteCmty()
})
onMounted(() => {
    reqGetFavoriteCmty()
})
</script>
<style scoped lang="scss"></style>
