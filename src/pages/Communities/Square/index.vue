<template>
  <div class="Square">
    <div class="category">
      <div v-for="(category, index) in categoryList" :key="category.name" @click="$router.push(`/communities/square/${category.name}`) "
           :class="{active:category.name==$route.params.category}">{{ category.name }}
      </div>
    </div>
    <div class="list">
      <CmtyCard  :cmtyList="squareInfo" />
    </div>
  </div>

</template>
<script>
import {getCmtySquareInfo} from "@/api";
import rename from "@/tools/rename";

export default {

  name: "Square",
  data() {
    return {
      categoryList: [{name: '全部', id: 1}, {name: '游戏', id: 2}, {name: '数码', id: 3}, {name: '科学', id: 4}, {
        name: '动漫', id: 5}, {name: '音乐', id: 6}, {name: '休闲时尚', id: 7}, {name: '文学', id: 8}, {name: '校园', id: 9}, {name: '明星', id: 10}, {name: '网友俱乐部', id: 11}, {name: '个人社区', id: 12}, {name: '情感', id: 13}],
      squareInfo:{}
    }
  },
  methods: {
    async getCmtySquareInfo(params){
      let result = await getCmtySquareInfo(params)
      if (result.status == 0){
        result = result.data
        for (let i = 0; i < result.length; i++) {
          result[i] = rename.toHump(result[i])
        }
        this.squareInfo = result


      }
    }
  },
  components: {
  },
  watch:{
    $route(){
      this.getCmtySquareInfo(this.$route.params)
    }
  },
  mounted() {
<<<<<<< HEAD
    this.$router.push('/communities/square/全部')
=======
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
    this.getCmtySquareInfo(this.$route.params)
  }
}
</script>
<style scoped lang="scss">
.Square {
  display: flex;

  .category {
    flex: 1;
    height: 100vmax;
    border-right: 1px solid #f1f1f1;

    /* background-color: blueviolet; */
    div {
      font-size: 15px;
      line-height: 40px;
      padding-left: 15px;
      height: 40px;
      transition: .1s;
      cursor: pointer;

      &:hover {
        background-color: mix(#ff44aa, white, 10%);

      }
    }

    .active {
      font-weight: bold;
      /* color: #ff44aa; */
<<<<<<< HEAD
      background-color: mix(#ff44aa, white, 20%);
=======
      background-color: mix(#ff44aa, white, 10%);
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
    }

  }

  .list {
    flex: 6;
    /* background-color: blue; */
  }
}
</style>