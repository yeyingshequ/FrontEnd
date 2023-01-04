<template>
  <div>
    <router-link to="/p" class="container">
      <div class="post" v-for="(post, index) in postCardList" :key="post.postId">
        <!-- 用户信息、帖子更新时间 -->
        <div class="iconWrapper">
          <div class="icon">
            <img :src="post.icon">
          </div>
        </div>
        <div class="infoAndContent">
          <div class="userInfo">
            <div class="user">
              <div class="userName">
                <span>{{ post.name }}</span>
                <span class="updateTime">{{ post.updateTime }}</span>
              </div>
            </div>
          </div>
          <!-- 标题和正文 -->
          <div class="content">
            <div class="title">
              <h4>{{ post.post.postTitle }}</h4>
            </div>
            <div class="bodyText" v-show="post.bodyText">
              <span>{{ post.bodyText }}</span>
            </div>
            <!-- 图片 -->
            <div :class="{
            imgDisplay:post.imgSrc.length ==1,
            twoImgDisplay:post.imgSrc.length== 2,
            threeImgDisplay:post.imgSrc.length== 3,
            }">
              <div class="img" v-for="img in post.imgSrc" :key="post.imgSrc.id">
                <img :src="img.img">
              </div>
            </div>
          </div>
          <Tools/>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "PostII",
  data() {
    return {
      imgHeight: 0,
      screenWidth: 0,
    };
  },
  props: [
    "postCardList"
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
.container {

  .post {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
    transition: .1s;
    cursor: pointer;

    &:hover {
      background-color: mix(#ff44aa, white, 10%);
    }

    .iconWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      height: 70px;
      /*background-color: pink;*/

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

    .infoAndContent {
      width: 608px;
      height: 100%;

      .userInfo {
        display: flex;
        align-items: center;
        height: 70px;
        width: 100%;
        /*background-color: chartreuse;*/

        .user {
          height: 50px;

          /* background-color: blueviolet; */
          .userName {
            line-height: 25px;
            height: 25px;

            span {
              font-weight: bold;
            }
            .updateTime {
              margin-left: 10px;
              line-height: 25px;
              color: $regularFont;
              font-weight: normal;
            }
          }
        }
      }

      .content {
        margin-top: -30px;
        padding-right: 20px;
        height: 100%;
        width: 100%;

        /* background-color: firebrick; */
        .title {
          font-weight: bold;
        }

        .bodyText {
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

          .img {
            display: inline-block;
            margin-left: 3px;

            &:first-child {
              margin-left: 0;
            }

            img {

              width: 190px;
              height: 190px;
              object-fit: cover;
            }
          }
        }


      }
    }


  }
}
</style>