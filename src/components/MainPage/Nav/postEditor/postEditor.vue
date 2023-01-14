<template>
    <div class="editorContainer">
        <div class="editorWrapper">
            <div class="close" @click="close">
                <i class="iconfont icon-guanbi1"></i>
            </div>
            <div class="text">
                <div class="top">
                    <div class="iconWrapper">
                        <img src="@/images/1_BigPic.png" alt="" />
                    </div>
                    <input
                        v-model="params.postTitle"
                        class="title"
                        placeholder="可以在这里输入标题"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
                <div class="content">
                    <textarea
                        v-model="params.content"
                        placeholder="正文"
                        name=""
                        id=""
                        cols="52"
                        rows="9"
                    ></textarea>
                </div>
                <div class="chooseCommunity" @click="showCmtyList = !showCmtyList">
                    <span>{{ cmtyName || '选择社区' }}</span>
                    <span v-if="cmtyName">吧</span>
                </div>
                <div class="cmtyList" v-if="showCmtyList == true">
                    <div class="mask" @click="showCmtyList = !showCmtyList"></div>
                    <div class="hideScrollBar">
                        <div class="cmtyBox">
                            <div
                                v-for="cmty in joinedCmtyCardList"
                                :key="cmty.cmtyId"
                                @click="setCmty(cmty.cmtyId, cmty.cmtyName)"
                            >
                                <span>{{ cmty.cmtyName }}吧</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="submit">
                    <button type="submit" @click="reqSendPost(params)">发 帖</button>
                    {{ message }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import scroll from '@/tools/scroll'
import {sendPost} from '@/api/index'
import {computed, onMounted, reactive, ref} from 'vue'
import {useRoute} from 'vue-router'
import useMainStore from '@/store/index'
import usePostStore from '@/store/post'
import useCmtyStore from '@/store/community'
const cmtyStore = useCmtyStore()
const postStore = usePostStore()
const mainStore = useMainStore()
const route = useRoute()
let joinedCmtyCardList = computed(() => {
    return cmtyStore.joinedCmtyCardList
})
let params = reactive({
    postTitle: '',
    content: '',
    cmtyId: 0
})
let message = ref('')

let showCmtyList = ref(false)
let cmtyName = ref('')
function setCmty(id: number, name: string) {
    showCmtyList.value = false
    cmtyName.value = name
    params.cmtyId = id
}
function close() {
    mainStore.showPostEditor = false
    scroll.move()
    message.value = ''
}
async function reqSendPost(params: {}) {
    console.log(params)
    let result = await sendPost(params)
    message.value = result.message
    //关闭编辑器
    if (result.message == '发送成功') {
        postStore.formatPostCard(result)
        setTimeout(() => {
            close()
            message.value = ''
        }, 1000)
        switch (route.matched[0].path) {
            case '/home':
                postStore.getHomePostCard()
                break
            case '/discover':
                postStore.getDiscoverPostCard()
                break
            case '/communities':
                postStore.getCmtyPosts({cmtyId: Number(route.params.cmtyId)})
                break
        }
    }
}

onMounted(() => {
    scroll.stop()
    cmtyStore.getJoinedCmty()
    //console.log(route)
})
</script>

<style scoped lang="scss">
.editorContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(mix($brandColor, black, 10%), 0.3);
    z-index: 998;

    .editorWrapper {
        position: relative;
        width: 700px;
        height: 410px;
        padding: 20px;
        border-radius: 20px;
        background-color: white;

        .close {
            position: absolute;
            display: flex;
            top: 10px;
            left: 10px;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            transition: 0.1s;
            cursor: pointer;

            i {
                font-size: 25px;
            }

            &:hover {
                background-color: mix($brandColor, white, 15%);
            }
        }

        .text {
            margin-left: 20px;
            margin-top: 20px;

            .top {
                display: flex;

                .iconWrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 70px;
                    height: 70px;

                    img {
                        height: 50px;
                        width: 50px;
                        border-radius: 50%;
                    }
                }

                .title {
                    color: $mainFont;
                    height: 70px;
                    width: 550px;
                    margin-left: 10px;
                    padding-left: 10px;
                    font-size: 20px;
                    font-weight: bold;
                    outline: none;
                    border: 0;
                    border-bottom: 1px solid #f1f1f1;
                }
            }

            .content {
                margin-top: 10px;
                //background-color: red;
                margin-left: 80px;
                border-bottom: 1px solid #f1f1f1;

                textarea {
                    color: $regularFont;
                    padding-left: 10px;
                    font-family: inherit;
                    font-size: 19px;
                    resize: none;
                    outline: none;
                    border: 0;
                }
            }
        }
        .chooseCommunity {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: 17px;
            left: 120px;
            //width: 80px;
            height: 26px;
            padding: 0 7px;
            border: $brandColor solid 1px;
            border-radius: 50px;
            cursor: pointer;
            transition: 0.1s;
            &:hover {
                background-color: $onHover;
            }
            span {
                font-size: 15px;
                line-height: 20px;
                font-weight: bold;
                color: $brandColor;
            }
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
                position: absolute;
                top: 120px;
                left: 30px;
                //width: 200px;
                //height: 280px;
                background-color: white;
                border-radius: 20px;
                box-shadow: 0 0 10px 1px rgb(255, 199, 230);
                overflow: hidden;
                z-index: 4;

                div {
                    display: flex;
                    align-items: center;
                    height: 40px;
                    width: 100%;
                    cursor: pointer;
                    &:hover {
                        background-color: $onHover;
                    }
                    span {
                        font-weight: bold;
                        padding: 0 40px;
                    }
                }
            }
        }

        .submit {
            position: absolute;
            right: 20px;
            bottom: 50px;
            //padding-top: px;

            button {
                position: absolute;
                right: 10px;
                height: 40px;
                width: 90px;
                //padding: 0 20px;
                font-size: 20px;
                font-weight: bold;
                color: white;
                border-radius: 50px;
                outline: none;
                border: 0;
                background-color: $brandColor;
                cursor: pointer;
            }
        }
    }
}
</style>
