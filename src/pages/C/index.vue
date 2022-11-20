<template>
  <div>
    <div class="cover"></div>
    <div class="profile" v-if="message !== '获取信息成功'">
      <div class="iconWrapper">
        <div class="icon">
          <img :src="defaultAvatar" alt="" />
        </div>
      </div>
      <div class="uncreatedCmty">
        <h1>{{ message }}</h1>
      </div>
      <div class="addCmty">
        <button @click="showCreateCmty = true">创建社区</button>
      </div>
    </div>
    <div class="profile" v-if="message == '获取信息成功'">
      <div class="iconWrapper">
        <div class="icon">
          <img :src="cmtyInfo.avatar || defaultAvatar" alt="" />
        </div>
      </div>
      <div class="aboutBar">
        <div class="name">
          <span>{{ cmtyInfo.cmtyName }}吧</span>
        </div>
        <div class="membersAndComments">
          <div class="members">
            <span class="number">{{ cmtyInfo.cmtyJoinedCount }}</span>
            <span class="unit"> 成员</span>
          </div>
          <div class="comments">
            <span class="number">{{ cmtyInfo.cmtyPostCount }}</span>
            <span class="unit"> 发言量</span>
          </div>
        </div>
      </div>
      <div class="introduction">
        <span>{{ cmtyInfo.cmtyBio }}</span>
      </div>
      <div class="joinAndFavorite">
        <button class="favorite">
          <i class="iconfont icon-shoucang" style="font-size: 16px"></i>
        </button>
        <button class="join">加 入</button>
      </div>
    </div>
    <Tab :tabs="tabs" v-if="message == '获取信息成功'" />
    <!-- <div class="board">
        <ul>
            <li>
                <span>派送专区</span>
            </li>
            <li>
                <span>交换专区</span>
            </li><li>
                <span>咨询专区</span>
            </li><li>
                <span>公告专区</span>
            </li><li>
                <span>交流专区</span>
            </li><li>
                <span>吧主推荐</span>
            </li>
        </ul>
    </div> -->
    <router-view></router-view>
    <CmtyCreator @closeCmtyCreator="closeCmtyCreator" v-if="showCreateCmty" />
  </div>
</template>
<script>
import Post from '../../components/PostCard/index.vue'
import CmtyCreator from '@/pages/C/CmtyCreator'
import {getCmtyInfo} from '@/api'
import storage from '@/tools/storage'
import CmtyHome from '@/pages/C/CmtyHome'

export default {
  name: 'C',
  data() {
    return {
      tabs: [
        {Name: '首页', id: 1, router: '/communities/joined'},
        {Name: '精品贴', id: 2, router: '/communities/favorite'},
        {Name: '本吧详情', id: 3, router: '/communities/square'},
      ],
      params: {
        cid: this.$route.params.cid,
      },
      cmtyInfo: {},
      defaultAvatar:
        'https://i.pinimg.com/564x/ba/5e/67/ba5e6704f5805a32f036b382265d71a4.jpg',
      defaultCover:
        'https://i.pinimg.com/564x/ba/5e/67/ba5e6704f5805a32f036b382265d71a4.jpg',
      message: '',
      showCreateCmty: false,
    }
  },
  methods: {
    async getCmtyInfo(params) {
      let result = await getCmtyInfo(params)
      this.cmtyInfo = result.data
      this.message = result.message
      //console.log(this.message)
      //console.log(result)
    },
    closeCmtyCreator() {
      this.showCreateCmty = false
    },
  },
  mounted() {
    this.getCmtyInfo(this.params)
    console.log(this.cmtyInfo)
  },
  components: {
    CmtyHome,
    Post,
    CmtyCreator,
  },
}
</script>
<style scoped lang="scss">
div {
  .cover {
    width: 100%;
    height: 233px;
    background-image: url(@/images/communityBackground.jpg);
  }

  .profile {
    position: relative;
    width: 100%;
    height: 110px;

    .uncreatedCmty {
      padding: 100px 189px;
    }

    .addCmty {
      padding: 0 289px;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        padding: 20px;
        font-size: 20px;
        outline: none;
        border: 0;
        color: white;
        background-color: $brandColor;
        border-radius: 50px;
        font-weight: bold;
        cursor: pointer;
      }
    }

    /* background-color: blue; */
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

    .aboutBar {
      position: absolute;
      top: 0;
      left: 200px;
      width: 560px;
      height: 75px;

      /* background-color: crimson; */
      .name {
        display: flex;
        align-items: center;
        height: 45px;

        span {
          font-size: 24px;
        }
      }

      .membersAndComments {
        display: flex;
        align-items: baseline;
        height: 37px;
        line-height: 30px;

        /* background-color: crimson; */
        .members {
          margin-right: 15px;
        }

        .number {
          font-weight: 550;
        }

        .members,
        .comments {
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
    }

    .introduction {
      position: absolute;
      top: 80px;
      left: 20px;

      span {
        color: $regularFont;
      }
    }

    .joinAndFavorite {
      position: absolute;
      top: 17.5px;
      right: 30px;

      .favorite,
      .join {
        height: 40px;
        outline: none;
        border: 0;
        border-radius: 50px;
        cursor: pointer;
      }

      .favorite {
        width: 40px;
        color: $regularFont;
        background-color: white;
        border: 1px #c0c4cc solid;
        margin-right: 20px;
      }

      .join {
        padding: 0 20px;
        background-color: $brandColor;
        color: white;
        font-size: 15px;
        font-weight: bold;
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
