<script setup lang="ts">
import Head from '@/components/Head/index.vue'
import MainPage from '@/components/MainPage/index.vue'
import LoginAndRegister from '@/components/LoginAndRegister/index.vue'
import useMainStore from '@/store/index'
import {watch} from 'vue'
import scroll from './tools/scroll'
const mainStore = useMainStore()
</script>
<template>
    <div class="app">
        <Head></Head>
        <MainPage :key="mainStore.mainPageKey"></MainPage>
        <!-- <div class="bg"></div> -->
    </div>
</template>

<style lang="scss">
/* 初始化 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: 0;
}

body {
    position: relative;
    //overflow-y: scroll;
    overflow-x: hidden;
    font-family: Arial;
    -webkit-tap-highlight-color: transparent;
    padding-left: calc(100vw - 100%);
}

/* a标签初始化 */
a {
    text-decoration: none;
    color: #303133;
}

.post .articlePart img {
    margin-top: 15px;
    width: 80%;
    height: 80%;
    border-radius: 20px;
}

.app {
    @extend .flexCentreGSC;
}
/* ::-webkit-scrollbar {
    display: none;
} */
/* 背景图片样式 */

//.vue-html5-editor [contenteditable='true']:empty:before {
//    content: attr(placeholder);
//    width: inherit;
//    height: inherit;
//    color: grey;
//    display: block;
//}
//解决谷歌浏览器记住密码——导致Input组件出现特殊样式的修改
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    -webkit-text-fill-color: $mainFont !important; //这个地方的颜色是字体颜色，可以根据实际情况修改
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important; //设置input输入框的背景颜色为透明色
    background-color: transparent; //设置input输入框的背景颜色为透明色
    background-image: none;
    transition: background-color 50000s ease-in-out 0s;
}

input {
    background-color: transparent; //设置input输入框的背景颜色为透明色
}
</style>
