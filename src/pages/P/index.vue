<template>
  <div class="container">
    <div class="top">
      <div class="return">
        <i class="iconfont icon-fanhui" @click="back"></i>
      </div>
      <div class="bar" @click="$router.push(`/c/${post.cmtyId}`)">
        <div class="icon">
          <img src="@/images/barIcon.jpg" alt="">
        </div>
        <div class="barName" @click="$router.push(`/c/${postInfo.post.cmtyId}`)">
          <span>{{ post.cmtyName }}吧</span>
        </div>
      </div>
    </div>
    <Poster :postInfo="postInfo"/>
    <Comment :postInfo="postInfo"/>
  </div>
</template>
<script>
import Poster from './Post/index.vue';
import Comment from './Comment/index.vue';
import {getPostInfo} from "@/api";
import moment from "moment";
import formatTime from "@/tools/formatTime";
import rename from "@/tools/rename";

export default {
  components: {Poster, Comment},
  data() {
    return {
      postInfo: {},
      params: {
        pid: this.$route.params.pid
      },
      toolInfo: {},
      showEditor: false
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    async getPostInfo(params) {
      let result = await getPostInfo(params)
      if (result.status === 0) {
        result = result.data
        result.post = rename.toHump(result.post)
        /**********************转为驼峰命名***********************/
        let comments = result.comments
        for (let i = 0; i < comments.length; i++) {
          comments[i] = rename.toHump(comments[i])
          for (let j = 0; j < comments[i].replies.length; j++) {
            comments[i].replies[j]=rename.toHump(comments[i].replies[j])
          }
        }
        /**********************格式化时间***********************/
        result.post.pubTime = formatTime(result.post.pubTime)
        for (let i = 0; i < result.comments.length; i++) {
          result.comments[i].pubTime = formatTime(result.comments[i].pubTime)
          for (let j = 0; j < result.comments[i].replies.length; j++) {
            result.comments[i].replies[j].pubTime = formatTime(result.comments[i].replies[j].pubTime)
          }
        }
        /*****************result赋值到postInfo******************/
        console.log(result)
        this.postInfo = result
      }
    }
  },
  computed: {
    post() {
      return this.postInfo.post
    }
    ,
    comments() {
      return this.postInfo.comments
    }
    ,

  }
  ,
  mounted() {
    this.getPostInfo(this.params)

    //发送评论和回复后重新获取数据
    this.$bus.$on('regetPostInfo', () => {
      //console.log('接收到了')
      this.getPostInfo(this.params)
    })
  },
  beforeDestroy() {
    this.$bus.$off('regetPostInfo')
  }
}
</script>
<style scoped lang="scss">
.container {
  .top {
    position: relative;
    display: flex;
    /* background-color: orangered; */
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #f1f1f1;

    .return {

      i {
        position: absolute;
        line-height: 50px;
        top: 0;
        left: 20px;
        font-size: 35px;
        cursor: pointer;
      }
    }

    .bar {
      padding-left: 5px;
      padding-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      border-radius: 50px;
      cursor: pointer;

      /* background-color: blueviolet; */
      &:hover {
        background-color: mix(#ff44aa, white, 10%);
      }

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
        width: 30px;
        height: 30px;
        /* background-color: red; */

        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }

      }

      .barName {
        span {
          line-height: 35px;
        }
      }
    }
  }
}
</style>