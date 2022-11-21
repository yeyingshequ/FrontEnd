<template>
  <div class="Joined">
    <div
      class="community"
      v-for="community in cmtyList"
      :key="community.cmtyId"
      @click="$router.push(`/c/${community.cmtyId}`)"
    >
      <div class="userIcon">
        <div>
          <img
            :src="
              community.cmtyAvatar ||
              'https://i.pinimg.com/564x/ba/5e/67/ba5e6704f5805a32f036b382265d71a4.jpg'
            "
            alt=""
          />
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
        <button class="goFavorite">
          <i class="iconfont icon-shoucang" style="font-size: 16px"></i>
        </button>
        <button class="goJoin">加 入</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Community',
  props: ['cmtyList'],
}
</script>
<style scoped lang="scss">
.Joined {
  position: relative;

  .community {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    border-bottom: 1px #f6f6f6 solid;
    cursor: pointer;
    /* background-color: aqua; */
    &:hover {
      background-color: mix(#ff44aa, white, 10%);
    }

    .userIcon {
      display: flex;
      justify-content: center;
      align-items: center;
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
          border-radius: 50%;
        }
      }
    }

    .aboutCommunity {
      position: relative;
      margin-top: 15px;
      margin-left: 10px;

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
            span {
              font-size: large;
              font-weight: bold;
            }
          }

          .hot {
            color: #e50404;

            i {
              margin-right: 5px;
            }

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
    .joinAndFavorite {
      position: absolute;
      right: 40px;
      top: 21px;

      /* background-color: steelblue; */
      .goFavorite,
      .goJoin {
        height: 35px;
        outline: none;
        border: 0;
        border-radius: 50px;
        cursor: pointer;

        &:hover {
          background-color: mix($brandColor, black, 10%);
        }
      }

      .goJoin {
        padding: 0 16px;
        font-size: 16px;
        background-color: $brandColor;
        color: white;
        font-weight: bold;
        vertical-align: middle;
        text-align: center;
        transition: 0.1s;

        &:hover {
          background-color: mix($brandColor, black, 90%);
        }
      }
      .goFavorite {
        width: 35px;
        color: $regularFont;
        background-color: white;
        border: 1px $placeholderFont solid;
        margin-right: 20px;
        transition: 0.1s;

        &:hover {
          background-color: mix($brandColor, white, 50%);
        }

        .el-icon-chat-round {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
