<template>
    <div ref="component">
        <PostCard parent="homePost" :postCardList="homePostCardList" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import formatTime from '@/tools/formatTime'
import PostCard from '@/components/Cards/PostCard/index.vue'
import {onBeforeUnmount, onMounted, onUnmounted, ref} from 'vue'

import emitter from '@/tools/mitt'
import usePostStore from '@/store/post'
const postStore = usePostStore()
let {homePostCardList} = storeToRefs(postStore)
//console.log('homePostCardList:', homePostCardList.value)
async function reqGetHomePostCard() {
    postStore.getPostCard({type: 'home'})
}
emitter.on('regetHomeInfo', () => {
    reqGetHomePostCard()
})
emitter.off('regetHomeInfo')

onMounted(() => {
    reqGetHomePostCard()
})
</script>

<style scoped lang="scss">
.post {
    border-bottom: 1px solid #f1f1f1;
    transition: 0.1s;
    cursor: pointer;

    &:hover {
        background-color: mix(#ff44aa, white, 10%);
    }

    .userInfo {
        display: flex;
        align-items: center;
        height: 70px;
        width: 100%;

        /* background-color: chartreuse; */

        .iconWrapper {
            @extend .flexCentreGSC;
            width: 90px;
            height: 70px;

            /* background-color: pink; */
            .icon {
                width: 50px;
                height: 50px;

                img {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .user {
            height: 50px;

            /* background-color: blueviolet; */
            .userName {
                line-height: 25px;
                height: 25px;

                span {
                    font-weight: bold;
                }
            }

            .updateTime {
                height: 25px;

                span {
                    line-height: 25px;
                    color: $regularFont;
                }
            }
        }
    }

    .content {
        padding-left: 20px;
        padding-right: 20px;
        height: 100%;
        width: 100%;

        /* background-color: firebrick; */
        .title {
            font-weight: bold;
        }

        .bodyText {
            margin-top: 10px;
        }

        .block {
            margin-top: 10px;

            .el-carousel__item h3 {
                color: #475669;
                font-size: 14px;
                opacity: 0.75;
                line-height: 150px;
                margin: 0;

                img {
                    width: 100%;
                }
            }

            .el-carousel__item:nth-child(2n) {
                background-color: #99a9bf;
            }

            .el-carousel__item:nth-child(2n + 1) {
                background-color: #d3dce6;
            }
        }
    }

    .tools {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 40px;
        /* background-color: hotpink; */

        div {
            color: $regularFont;

            i {
                font-size: 20px;
            }

            span {
                font-size: 16px;
                position: relative;
                top: -0.03rem;
                margin-left: 3px;
            }
        }
    }
}
</style>
