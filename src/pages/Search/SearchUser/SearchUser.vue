<template>
    <div>
        <UserCard parent="searchUser" :userCardList="searchUserCardList" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {computed, nextTick, onMounted, reactive, watch} from 'vue'
import {useRoute} from 'vue-router'
import useUserStore from '@/store/user'
import useMainStore from '@/store/index'
import UserCard from '@/components/UserCard/index.vue'
const mainStore = useMainStore()
const userStore = useUserStore()
const route = useRoute()
let {searchUserCardList} = storeToRefs(userStore)
let keyWords = computed(() => {
    return mainStore.searchKeyWord
})
watch(
    searchUserCardList,
    (ov, nv) => {
        nextTick(() => {
            //console.log('搜索用户卡片:', searchUserCardList.value)
        })
    },
    {immediate: true}
)
async function reqGetSearchUser() {
    await userStore.getUserCard({type: 'search', keyWords: keyWords.value})
}
onMounted(() => {
    reqGetSearchUser()
})
</script>
<style lang="scss" scoped></style>
