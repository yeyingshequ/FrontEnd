<template>
    <div class="container">
        <Tab :tabs="tabs" />
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
import Tab from '@/components/Tab/index.vue'

let tabs = [
    {Name: '回复', id: 1, router: '/notifications/reply', routeName: 'Reply'},
    {Name: '点赞', id: 2, router: '/notifications/like', routeName: 'Like'}
    /* { Name: "@我的", id: 3, router: "/notifications/at" }, */
    /*  {Name: '系统消息', id: 4, router: '/notifications/system', routeName: 'System'} */
]
</script>
<style scoped lang="scss">
.container {
    width: 100%;
}
</style>
