<template>
    <div>
        <Tab :tabs="tabs" />
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    name: "Communities",
    data() {
        return {
            tabs: [
                { Name: "我的社区", id: 1, router: "/communities/joined" },
                { Name: "特别关注", id: 2, router: "/communities/favorite" },
                { Name: "社区广场", id: 3, router: "/communities/square" },
                { Name: "最近逛过", id: 4, router: "/communities/recent" }
            ],
            currentId: "1"
        };
    },
}
</script>
<style scoped lang="scss">

</style>