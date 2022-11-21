<template>
  <div>
    <CmtyCard :cmtyList="favoriteCmtyInfo" />
  </div>
</template>
<script>
import CmtyCard from '@/components/CmtyCard/index.vue'
import rename from '@/tools/rename'
import {getFavoriteCmty} from '@/api'
import storage from '@/tools/storage'
export default {
  components: {CmtyCard},
  data() {
    return {
      favoriteCmtyInfo: {},
    }
  },
  methods: {
    async getFavoriteCmty() {
      let result = await getFavoriteCmty()
      if (result.status == 0) {
        result = result.data
        for (let i = 0; i < result.length; i++) {
          result[i] = rename.toHump(result[i])
        }
        this.favoriteCmtyInfo = result
      }
    },
  },
  mounted() {
    //如果没有登录就跳转到社区广场
    if (!storage.get('token')) {
      this.$router.push('/communities/square/全部')
    }
    this.getFavoriteCmty()
  },
}
</script>
<style scoped lang="scss"></style>
