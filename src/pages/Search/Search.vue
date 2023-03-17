<template>
    <div>
        <Tab :tabs="tabs" style="position: fixed; width: 698px" />
        <router-view style="padding-top: 55px"></router-view>
    </div>
</template>
<script setup lang="ts">
import Tab from '@/components/Tab/index.vue'
import {useRoute} from 'vue-router'
import useMainStore from '@/store/index'
import {computed, ref, watch} from 'vue'
const mainStore = useMainStore()
const route = useRoute()
watch(route, () => {
    /* if (route.meta.keepSearchKeyWords) {

        mainStore.searchKeyWord = route.params.keyWords.toString()
    } */
    console.log('search的keyWord:', keyWords.value)

    mainStore.searchKeyWord = route.params.keyWords ? (route.params.keyWords as string) : ''
})
let keyWords = computed(() => {
    return mainStore.searchKeyWord
})

const tabs = ref([
    {
        Name: '帖子',
        id: 1,
        router: `/search/post/${keyWords.value}`,
        routeName: 'SearchPost'
    },
    {
        Name: '评论',
        id: 2,
        router: `/search/comment/${keyWords.value}`,
        routeName: 'SearchComment'
    },
    {
        Name: '社区',
        id: 3,
        router: `/search/community/${keyWords.value}`,
        routeName: 'SearchCmty'
    },
    {
        Name: '用户',
        id: 4,
        router: `/search/user/${keyWords.value}`,
        routeName: 'SearchUser'
    }
])
watch(keyWords, (newVal) => {
    tabs.value.forEach((item) => {
        const segments = item.router.split('/')
        console.log('segments:', segments)
        item.router = `/search/${segments[2]}/${newVal}`
    })
})
</script>

<style lang="scss" scoped></style>
