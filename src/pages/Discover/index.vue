<template>
    <div>
        <PostCard v-if="discoverPostCardList" :postCardList="discoverPostCardList" />
    </div>
</template>
<script setup lang="ts">
import {onMounted} from 'vue'
import usePostStore from '@/store/post'
import {storeToRefs} from 'pinia'
import {useRoute} from 'vue-router'
const route = useRoute()
const postStore = usePostStore()
let {discoverPostCardList} = storeToRefs(postStore)
console.log('discoverPostCardList:', discoverPostCardList)

function reqGetDiscoverPostCard() {
    postStore.getPostCard({
        type: 'discover',
        userId: undefined
    })
}
onMounted(() => {
    reqGetDiscoverPostCard()
})
</script>

<style scoped lang="scss">
.post {
    border-bottom: 1px solid #f1f1f1;
    transition: 0.1s;

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
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
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
        padding-left: 15px;
        padding-right: 15px;
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
