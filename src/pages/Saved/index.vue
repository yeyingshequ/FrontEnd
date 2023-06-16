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
        Name: '帖子',
        id: 1,
        router: '/saved/savedpost',
        routeName: 'SavedPost'
    },
    {
        Name: '评论和回复',
        id: 2,
        router: '/saved/savedcomment',
        routeName: 'SavedComment'
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
