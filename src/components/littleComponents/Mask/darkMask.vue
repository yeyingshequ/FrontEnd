<template>
    <div></div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
div {
    @extend .flexCentreGSC;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(mix($brandColor, black, 10%), 0.5);
    z-index: 900;
}
</style>
