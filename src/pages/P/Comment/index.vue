<template>
  <div class="commentContainer">
    <div class="commentWrapper" v-for="comment in comments" :key="comment.commentId">
      <div class="iconPart">
        <div class="iconWrapper">
          <img
              :src="comment.avatar"
              alt="">
        </div>
      </div>
      <div class="commentPart">
        <div class="commentInfo">
          <div class="name">
            <span>{{ comment.username}}</span>
          </div>
          <div class="timeAndFloor">
            <div class="floor">
              <span>{{ comment.floor }}楼</span>
            </div>
            <div class="dot">
              <span>·</span>
            </div>
            <span class="pubTime">{{comment.pubTime}}</span>
          </div>
        </div>
        <div class="comment">
          <span>{{comment.content}}</span>
          <div class="reply">
            <Reply :commentInfo="comment"/>
          </div>
        </div>
        <Tools :postInfo="postInfo" :commentInfo="comment" father="Comment"/>
      </div>
    </div>
  </div>
</template>
<script>
import Reply from '../Reply/index.vue';

export default {
  name: "Comment",
  props: ['postInfo'],
  components: {Reply},
  computed:{
    post(){
      return this.postInfo.post
    },
    comments(){
      return this.postInfo.comments
    },
  },
  mounted(){
    console.log(this.comments[0])
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/css/variable.scss';

$iconPartWidth: 90px;
$containerWidth: 698px;

.commentContainer {
  width: $viewPageWidth;
  //border-bottom: 1px solid #f1f1f1;


  .commentWrapper{
    display: flex;
    cursor: pointer;
    &:hover {
      background-color: mix(#ff44aa, white, 10%);
    }
    .iconPart {
      width: $iconPartWidth;
      /* background-color: yellowgreen; */

      .iconWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 70px;
        /* background-color: blue; */

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;

        }
      }
    }
    .commentPart {
      width: ($containerWidth - $iconPartWidth);
      border-bottom: 1px solid #f1f1f1;
      .commentInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 70px;
        width: 100%;

        .name, .timeAndFloor {
          height: 25px;

          /* background-color: red; */
          span {
            line-height: 25px;
          }
          .floor{
            margin-right: 7px;
          }
          .pubTime{
            margin-left: 7px;
          }
        }

        .name {
          span {
            font-weight: bold;
            color: $mainFont;
          }
        }

        .timeAndFloor {
          display: flex;
          span {
            color: $regularFont;
          }
        }
      }

      .comment {
        padding-right: 20px;
      }
    }
  }
}
</style>