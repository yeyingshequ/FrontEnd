<template>
    <div>
        <Tab :tabs="tabs" />
        <router-view></router-view>
    </div>
</template>
<script>

<<<<<<< HEAD
import storage from "@/tools/storage";

=======
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
export default {
    name: "Communities",
    data() {
        return {
            tabs: [
<<<<<<< HEAD
                { Name: "我的社区", id: 1, router: "/communities/joined",pathName:'Joined'},
                { Name: "特别关注", id: 2, router: "/communities/favorite" ,pathName:'Favorite'},
                { Name: "社区广场", id: 3, router: "/communities/square",pathName:'Square'},
                { Name: "最近逛过", id: 4, router: "/communities/recent",pathName:'Recent' }
            ],
            currentId: ""
        };
    },
  mounted() {
      //如果没有登录就跳转到社区广场
      if (!storage.get('token')){
        this.$router.push('/communities/square/全部')
      }
  }
=======
                { Name: "我的社区", id: 1, router: "/communities/joined" },
                { Name: "特别关注", id: 2, router: "/communities/favorite" },
                { Name: "社区广场", id: 3, router: "/communities/square" },
                { Name: "最近逛过", id: 4, router: "/communities/recent" }
            ],
            currentId: "1"
        };
    },
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
}
</script>
<style scoped lang="scss">

</style>