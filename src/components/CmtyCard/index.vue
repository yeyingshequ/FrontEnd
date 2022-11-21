<template>
  <div class="Joined">
<<<<<<< HEAD
    <div class="community" v-for="community in cmtyList" :key="community.cmtyId" @click="$router.push(`/c/${community.cmtyId}`)">
      <div class="userIcon">
        <div>
          <img :src="community.cmtyAvatar||'https://i.pinimg.com/564x/ba/5e/67/ba5e6704f5805a32f036b382265d71a4.jpg'" alt="">
=======
    <div
      v-for="community in cmtyList"
      :key="community.cmtyId"
      @click="$router.push(`/c/${community.cmtyId}`)"
      class="community"
    >
      <div class="userIcon">
        <div>
          <img
            :src="
              cmtyAvatar ||
              'https://i.pinimg.com/564x/ba/5e/67/ba5e6704f5805a32f036b382265d71a4.jpg'
            "
            alt=""
          />
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
        </div>
      </div>
      <div class="aboutCommunity">
        <div class="nameAndInfo">
          <div class="communityName">
            <div class="name">
              <span>{{ community.cmtyName }}吧</span>
            </div>
            <div class="hot">
              <i class="iconfont icon-redu"></i>
              <span>{{ community.cmtyHots }}</span>
            </div>
          </div>
          <div class="membersAndComments">
            <div class="members">
              <span class="number">{{ community.cmtyJoinedCount }}</span>
              <span class="unit">关注者</span>
            </div>
            <div class="comments">
              <span class="number">{{ community.cmtyPostsCount }}</span>
              <span class="unit">发言量</span>
            </div>
          </div>
        </div>
        <div class="introduction">{{ community.cmtyBio }}</div>
      </div>
      <div class="joinAndFavorite">
<<<<<<< HEAD
        <button class="goFavorite"><i class="iconfont icon-shoucang" style="font-size: 16px;"></i></button>
=======
        <button class="goFavorite">
          <i class="iconfont icon-shoucang" style="font-size: 16px"></i>
        </button>
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
        <button class="goJoin">加 入</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Community',
<<<<<<< HEAD
  props: ['cmtyList']
=======
  props: ['cmtyList'],
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
}
</script>
<style scoped lang="scss">
.Joined {
  position: relative;

<<<<<<< HEAD

  .community {
    position: relative;
=======
  &:hover {
    background-color: mix(#ff44aa, white, 10%);
  }

  .community {
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
    display: flex;
    width: 100%;
    height: 100%;
    border-bottom: 1px #f6f6f6 solid;
    cursor: pointer;
    /* background-color: aqua; */
<<<<<<< HEAD
    &:hover {
      background-color: mix(#ff44aa, white, 10%);
    }
=======
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708

    .userIcon {
      display: flex;
      justify-content: center;
      align-items: center;
<<<<<<< HEAD
      height: 90px;
      width: 100px;
      /*           background-color: blueviolet; */

      div {
        width: 60px;
        height: 60px;
        /* background-color: red; */

        img {
          width: inherit;
          height: inherit;
=======
      height: 80px;
      width: 90px;
      /*           background-color: blueviolet; */

      div {
        width: 50px;
        height: 50px;
        /* background-color: red; */

        img {
          width: 50px;
          height: 50px;
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
          border-radius: 50%;
        }
      }
    }

    .aboutCommunity {
      position: relative;
      margin-top: 15px;
<<<<<<< HEAD
      margin-left: 10px;
=======
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708

      height: 100%;
      /* background-color: darkblue; */

      .nameAndInfo {
        /* background-color: pink; */
        height: 50px;

        .communityName {
          display: flex;
          height: 25px;

          .name {
            margin-right: 20px;
<<<<<<< HEAD

=======
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
            span {
              font-size: large;
              font-weight: bold;
            }
          }

          .hot {
            color: #e50404;
<<<<<<< HEAD

            i {
              margin-right: 5px;
            }

=======
            i {
              margin-right: 5px;
            }
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
            span {
              font-size: 16px;
              color: #606266;
              font-weight: normal;
            }
          }
        }

        .membersAndComments {
          display: flex;
          align-items: baseline;
          height: 24px;

          /* background-color: crimson; */
          .members {
            margin-right: 15px;
          }

          .number {
            margin-right: 5px;
            font-size: 14px;
            font-weight: 550;
          }

          .unit {
            font-size: 14px;
            color: $regularFont;
          }
        }
      }

      .introduction {
        margin-bottom: 15px;
        /* background-color: blueviolet; */
      }
    }
<<<<<<< HEAD

=======
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
    .joinAndFavorite {
      position: absolute;
      right: 40px;
      top: 21px;

      /* background-color: steelblue; */
<<<<<<< HEAD
      .goFavorite, .goJoin {
=======
      .goFavorite,
      .goJoin {
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
        height: 35px;
        outline: none;
        border: 0;
        border-radius: 50px;
        cursor: pointer;
<<<<<<< HEAD

        &:hover {
          background-color: mix($brandColor, black, 10%);
        }
      }

=======
        &:hover {
          background-color: mix($brandColor, black, 90%);
        }
      }
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
      .goJoin {
        padding: 0 16px;
        font-size: 16px;
        background-color: $brandColor;
        color: white;
        font-weight: bold;
        vertical-align: middle;
        text-align: center;
<<<<<<< HEAD
        transition: .1s;
=======
        transition: 0.1s;
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708

        &:hover {
          background-color: mix($brandColor, black, 90%);
        }
      }
<<<<<<< HEAD

=======
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
      .goFavorite {
        width: 35px;
        color: $regularFont;
        background-color: white;
        border: 1px $placeholderFont solid;
        margin-right: 20px;
<<<<<<< HEAD
        transition: .1s;

        &:hover {
          background-color: mix($brandColor, white, 50%);
=======
        transition: 0.1s;

        &:hover {
          background-color: $onHover;
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
        }

        .el-icon-chat-round {
          font-size: 20px;
        }
      }
    }
  }
<<<<<<< HEAD

}
</style>
=======
}
</style>
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
