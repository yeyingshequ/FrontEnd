<template>
    <div>
        <CmtyCard parent="userCmty" :cmtyCardList="userCmtyCardList" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import useCmtyStore from '@/store/community'
import {onMounted, reactive, watch} from 'vue'
import {useRoute} from 'vue-router'
import CmtyCard from '@/components/Cards/CmtyCard/index.vue'
import router from '@/router'
const route = useRoute()
const cmtyStore = useCmtyStore()
let {userCmtyCardList} = storeToRefs(cmtyStore)
let params = reactive({
    userId: Number(route.params.userId)
})
async function reqGetUserCmty(params: {userId: Number}) {
    cmtyStore.getCmtyCard({type: 'user', userId: parseInt(route.params.userId as string)})
}
watch(route, (nv: any, ov: any) => {
    reqGetUserCmty(params)
})
onMounted(() => {
    reqGetUserCmty(params)
})
</script>
<style lang="scss" scoped></style>
