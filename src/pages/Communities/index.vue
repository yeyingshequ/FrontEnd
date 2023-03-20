<template>
    <div class="communitiesPage">
        <Tab :tabs="tabs" />
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
import Tab from '@/components/Tab/index.vue'
import storage from '@/tools/storage'
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
const tabs = [
    {
        Name: '我的社区',
        id: 1,
        router: '/communities/joined',
        routeName: 'Joined'
    },
    {
        Name: '特别关注',
        id: 2,
        router: '/communities/favorite',
        routeName: 'Favorite'
    },
    {
        Name: '社区广场',
        id: 3,
        router: '/communities/square/全部',
        routeName: 'Square'
    },
    {
        Name: '最近逛过',
        id: 4,
        router: '/communities/recent',
        routeName: 'Recent'
    }
]
onMounted(() => {
    /* if (!storage.get('token')) {
        router.push('/communities/square')
    } */
})
</script>
<style scoped lang="scss">
.communitiesPage {
    position: relative;
    width: 100%;
}
</style>
