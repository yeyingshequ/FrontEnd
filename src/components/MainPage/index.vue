<template>
  <div class="box">
    <div class="wrapper">
      <div class="borderline"></div>
      <div class="Mainpart" ref="viewPage" style="height: 100%">
        <router-view></router-view>
      </div>
      <Nav></Nav>
    </div>
  </div>
</template>
<script setup lang="ts">
import Nav from '@/components/MainPage/Nav/index.vue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';
let showLogout = ref(true)

function isNotShowLogout(e: any) {
  console.log(e)
}
</script>
<style scoped lang="scss">
.box {
  width: 1000px;

  .wrapper {
    padding-top: 60px;

    /* background-color: green; */
    .borderline {
      position: fixed;
      height: 100%;
      width: 700px;
      //background-color: rebeccapurple;
      border-left: 1px solid #f1f1f1;
      border-right: 1px solid #f1f1f1;
    }

    .Mainpart {
      position: relative;
      width: 700px;
      /* height: 100%; */
      /* background: red; */
      border: 1px #f1f1f1 solid;
      border-top: 0;
      border-bottom: 0;
    }
  }
}
</style>