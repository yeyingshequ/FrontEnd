<template>
    <div>
        <CmtyCard parent="searchCmty" :cmtyCardList="searchCmtyCardList" />
    </div>
</template>
<script setup lang="ts">
import storage from '@/tools/storage'
import {computed, onMounted, reactive, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import CmtyCard from '@/components/Cards/CmtyCard/index.vue'
import {storeToRefs} from 'pinia'
import useRouterStore from '@/store/community'
import useMainStore from '@/store/index'
const mainStore = useMainStore()
const routerStore = useRouterStore()
const router = useRouter()
const route = useRoute()
let {searchCmtyCardList} = storeToRefs(routerStore)
let keyWords = computed(() => {
    return mainStore.searchKeyWord
})
async function reqGetSearchCmty() {
    await routerStore.getCmtyCard({type: 'search', keyWords: keyWords.value})
}
watch(route, (nv: any, ov: any) => {
    reqGetSearchCmty()
})
onMounted(() => {
    reqGetSearchCmty()
})
</script>
<style lang="scss" scoped></style>
