<template>
  <div class="container">
    <div class="poster">
      <!-- 用户信息、帖子更新时间 -->
      <div class="userInfo">
        <div class="iconWrapper">
          <div class="icon">
            <img
              @click="$router.push(`/u/${post.postAuthorId}`)"
              :src="post.avatar"
            />
          </div>
        </div>
        <div class="user">
          <div class="userName">
            <span>{{ post.username }}</span>
          </div>

          <div class="timeAndFloor">
            <div class="floor">
              <span>1楼</span>
            </div>
            <div class="dot">
              <span>·</span>
            </div>
            <div class="updateTime">
              <span>{{ post.pubTime }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 标题和正文 -->
      <div class="content">
        <div class="title">
          <h4>{{ post.postTitle }}</h4>
        </div>
        <div class="bodyText" v-show="true /* post.bodyText */">
          <span>{{ post.content }}</span>
        </div>
        <!-- 图片 -->
        <div class="imgDisplay" v-if="post.images">
          <!-- <div class="img" v-for="img in post.imgSrc" :key="post.imgSrc.id">
                  <img :src="img.img">
              </div> -->
          <img
            src="http://tiebapic.baidu.com/forum/w%3D580/sign=cf8c755d4a2442a7ae0efdade141ad95/317a5d6034a85edfdc6cb1fd0c540923df5475d3.jpg?tbpicau=2022-09-13-05_b504e610ca6b9278056a027ae639b5e6"
            alt=""
          />
          <img
            src="http://tiebapic.baidu.com/forum/w%3D580/sign=1cec70bbf619ebc4c0787691b224cf79/3c7e32fa828ba61ecd0e87f10434970a324e59d3.jpg?tbpicau=2022-09-13-05_42183b52d3b18f0602cc1a2363feec50"
            alt=""
          />
        </div>
      </div>
      <div class="toolWrapper">
        <Tools :postInfo="postInfo" father="post" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Poster',
  props: ['postInfo'],
  data() {
    return {
      params: {
        uid: '23',
      },
    }
  },
  methods: {},
  computed: {
    post() {
      return this.postInfo.post
    },
    comments() {
      return this.postInfo.comments
    },
  },
  mounted() {},
}
</script>
<style scoped lang="scss">
.container {
  .poster {
    border-bottom: 1px solid #f1f1f1;
    transition: 0.1s;
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
          color: $mainFont;
          line-height: 25px;
          height: 25px;

          span {
            font-weight: bold;
          }
        }

        .timeAndFloor {
          display: flex;
          line-height: 25px;

          .floor {
            margin-right: 7px;

            span {
              color: $regularFont;
            }
          }

          .dot {
            span {
              color: $regularFont;
            }
          }

          .updateTime {
            margin-left: 7px;

            span {
              line-height: 25px;
              color: $regularFont;
            }
          }
        }
      }
    }

    .content {
      padding-left: 20px;
      padding-right: 20px;
      height: 100%;
      width: 100%;

      /* background-color: firebrick; */
      .title {
        color: $mainFont;
        font-weight: bold;
      }

      .bodyText {
        margin-top: 10px;
        color: $mainFont;
      }

      .imgDisplay {
        font-size: 0;
        display: inline-block;
        margin-top: 10px;
        /* border-radius: 20px; */
        overflow: hidden;

        /* .img {

             img{
                border-radius: 20px;
                max-width: 550px;
                max-height: 550px;
            }
        } */

        img {
          border-radius: 15px;
          max-width: 550px;
          max-height: 550px;
          border: 1px solid $borderColor1;
        }
      }
    }

    .toolWrapper {
      width: 608px;
      margin-left: 90px;
    }
  }
}
</style>
