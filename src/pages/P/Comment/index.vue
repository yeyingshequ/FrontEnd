<template>
    <div class="commentContainer">
        <SubFloor parent="post" :SubFloorInfo="postInfo" />
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {computed, onMounted, provide} from 'vue'
import PostMenu from '@/components/PostMenu/index.vue'
import usePostStore from '@/store/post'
import Tools from '@/components/Tools/index.vue'
import formatTime from '@/tools/formatTime'
import {toRichText} from '@/tools/postTools'
import {sendComment} from '@/api'
import useMainStore from '@/store/index'
import SubFloor from '@/components/Floor/SubFloor.vue'
const mainStore = useMainStore()
const postStore = usePostStore()
let {postInfo} = storeToRefs(postStore)

let comments = computed(() => {
    return postInfo.value.comment
})
//console.log('comments:', comments)
</script>
<style scoped lang="scss">
@import '@/assets/css/variable.scss';

.commentContainer {
    width: 100%; //border-bottom: 1px solid #f1f1f1;

    .commentWrapper {
        display: flex;
        cursor: pointer;
        width: 100%;
        &:hover:not(:has(.menu)) {
            background-color: mix(#ff44aa, white, 10%);
        }

        .iconPart {
            flex-shrink: 0;
            width: 90px;
            /* background-color: yellowgreen; */

            .iconWrapper {
                @extend .flexCentreGSC;
                width: 100%;
                height: 90px;
                /* background-color: blue; */

                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
            }
        }

        .commentPart {
            position: relative;
            width: 100%;
            border-bottom: 1px solid #f1f1f1;
            display: flex;
            padding-right: 20px;

            .postMenu {
                position: absolute;
                top: 10px;
                right: 10px;
            }
            .commentInfoContainer {
                width: 100%;
                .commentInfo {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 90px;
                    width: 100%;

                    .name,
                    .timeAndFloor {
                        height: 25px;

                        /* background-color: red; */
                        span {
                            line-height: 25px;
                        }

                        .floor {
                            margin-right: 7px;
                        }

                        .pubTime {
                            margin-left: 7px;
                        }
                    }

                    .name {
                        span {
                            font-weight: bold;
                            color: $mainFont;
                        }
                    }

                    .timeAndFloor {
                        display: flex;

                        span {
                            color: $regularFont;
                        }
                    }
                }

                .comment {
                    margin-top: -10px;
                    word-break: break-all;
                    :deep(p) {
                        margin-bottom: 15px;
                    }
                }
            }
        }
    }
}
</style>
