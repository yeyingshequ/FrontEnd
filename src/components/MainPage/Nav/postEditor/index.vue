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
                <div class="community">
                    <select id="sel" name="cmtyId" v-model="params.cmtyId">
                        <option value="1">switch</option>
                    </select>
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
import {onMounted, reactive, ref} from 'vue'
import {useRoute} from 'vue-router'
import useMainStore from '@/store/index'
import usePostStore from '@/store/post'
const postStore = usePostStore()
const mainStore = useMainStore()
const route = useRoute()

let params = reactive({
    postTitle: '',
    content: '',
    cmtyId: ''
})
let message = ref('')

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
    if (result.message == '发帖成功') {
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
                postStore.getCmtyPosts({cmtyId: route.params.cmtyId})
                break
        }
    }
}

onMounted(() => {
    scroll.stop()
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
    background-color: rgba(mix($brandColor, black, 10%), 0.5);
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

        .submit {
            position: relative;
            padding-top: 10px;

            button {
                position: absolute;
                right: 10px;
                height: 40px;
                padding: 0 20px;
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
