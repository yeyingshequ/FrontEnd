<template>
    <div class="replyContainer">
        <SubFloor parent="reply" :SubFloorInfo="commentInfo" />
    </div>
</template>
<script setup lang="ts">
import {onMounted} from 'vue'
import usePostStore from '@/store/post'
import {storeToRefs} from 'pinia'
import SubFloor from '@/components/Floor/SubFloor.vue'
const postStore = usePostStore()
let {commentInfo} = storeToRefs(postStore)

onMounted(() => {
    //console.log('回复信息:', replies)
})
</script>
<style lang="scss" scoped>
$iconPartWidth: 90px;
$containerWidth: 698px;
.replyContainer {
    width: 100%;
    //border-bottom: 1px solid #f1f1f1;

    .replyWrapper {
        display: flex;
        cursor: pointer;

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

        .replyPart {
            position: relative;
            width: 100%;
            border-bottom: 1px solid #f1f1f1;

            .postMenu {
                position: absolute;
                top: 10px;
                right: 10px;
            }

            .replyInfo {
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

            .reply {
                padding-right: 20px;
                margin-top: -10px;
                .replyto {
                    display: inline-block;
                    margin-left: 5px;
                    margin-right: 5px;
                    color: $regularFont;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
