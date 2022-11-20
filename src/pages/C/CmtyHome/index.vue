<template>
  <div class="homeContainer">
    <postCard :postList="postInfo"/>
  </div>
</template>

<script>

import {getCmtyHomePosts, getDiscoverInfo} from "@/api";
import rename from "@/tools/rename";
import formatTime from "@/tools/formatTime";

export default {
  name: "CmtyHome",
  data(){
    return{
      params:{
        cmtyId:this.$route.params.cid
      },
      postInfo:{

      }
    }
  },
  methods:{
    async getCmtyHomePosts(params){
      let result = await getCmtyHomePosts(params)
      if (result.status === 0) {
        for (let i = 0; i < result.data.length; i++) {
          result.data[i] = rename.toHump(result.data[i])
          result.data[i].updateTime = formatTime(result.data[i].updateTime)
        }
        this.postInfo = result.data
        console.log(result.data)
      }
    }
  },
  mounted() {
    console.log(this.$route)
    this.getCmtyHomePosts(this.params)
    this.$bus.$on('regetCmtyHomePosts', () => {
      //console.log('接收到了')
      this.getCmtyHomePosts(this.params)
    })
  },
  beforeDestroy() {
    this.$bus.$off('regetCmtyHomePosts')
  }
}
</script>

<style scoped lang="scss">

</style>