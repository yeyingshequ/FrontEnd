<template>
  <div class="profile">
    <div class="userInfo">
      <div class="userInfoWrapper">
        <!--登录后的个人信息框-->
        <div class="userInfoWrapperInside" v-if="isLogin" @click="$router.push(`/u/${userInfo.userId}`).catch(data=>{})">
          <div class="userIcon">
            <img :src="userInfo.avatar" alt="" class="pic">
          </div>
          <div class="userNameAndUid">
            <span class="userName">{{userInfo.username}}</span><br>
            <span class="UID">UID: {{userInfo.userId}}</span>
          </div>
          <div class="qita" @click.stop="isShowLogout=true">
            <i class="iconfont icon-qita"></i>
          </div>
        </div>
        <div class="loginAndRegister" @click="showLoginScreen" v-else>
          <div class="userIcon" @click="showLoginScreen">
            <img src="./1_BigPic.png" alt="" class="pic" @click="showLoginScreen">
          </div>
          <div class="message">
            登 录 或 注 册
          </div>
        </div>
      </div>
    </div>
    <!--退出、切换账号 选项-->
    <div class="logoutFn" v-show="isShowLogout">
      <div class="mask" @click="isShowLogout=false"></div>
      <div class="logoutWrapper animate__animated animate__fadeIn" key="1">
        <div class="triangle"></div>
        <div class="userLogout" @click="goLogout">
              <span>
                退出账号
              </span>
        </div>
      </div>
    </div>
    <div class="usernav">
      <router-link v-for="(nav, index) in navList" :key="nav.id" :to="nav.path" class='navRouter'
                   :class='{ active: nav.path === currentNav }'>
        <div class="mask">
          <i :class='nav.icon'></i>
          <span>{{ nav.name }}</span>
        </div>
      </router-link>
    </div>
    <div class="sendpost" @click ='showEditor=true' >
      <div>
        <span>发 帖</span>
      </div>
    </div>
    <postEditor v-if="showEditor" @closeEditor="closeEditor"/>
    <!--回到顶部按钮-->
    <el-backtop>
      <div>
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>

import storage from "@/tools/storage";
import postEditor from "@/components/MainPage/Nav/postEditor";

export default {
  name: '',
  data() {
    return {
      navList: [
        {name: '首页', id: 1, pathName: "Home", path: '/home', icon: 'iconfont icon-shouye'},
        {name: '发现', id: 2, pathName: "Discover", path: '/discover', icon: 'iconfont icon-sousuo'},
        {name: '社区', id: 3, pathName: "Communities", path: '/communities', icon: 'iconfont icon-shequ'},
        {name: '通知', id: 4, pathName: "Ntifications", path: '/notifications', icon: 'iconfont icon-xiaoxizhongxin'},
        {name: '聊天', id: 5, pathName: "Chat", path: '/chat', icon: 'iconfont icon-wode'},
        {name: '设置', id: 6, pathName: "Setting", path: '/setting', icon: 'iconfont icon-shezhi'}],
      //isLogin: false,
      isShowLogout: false,
      showEditor:false
    }
  },
  methods: {
    showLoginScreen() {
      this.$bus.$emit('showLoginScreen', true);
    },
    goLogout() {
      this.isShowLogout = false
      storage.remove('token')
      this.$router.go(0)
    },
    getUserInfo(){
      this.$store.dispatch('reqUserInfo')
    },
    closeEditor(){
      this.showEditor=false
    }
  },
  mounted() {
    this.getUserInfo();
  },
  computed: {
    isLogin() {
      return storage.get('token')
    },
    userInfo(){
      return this.$store.state.userInfo.userInfo
    },
    currentNav(){
      return this.$route.matched[0].path
    }
  },
  components:{
    postEditor
  }
}
</script>
<style scoped lang="scss">
.profile {
  user-select: none;
  position: fixed;
  top: 60px;
  margin-left: 700px;
  width: 300px;
  height: 100%;
  z-index: 2;

  /* background-color: blue; */

  .userInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    margin-left: 20px;
    width: 100%;
    height: 85px;

    /*background-color: purple;*/
    .userInfoWrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 65px;
      width: 260px;
      border-radius: 50px;
      cursor: pointer;

      &:hover {
        background-color: $onHover;
      }

      .userInfoWrapperInside {
        position: relative;
        height: 50PX;
        width: 245PX;
        border-radius: 50px;

        .userIcon {
          position: absolute;
          left: 0;
          width: 50px;
          height: 50px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50px;
          }
        }

        /* background-color: #f91880; */
        .qita {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          top: 0;
          right: 0;
          border-radius: 50px;
          //background-color: red;
          &:hover {
            color: $brandColor;
          }
        }


        .userNameAndUid {
          position: absolute;
          left: 60px;
          width: 195px;
          height: 50px;

          .userName {
            margin-left: 10px;
            font-weight: bold;
            line-height: 25px;
          }

          .UID {
            margin-left: 10px;
            line-height: 25px;
            color: #575d68;
          }
        }
      }
    }


    .loginAndRegister {
      position: relative;
      height: 50PX;
      width: 245PX;
      border-radius: 50px;

      .userIcon {
        position: absolute;
        left: 0;
        width: 50px;
        height: 50px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50px;
        }
      }

      .message {
        position: absolute;
        left: 70px;
        font-size: 26px;
        font-weight: bold;
        line-height: 50px;


      }
    }
  }

  .logoutFn {
    .mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .logoutWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 25px;
      top: 90px;
      width: 300px;
      height: 80px;
      background-color: white;
      z-index: 2;
      border-radius: 15px;
      box-shadow: 0 0 10px 1px rgb(255, 199, 230);

      .triangle {
        position: absolute;
        top: -12px;
        height: 0;
        width: 0;
        border: 6px solid transparent;
        border-bottom: 6px solid white;
      }

      .userLogout {
        height: 50px;
        width: 100%;
        padding-left: 20px;
        cursor: pointer;

        &:hover {
          background-color: $onHover;
        }


        span {
          font-size: 15px;
          line-height: 50px;

        }
      }

    }
  }

  .usernav {
    width: 100%;
    height: 420px;

    .active {
      font-weight: bold;
      color: $brandColor;

    }

    /*background-color: blue;*/
    .navRouter {
      display: flex;
      position: relative;
      justify-content: left;
      align-items: center;
      padding-left: 40px;
      height: 70px;

      .mask {
        border-radius: 50px;
        transition: .2s;
      }

      /* background-color: yellowgreen; */
      &:first-child {
        margin-top: 5px;
      }

      &:hover .mask {
        background-color: $onHover;
      }

      i {
        vertical-align: middle;
        text-align: center
      }

      span {
        position: relative;
        margin-left: 3px;
        font-size: 20px;
        font-weight: inherit;
        padding: 0 20px 0 10px;
        line-height: 55px;
        vertical-align: middle;
        text-align: center
      }

    }

    .iconfont {
      padding-left: 10px;
      margin-left: 10px;
      margin-right: 10px;
      font-size: 30px;
      vertical-align: -2px;
    }
  }

  .sendpost {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    height: 70px;
    cursor: pointer;

    /*background-color: yellow ;*/
    div {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      width: 220px;
      background-color: $brandColor;
      /*#0080FF*/
      border-radius: 50px;
      transition: .1s;

      &:hover {
        background-color: mix($brandColor, black, 90%);
      }

      span {
        position: absolute;
        font-weight: bold;
        font-size: 20px;
        color: #ffffff;
        padding: 0 30px;
        line-height: 60px;
      }
    }

  }

  .el-backtop{
    position: absolute;
    top:800px;
    left: 40px;
    div{
      height: 100%;
      width: 100%;
      background-color: #f2f5f6;
      box-shadow: 0 0 6px rgba(0,0,0, .12);
      text-align: center;
      line-height: 40px;
      color: $brandColor;
    }
  }


}
</style>