<template>
    <div>
<<<<<<< HEAD
        <CmtyCard :cmtyList="joinedCmtyInfo"/>
    </div>
</template>
<script>

import rename from "@/tools/rename";
import {getJoinedCmty} from "@/api";
import storage from "@/tools/storage";
export default {
  data(){
    return{
      joinedCmtyInfo:{}
    }
  },
  methods:{
    async getJoinedCmty(){
      let result = await getJoinedCmty()
      if (result.status == 0){
        result = result.data
        for (let i = 0; i < result.length; i++) {
          result[i] = rename.toHump(result[i])
        }
        this.joinedCmtyInfo = result
      }
    }
  },
  mounted() {
    //如果没有登录就跳转到社区广场
    if (!storage.get('token')){
      this.$router.push('/communities/square/全部')
    }
      this.getJoinedCmty()
  }
=======
        <community/>
        <community/>
        <community/>
    </div>
</template>
<script>
import Community from '@/components/CmtyCard/index.vue';
export default {
    components: { Community }
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
}
</script>
<style scoped lang="scss">
</style>