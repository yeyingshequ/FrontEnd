<template>
  <div class="userInfoContainer" v-if="showUpdateInfo=true" >
    <div class="wrapper">
      <div class="top">
        <div class="close"  @click="close">
          <i class="iconfont icon-guanbi1"></i>
        </div>
        <h2>编辑个人信息</h2>
        <div class="save">
        <span>
          保 存
        </span>
        </div>
      </div>
      <div class="cover">
        <img src="@/images/二次元壁纸樱花.jpg" alt="">
      </div>
      <div class="icon">

        <div class="iconWrapper">
          <div class="mask"></div>
          <img src="@/images/1_BigPic.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scroll from "@/tools/scroll";

export default {
  name: "updateUserInfo",
  data(){
    return{
    }
  },
  methods:{
    close(){
      console.log(this)
      this.$emit('closeUpdate')
      scroll.move()
    }
  },
  mounted() {
    scroll.stop();
  }
}
</script>

<style scoped lang="scss">
.userInfoContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(mix($brandColor,black,10%),.7);
  z-index: 997;
  .wrapper{
    position: relative;

    width: 606px;
    height: 500px;
    background-color: white;
    border: 1px solid #f1f1f1;
    border-radius: 20px;
    padding: 2px;
    .top{
      width: 600px;
      height: 60px;
      .close{
        position: absolute;
        display: flex;
        top: 10px;
        left: 10px;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: .3s;
        cursor: pointer;
        i{
          font-size: 20px;
          font-weight: bold;
        }
        &:hover{
          background-color: mix($brandColor,white,10%);
        }
      }
      h2{
        position: absolute;
        top: 10px;
        left: 80px;
        line-height: 40px;
        font-size: 20px;
        font-weight: bold;
      }
      .save{
        position:absolute;
        display: flex;
        align-items: center;
        right: 20px;
        top: 10px;
        height: 40px;
        padding: 20px;
        background-color:$brandColor;
        border-radius: 50px;
        cursor: pointer;
        span{
          color: white;
          font-weight: bold;
        }
      }
    }
    .cover{
      height: 200px;
      width:600px;
      background-color: #99a9bf;
      overflow: hidden;
      img{
        width: 600px;
      }
    }
    .icon{
      position: relative;
      width: 100%;
      height: 70px;
      //background-color: blue;

      .iconWrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 20px;
        top: -53px;
        width: 106px;
        height: 106px;
        background-color: white;
        border-radius: 50%;
        .mask{
          position: absolute;
          width: 100px;
          height: 100px;
          z-index: 2;
          border-radius: 50%;
          cursor: pointer;
          transition: .1s;
        }
        img{
          position: absolute;
          width: 100px;
          height: 100px;
          background-color: red;
          z-index: 1;
          border-radius: 50%;
          cursor: pointer;
        }
        &:hover .mask{
          background-color: rgba($onHoverDark,.1);
        }
      }
    }


  }
}
</style>