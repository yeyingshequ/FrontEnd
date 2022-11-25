<template>
  <div>
    <div class="cover">

    </div>
    <!-- 当搜索的用户不存在时,展示这个 -->
    <div class="uncreated" v-if="message=='这是一个不存在的用户'">
      <div class="iconWrapper">
        <div class="icon">
          <img :src="defaultAvatar" alt="">
        </div>
      </div>
      <h1>{{message}}</h1>
    </div>

    <div class="profile" v-if="status==0">
      <div class="iconWrapper">
        <div class="icon">
          <img :src="userInfo.avatar||defaultAvatar" alt="">
        </div>
      </div>
      <div class="aboutUser">
        <div class="name">
          <span>{{ userInfo.username }}</span>
        </div>
        <div class="uid">
          UID: {{ userInfo.userId }}
        </div>
        <div class="followshipCard">
          <div class="followers">
            <span class="number">{{ userInfo.followerCount }}</span>
            <span class="unit"> 关注者</span>
          </div>
          <div class="following">
            <span class="number">{{ userInfo.followeeCount }}</span>
            <span class="unit"> 正在关注 </span>
          </div>
        </div>
        <div class="introduction">
          <span>{{userInfo.bio}}</span>
        </div>
      </div>
      <div class="updateInfo"
           v-if="UID==$route.params.uid"
           @click="isShowUpdateInfo=true"
      >
        <span>
          编辑个人信息
        </span>
      </div>
      <div class="aboutFollow" v-if="UID!=$route.params.uid">
        <button class="chat"><i class="el-icon-chat-round" style="font-size: 16px;"></i></button>
        <button class="follow">关 注</button>
      </div>
    </div>
    <updateUserInfo v-if="isShowUpdateInfo" @closeUpdate="closeUpdateInfo"/>
    <Tab v-if="status==0" :tabs="tabs"/>
    <Post v-if="status==0" :postList="postList"/>
  </div>
</template>
<script>
import Post from '../../components/PostCard/index.vue';
import updateUserInfo from "@/pages/U/updateUserInfo";
import {getUserInfo} from "@/api";
import cookie from "@/tools/cookie";
import rename from '@/tools/rename'

export default {
  name: "U",
  data() {
    return {
      tabs: [
        {Name: "帖子", id: 1, router: "/communities/joined"},
        {Name: "评论和回复", id: 2, router: "/communities/favorite"},
        {Name: "关注的吧", id: 3, router: "/communities/square"},
      ],
      postList: [
        {
          id: 1,
          icon: require("@/pages/Home/images/白夜茶会icon.jpg"),
          name: "月夜茶會",
          updateTime: "2022-04-04",
          title: "[月夜茶会] 美少女 萌妹 软萌 卡哇伊 壁纸 头像",
          bodyText: "",
          imgSrc: [{imgId: 11, img: require("@/pages/Home/images/白色茶会2.jpg")}, {
            imgId: 12,
            img: require("@/pages/Home/images/白色茶会2.jpg")
          }]
        },
        {
          id: 2,
          icon: require("@/pages/Home/images/第二帖icon.jpg"),
          name: "萌萌的643",
          updateTime: "2022-07-02",
          title: "对战是ps上更难打上去还是实机ns更难？",
          bodyText: "总感觉ps上厉害的好多",
          imgSrc: [{imgId: 15, img: require("@/pages/Home/images/secondPOST.webp.jpg")}, {
            imgId: 13,
            img: require("@/pages/Home/images/白色茶会2.jpg")
          }, {imgId: 17, img: require("@/pages/Home/images/第二帖icon.jpg")}]
        },
        {
          id: 3,
          icon: require("@/pages/Home/images/第三贴icon.jpg"),
          name: "无奈ASL",
          updateTime: "2022-07-1",
          title: "大哥们动森怎么买",
          bodyText: "我去海鲜市场搜了下都搜不到，听说有事件被禁止了。这可怎么买卖？？？",
          imgSrc: [{imgId: 13, img: require("@/pages/Home/images/白色茶会2.jpg")}]
        }
      ],
      params: {
        uid: ''
      },
      userInfo: {},
      message: '',
      status: -1,
      isShowUpdateInfo: false,
      defaultAvatar: 'https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg',
    }
  },
  methods: {
    closeUpdateInfo() {
      this.isShowUpdateInfo = false

    },
    async getUserInfo(params) {
      let result = await getUserInfo(params)
      result.data = rename.toHump(result.data)
      this.message = result.message
      this.status = result.status
      this.userInfo = result.data
    }
  },
  mounted() {
    this.params.uid = this.$route.params.uid
    this.getUserInfo(this.params)

  },
  computed: {
    UID() {
      return cookie.getCookie('UID')
    }
  },
  components: {
    updateUserInfo, Post
  }
}
</script>
<style scoped lang="scss">
div {
  .cover {
    width: 100%;
    height: 233px;
    background-color: mix($brandColor, white, 30%);
  }

  .profile, .uncreated {

    position: relative;
    width: 100%;
    h1{
      padding:100px 189px;
    }
    .iconWrapper {
      display: flex;
      justify-content: center;
      position: absolute;
      align-items: center;
      left: 20px;
      top: -71.5px;
      width: 143px;
      height: 143px;
      background-color: white;
      border-radius: 50%;

      img {
        width: 135px;
        height: 135px;
        margin-top: 4px;
        border-radius: 50%;
      }
    }

    .aboutUser {
      padding: 0 20px;
      padding-top: 85px;


      /* background-color: crimson; */
      .name {
        display: flex;
        align-items: center;
        height: 35px;

        span {
          font-size: 20px;
          font-weight: bold;
        }
      }

      .uid {
        margin-top: -3px;
        color: $regularFont;
      }

      .followshipCard {
        display: flex;
        align-items: baseline;
        margin-top: 10px;
        height: 37px;
        line-height: 30px;

        /* background-color: crimson; */
        .followers {
          margin-right: 15px;
        }

        .number {
          font-weight: 550;
        }

        .followers, .following {
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }

        .unit {
          font-size: 16px;
          color: $regularFont;
        }
      }

      .introduction {
        margin: 10px 0;

        span {
          color: $regularFont;
        }
      }

    }

    .updateInfo {
      position: absolute;
      top: 17.5px;
      right: 30px;
      height: 40px;
      padding: 0 20px;
      background-color: white;
      border: 1px $placeholderFont solid;
      border-radius: 50px;
      cursor: pointer;
      transition: .1s;

      &:hover {
        background-color: mix($placeholderFont, white, 30%);
      }

      span {
        line-height: 40px;
        font-weight: bold;
      }
    }

    .aboutFollow {
      position: absolute;
      top: 17.5px;
      right: 30px;

      .follow, .chat {
        height: 40px;
        outline: none;
        border: 0;
        border-radius: 50px;
        cursor: pointer;
      }

      .follow {
        padding: 0 20px;
        font-size: 16px;
        background-color: $brandColor;
        color: white;
        font-weight: bold;
        vertical-align: middle;
        text-align: center;
        transition: .1s;

        &:hover {
          background-color: mix($brandColor, black, 90%);
        }
      }

      .chat {
        width: 40px;
        color: $regularFont;
        background-color: white;
        border: 1px $placeholderFont solid;
        margin-right: 20px;
        transition: .1s;

        &:hover {
          background-color: $onHover
        }

        .el-icon-chat-round {
          font-size: 20px;
        }
      }

    }
  }

  .board {
    width: 100%;
    height: 25px;

    /* background-color: yellowgreen; */
    ul {
      margin-left: 10px;

      li {
        display: inline;
        margin-right: 10px;
        color: $regularFont;
      }
    }

  }

}
</style>