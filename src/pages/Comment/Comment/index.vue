<template>
    <div class="container">
        <MainFloor :MainFloorInfo="commentInfo" parent="comment" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {computed, onMounted, reactive, ref} from 'vue'
import PostMenu from '@/components/PostMenu/index.vue'
import usePostStore from '@/store/post'
import {toRichText} from '@/tools/postTools'
import {useRoute, useRouter} from 'vue-router'
import Tools from '@/components/Tools/index.vue'
import formatTime from '@/tools/formatTime'
import useMainStore from '@/store/index'
import MainFloor from '@/components/Floor/MainFloor.vue'
const router = useRouter()
const mainStore = useMainStore()
const props = defineProps(['commentInfo'])
const route = useRoute()
const postStore = usePostStore()
let {commentInfo} = storeToRefs(postStore)
onMounted(() => {
    //console.log('route:', route.name)
    //console.log(route.params)
    //console.log('commentMain:', commentInfo.value)
})
</script>
<style scoped lang="scss">
.container {
    .poster {
        //padding-top: 10px;
        border-bottom: 1px solid #f1f1f1;
        transition: 0.1s;
        cursor: pointer;

        &:hover:not(:has(.menu)) {
            background-color: mix($brandColor, white, 10%);
        }

        .userInfo {
            position: relative;
            display: flex;
            align-items: center;
            height: 90px;
            width: 100%;

            .postMenu {
                position: absolute;
                top: 10px;
                right: 10px;
            }

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
                    color: $mainFont;
                    line-height: 25px;
                    height: 25px;

                    span {
                        font-weight: bold;
                    }
                }

                .timeAndFloor {
                    display: flex;
                    line-height: 25px;

                    .floor {
                        margin-right: 7px;

                        span {
                            color: $regularFont;
                        }
                    }

                    .dot {
                        span {
                            color: $regularFont;
                        }
                    }

                    .updateTime {
                        margin-left: 7px;

                        span {
                            line-height: 25px;
                            color: $regularFont;
                        }
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
                color: $mainFont;
                font-weight: bold;
            }

            .bodyText {
                margin-top: 10px;
                color: $mainFont;
                word-break: break-all;
                :deep(p) {
                    margin-bottom: 20px;
                }
            }

            .imgDisplay {
                font-size: 0;
                display: inline-block;
                margin-top: 10px;
                /* border-radius: 20px; */
                overflow: hidden;

                /* .img {

             img{
                border-radius: 20px;
                max-width: 550px;
                max-height: 550px;
            }
        } */

                img {
                    border-radius: 15px;
                    max-width: 550px;
                    max-height: 550px;
                    border: 1px solid $borderColor1;
                }
            }
        }

        .toolWrapper {
            width: calc(100% - 90px);
            margin-left: 90px;
        }
    }
}
</style>
