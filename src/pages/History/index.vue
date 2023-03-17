<template>
    <div>
        <!-- <PostCard :postCardList="historyPostCardList" /> -->
    </div>
</template>
<script setup lang="ts">
import useRouterStore from '@/store/community'
import {storeToRefs} from 'pinia'
const routerStore = useRouterStore()
</script>
<style lang="scss" scoped></style>
