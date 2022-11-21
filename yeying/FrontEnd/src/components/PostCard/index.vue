<template>
  <div>
    <div  class="post" v-for="post in postList" :key="post.postId" @click="$router.push(`/p/${post.postId}`)">
      <!-- 用户信息、帖子更新时间 -->
      <div class="userInfo">
        <div class="iconWrapper">
          <div class="icon">
            <img :src="post.avatar">
          </div>
        </div>
        <div class="user">
          <div class="userName">
            <span>{{ post.username}}</span>
          </div>
          <div class="updateTime">
            <span>{{ post.updateTime }}</span>
          </div>
        </div>
      </div>
      <!-- 标题和正文 -->
      <div class="TitleAndContent">
        <div class="title">
          <h4>{{ post.postTitle }}</h4>
        </div>
        <div class="content">
          <span>{{ post.content }}</span>
        </div>
        <!-- 图片 -->
        <div v-if="post.images" :class="{
            imgDisplay:post.imgSrc.length ==1,
            twoImgDisplay:post.imgSrc.length== 2,
            threeImgDisplay:post.imgSrc.length== 3,
        }">
          <div class="img" v-for="img in post.imgSrc" :key="post.imgSrc.id">
            <img :src="img.img">
          </div>
        </div>
      </div>
      <Tools />
    </div>
  </div>
</template>
<script>
export default {
  name: "PostCard",
  data() {
    return {
      imgHeight: 0,
      screenWidth: 0,
    };
  },
  props: [
    "postList"
  ],
  mounted() {
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.bannerHeight = 600 / 1550 * this.screenWidth;
    };
  },
}
</script>

<style scoped lang="scss">

.post {
  border-bottom: 1px solid #f1f1f1;
  transition: .1s;
  cursor: pointer;

  &:hover {
    background-color: mix(#ff44aa, white, 10%);
  }

  .userInfo {
    display: flex;
    align-items: center;
    height: 70px;
    width: 100%;

    /* background-color: chartreuse; */

    .iconWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      height: 70px;

      /* background-color: pink; */
      .icon {

        width: 50px;
        height: 50px;

        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
    }

    .user {
      height: 50px;

      /* background-color: blueviolet; */
      .userName {
        line-height: 25px;
        height: 25px;

        span {
          font-weight: bold;
        }
      }

      .updateTime {

        height: 25px;

        span {
          line-height: 25px;
          color: $regularFont;
        }
      }
    }
  }

  .TitleAndContent {
    padding-left: 20px;
    padding-right: 20px;
    height: 100%;
    width: 100%;

    /* background-color: firebrick; */
    .title {
      font-weight: bold;
    }

    .content {
      margin-top: 10px;
    }

    .imgDisplay {
      font-size: 0;
      display: inline-block;
      margin-top: 10px;
      border-radius: 20px;
      overflow: hidden;

      .img {
        img {
          max-width: 550px;
          max-height: 550px;
        }
      }
    }

    .twoImgDisplay, .threeImgDisplay {
      font-size: 0;
      display: inline-block;
      margin-top: 10px;
      border-radius: 20px;
      overflow: hidden;
      box-sizing: content-box;
      border: 1px solid #f1f1f1;

      .img {
        display: inline-block;
        margin-left: 3px;

        &:first-child {
          margin-left: 0;
        }

        img {
          width: 216px;
          height: 216px;
          object-fit: cover;
        }
      }
    }


  }


}

</style>
