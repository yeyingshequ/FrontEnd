<script setup lang="ts">
import Head from '@/components/Head/index.vue'
import MainPage from '@/components/MainPage/index.vue'
import LoginAndRegister from '@/components/LoginAndRegister/index.vue'
</script>
<template>
    <div class="app">
        <LoginAndRegister></LoginAndRegister>
        <Head></Head>
        <MainPage></MainPage>
        <!-- <div class="bg"></div> -->
    </div>
</template>

<style lang="scss">
/* 初始化 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    overflow-y: scroll;
    overflow-x: hidden;
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
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 背景图片样式 */
.bg {
    position: fixed;
    left: 0;
    top: 60px;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url(@/components/MainPage/background.png) no-repeat;
    background-size: cover;
}

//.vue-html5-editor [contenteditable='true']:empty:before {
//    content: attr(placeholder);
//    width: inherit;
//    height: inherit;
//    color: grey;
//    display: block;
//}

/* 暗幕 */
.onhover {
    background-color: mix(#ff44aa, white, 10%);
}

.beforehover {
    background-color: mix(#ff44aa, white, 0%);
    transition: 0.1s;
}
</style>
