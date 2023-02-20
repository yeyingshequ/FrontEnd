<template>
    <div>
        <CmtyCard :cmtyCardList="userCmtyCardList" @regetCmtyCard="reqGetUserCmty(params)" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import useCmtyStore from '@/store/community'
import {onMounted, reactive, watch} from 'vue'
import {useRoute} from 'vue-router'
import router from '@/router'
const route = useRoute()
const cmtyStore = useCmtyStore()
let {userCmtyCardList} = storeToRefs(cmtyStore)
let params = reactive({
    userId: Number(route.params.uid)
})
async function reqGetUserCmty(params: {userId: Number}) {
    cmtyStore.getUserCmty(params)
}
watch(route, (nv: any, ov: any) => {
    reqGetUserCmty(params)
})
onMounted(() => {
    reqGetUserCmty(params)
})
</script>
<style lang="scss" scoped></style>
