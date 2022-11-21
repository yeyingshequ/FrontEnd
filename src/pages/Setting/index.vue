<template>
  <div class="settingContainer">
    <div class="settingList">
      <div class="sections">
        <div class="selection"
             v-for="(setting,index) in settingList"
             @click="$router.push(`/setting/${setting.path}`)"
        >
          <span>{{ setting.name }}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="detail">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      settingList: [
        {name: '修改密码', path: 'password'},
        {name: '账号信息', path: 'account'},
      ]
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
.settingContainer {
  .settingList {
    position: fixed;
    display: flex;
    width: 200px;
    border-right: 1px solid #f1f1f1;
    height: 100vh;

    .sections {
      width: inherit;
      .selection {
        position: relative;
        width: inherit;
        height: 50px;
        padding: 0 20px;
        cursor: pointer;

        &:hover {
          background-color: $onHover;
        }

        span {
          font-size: 17px;
          line-height: 50px;
        }

        i {
          position: absolute;
          font-size: 20px;
          right: 20px;
          line-height: 50px;
        }
      }
    }


  }

}
</style>