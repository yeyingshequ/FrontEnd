<template>
    <div class="container">
        <Tab :tabs="tabs" />
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
let tabs = [
    {Name: '回复', id: 1, router: '/notifications/reply'},
    {Name: '点赞', id: 2, router: '/notifications/like'},
    /* { Name: "@我的", id: 3, router: "/notifications/at" }, */
    {Name: '系统消息', id: 4, router: '/notifications/system'}
]
</script>
<style scoped lang="scss">
.container {
    width: 698px;
}
</style>
