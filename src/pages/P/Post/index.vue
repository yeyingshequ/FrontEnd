<template>
    <div class="container">
        <MainFloor :MainFloorInfo="postInfo" parent="post" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
import MainFloor from '@/components/Floor/MainFloor.vue'

const postStore = usePostStore()
let {postInfo} = storeToRefs(postStore)
</script>
<style scoped lang="scss"></style>
