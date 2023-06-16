<template>
    <div class="chooseCommunity" ref="chooseCommunity" @click="showCmtyList = true">
        <span v-if="cmtyName">{{ cmtyName + '吧' }}</span>
        <span v-else>选择社区</span>
        <div class="cmtyList" v-show="showCmtyList == true">
            <div class="mask" @click.stop="showCmtyList = !showCmtyList"></div>
            <div class="cmtyBox" ref="cmtyBox">
                <el-scrollbar max-height="340">
                    <div
                        class="item"
                        v-if="editorCmtyCardList.length"
                        v-for="cmty in editorCmtyCardList"
                        :key="cmty.cmtyId"
                        @click.stop="setCmty(cmty.cmtyName, cmty.cmtyId)"
                    >
                        <span>{{ cmty.cmtyName }}吧</span>
                    </div>
                </el-scrollbar>
            </div>
            <div v-if="!editorCmtyCardList.length" class="inputCmty">
                <input v-model="inputCmtyName" type="text" placeholder="请输入社区名字" />
                <button @click.stop="setCmty(inputCmtyName)">
                    确 认<!-- <el-icon class="elIcon"><Search /></el-icon> -->
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {nextTick, onMounted, reactive, ref, watch} from 'vue'
import useCmtyStore from '@/store/community'
import {useRoute} from 'vue-router'
import usePostStore from '@/store/post'
import useUserStore from '@/store/user'
const userStore = useUserStore()
const postStore = usePostStore()
const route = useRoute()
const cmtyStore = useCmtyStore()
let chooseCommunity = ref()
let cmtyBox = ref()
let showCmtyList = ref(false)
let cmtyName = ref('')
let inputCmtyName = ref('')
let {editorCmtyCardList} = storeToRefs(cmtyStore)
let emit = defineEmits(['setCmty'])
async function reqGetEditorCmty() {
    if (userStore.myInfo.userId) {
        cmtyStore.getCmtyCard({type: 'editor'})
    }
}
function setCmty(name: string, id?: number) {
    showCmtyList.value = false
    cmtyName.value = name
    params.cmtyId = id || 0
    params.cmtyName = name
    emit('setCmty', params)
    //console.log('关闭')
    showCmtyList.value = false
    //console.log(showCmtyList.value)
}
let params = reactive({
    cmtyId: 0,
    cmtyName: ''
})
watch(
    route,
    () => {
        nextTick(() => {
            if (route.matched[0]?.name == 'C') {
                cmtyName.value = cmtyStore.cmtyInfo.cmtyName
                params.cmtyId = cmtyStore.cmtyInfo.cmtyId
                params.cmtyName = cmtyStore.cmtyInfo.cmtyName
            } else if (route.matched[0]?.name == 'P') {
                cmtyName.value = postStore.postInfo.cmtyName
                params.cmtyId = postStore.postInfo.cmtyId
                params.cmtyName = postStore.postInfo.cmtyName
            } else if (route.matched[0]?.name == 'Comment') {
                cmtyName.value = postStore.commentInfo.cmtyName
                params.cmtyId = postStore.commentInfo.cmtyId
                params.cmtyName = postStore.commentInfo.cmtyName
            }
            emit('setCmty', params)
        })
    },
    {immediate: true}
)
onMounted(() => {
    reqGetEditorCmty()
})
</script>
<style lang="scss" scoped>
.chooseCommunity {
    @extend .flexCentreGSC;
    position: relative;
    max-width: 125px;
    height: 26px;
    padding: 0 7px;
    border: $brandColor solid 1px;
    border-radius: 50px;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        background-color: $onHover;
    }
    .cmtyList {
        .mask {
            position: fixed;
            //background-color: #ff44aa;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
            cursor: auto;
        }
        .cmtyBox {
            //min-width: 200px;
            //width: 238px;
            max-height: 400px;
            position: absolute;
            background-color: white;
            border-radius: 20px;
            box-shadow: 0 0 10px 1px rgb(255, 199, 230);
            overflow-y: scroll;
            overflow-x: hidden;
            left: 50%;
            transform: translateX(-50%);
            bottom: 30px;
            z-index: 4;
            :deep(.el-scrollbar__thumb) {
                //可设置滚动条颜色
                background: $brandColor;
            }
            .item {
                display: flex;
                align-items: center;
                height: 40px;
                width: 100%;
                cursor: pointer;
                transition: 0.2s;
                max-width: 250px;
                &:hover:not(:has(.chooseCommunity:hover)) {
                    background-color: $onHover;
                }
                span {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    //display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    font-weight: bold;
                    padding: 0 40px;
                }
                input {
                    height: 100%;
                    width: 175px;
                    padding-left: 30px;
                    padding-right: 10px;
                    font-weight: bold;
                    color: $mainFont;
                    font-size: 16px;
                }

                button {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    cursor: pointer;
                    background-color: white;
                    &:hover {
                        background-color: $onHover;
                    }
                    .elIcon {
                        font-size: 21px;
                    }
                }
            }
        }
        //隐藏滚动条,但是可以滚动
        .cmtyBox::-webkit-scrollbar {
            display: none;
        }
        .inputCmty {
            @extend .flexCentreGSC;
            flex-direction: column;

            width: 250px;
            height: 110px;
            position: fixed;
            left: 50%;
            top: 300px;
            transform: translate(-50%, -50%);
            z-index: 4;
            background-color: white;
            box-shadow: 0 0 10px 1px rgb(255, 199, 230);
            border-radius: 20px;

            border: 1px solid #f1f1f1;
            input {
                width: 80%;
                height: 40px;
                border-radius: 50px;
                padding: 0 20px;
                font-weight: bold;
                font-size: 15px;
                border: solid 1px #f1f1f1;
                margin-bottom: 10px;
            }
            button {
                height: 30px;
                padding: 0 20px;
                background-color: $brandColor;
                border-radius: 50px;
                color: white;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
    > span {
        font-size: 15px;
        line-height: 20px;
        font-weight: bold;
        color: $brandColor;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-weight: bold;
    }
}
</style>
