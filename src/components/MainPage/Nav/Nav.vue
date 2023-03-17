<template>
    <div class="profile regularLayout">
        <div class="userInfo">
            <div class="userInfoWrapper">
                <!--登录后的个人信息框-->
                <div
                    class="userInfoWrapperInside"
                    v-if="isLogin"
                    @click="$router.push(`/u/${myInfo.userId}`).catch((data) => {})"
                >
                    <div class="userIcon">
                        <img :src="myInfo.avatar" alt="" class="pic" />
                    </div>
                    <div class="userNameAndUid">
                        <span class="userName">{{ myInfo.username }}</span
                        ><br />
                        <span class="UID">UID: {{ myInfo.userId }}</span>
                    </div>
                    <div class="qita" @click.stop="showLogout = true">
                        <i class="iconfont icon-qita"></i>
                    </div>
                </div>
                <div class="loginAndRegister" @click="reqShowLoginScreen" v-else>
                    <div class="userIcon" @click="reqShowLoginScreen">
                        <img
                            src="https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg"
                            alt=""
                            class="pic"
                            @click="reqShowLoginScreen"
                        />
                    </div>
                    <div class="message">登 录 或 注 册</div>
                </div>
            </div>
        </div>
        <!--退出、切换账号 选项-->

        <div class="logoutFn">
            <div class="mask" v-show="showLogout" @click="showLogout = false"></div>
            <transition
                name="animate__animated animate__bounce"
                enter-active-class="animate__fadeIn"
                leave-active-class="animate__fadeOut"
            >
                <div v-show="showLogout" class="logoutWrapper animate__faster">
                    <div class="triangle"></div>
                    <div class="userLogout" @click="goLogout">
                        <span> 退出账号 </span>
                    </div>
                </div>
            </transition>
        </div>

        <div class="usernav">
            <div
                v-for="(nav, index) in navList"
                :key="nav.id"
                class="navRouter"
                :class="{active: nav.path === currentNav}"
                @click="junpNav(nav.path)"
            >
                <div class="mask">
                    <i :class="nav.icon"></i>
                    <span>{{ nav.name }}</span>
                </div>
            </div>
            <!--更多导航-->
            <div class="navRouter" @click="showMoreNav = true">
                <div class="mask">
                    <i class="iconfont icon-gengduo"></i>
                    <span>更多</span>
                </div>
            </div>
            <MoreNav v-if="showMoreNav" />
        </div>
        <div class="sendpost" @click="showPostEditor = true">
            <div>
                <span>发 帖</span>
            </div>
        </div>
        <postEditor v-if="showPostEditor" />
        <!--回到顶部按钮-->
        <el-backtop>
            <div>UP</div>
        </el-backtop>
    </div>
    <div class="profile smallLayout">
        <div class="userInfo">
            <div class="userInfoWrapper">
                <!--登录后的个人信息框-->
                <div
                    class="userInfoWrapperInside"
                    v-if="isLogin"
                    @click="$router.push(`/u/${myInfo.userId}`).catch((data) => {})"
                >
                    <div class="userIcon">
                        <img :src="myInfo.avatar" alt="" class="pic" />
                    </div>
                </div>
                <div class="loginAndRegister" @click="reqShowLoginScreen" v-else>
                    <div class="userIcon" @click="reqShowLoginScreen">
                        <img
                            src="https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg"
                            alt=""
                            class="pic"
                            @click="reqShowLoginScreen"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="usernav">
            <div
                v-for="(nav, index) in navList"
                :key="nav.id"
                class="navRouter"
                :class="{active: nav.pathName === currentNav}"
                @click="junpNav(nav.path)"
            >
                <div class="mask">
                    <i :class="nav.icon"></i>
                </div>
            </div>
            <!--更多导航-->
            <div class="navRouter" @click="showMoreNav = true">
                <div class="mask">
                    <i class="iconfont icon-gengduo"></i>
                </div>
            </div>
            <MoreNav v-if="showMoreNav" />
        </div>
        <div class="sendpost" @click="showPostEditor = true">
            <div><i class="iconfont icon-chuangzuo"></i></div>
        </div>
        <postEditor v-if="showPostEditor" />
        <!--回到顶部按钮-->
        <el-backtop>
            <div>UP</div>
        </el-backtop>
    </div>
</template>

<script setup lang="ts">
import 'animate.css'
import postEditor from '@/components/MainPage/Nav/postEditor/postEditor.vue'
import {computed, onMounted, ref, watch} from 'vue'
import {RouterLink, useRoute, useRouter} from 'vue-router'
import useMainStore from '@/store/index'
import {storeToRefs} from 'pinia'
import storage from '@/tools/storage'
import cookie from '@/tools/cookie'
import useUserStore from '@/store/user'
import {ElBacktop} from 'element-plus'
import MoreNav from '@/components/MoreNav/index.vue'
import pinia from '@/store/store'
const userStore = useUserStore()
const mainStore = useMainStore()
const router = useRouter()
const route = useRoute()

interface list {
    name: string
    id: number
    path: string
    pathName: string
    icon: string
}
const navList: list[] = [
    {
        name: '首页',
        id: 1,
        pathName: 'Home',
        path: '/home',
        icon: 'iconfont icon-shouye'
    },
    {
        name: '发现',
        id: 2,
        pathName: 'Discover',
        path: '/discover',
        icon: 'iconfont icon-sousuo'
    },
    {
        name: '社区',
        id: 3,
        pathName: 'Communities',
        path: '/communities',
        icon: 'iconfont icon-shequ'
    },
    {
        name: '通知',
        id: 4,
        pathName: 'Ntifications',
        path: '/notifications',
        icon: 'iconfont icon-xiaoxizhongxin'
    },
    {
        name: '聊天',
        id: 5,
        pathName: 'Chat',
        path: '/chat',
        icon: 'iconfont icon-wode'
    }
    /*{
    name: '设置',
    id: 6,
    pathName: 'Setting',
    path: '/setting',
    icon: 'iconfont icon-shezhi',
  }*/
]
//展示 退出/
let {showLogout, showPostEditor, showLoginScreen, showMoreNav} = storeToRefs(mainStore)
//展示登录用户信息
let {myInfo} = storeToRefs(userStore)
//判断是否登录
let isLogin = computed(() => {
    return storage.get('token')
})

//当前的路由地址
let currentNav = ref('')
watch(route, (nv: any, ov: any) => {
    currentNav.value = nv.name
})

//跳转路由
function junpNav(path: string) {
    router.push(path)
}

//展示登录框
function reqShowLoginScreen() {
    mainStore.showLoginScreen = true
}
//退出登录
function goLogout() {
    showLogout.value = false
    storage.remove('token')
    cookie.removeCookie('UID')
    router.go(0)
}
//获取登录用户信息
function reqGetUserInfo() {
    userStore.getMyInfo()
}

onMounted(() => {
    console.log('route:', route)
    reqGetUserInfo()
})
</script>
<style scoped lang="scss">
.profile {
    user-select: none;
    position: fixed;
    top: 60px;
    margin-left: 700px;
    width: 300px;
    height: 100%;
    z-index: 2;

    /* background-color: blue; */

    .userInfo {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
        margin-left: 20px;
        width: 100%;
        height: 85px;

        /*background-color: purple;*/
        .userInfoWrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 65px;
            width: 260px;
            border-radius: 50px;
            cursor: pointer;

            &:hover {
                background-color: $onHover;
            }

            .userInfoWrapperInside {
                position: relative;
                height: 50px;
                width: 245px;
                border-radius: 50px;

                .userIcon {
                    position: absolute;
                    left: 0;
                    width: 50px;
                    height: 50px;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50px;
                    }
                }

                /* background-color: #f91880; */
                .qita {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 36px;
                    height: 36px;
                    top: 7px;
                    right: 7px;
                    border-radius: 50px;
                    //background-color: red;
                    transition: 0.1s;

                    &:hover {
                        color: $brandColor;
                        background-color: $button;
                    }
                }

                .userNameAndUid {
                    position: absolute;
                    left: 60px;
                    width: 195px;
                    height: 50px;

                    .userName {
                        margin-left: 10px;
                        font-weight: bold;
                        line-height: 25px;
                    }

                    .UID {
                        margin-left: 10px;
                        line-height: 25px;
                        color: #575d68;
                    }
                }
            }
        }

        .loginAndRegister {
            position: relative;
            height: 50px;
            width: 245px;
            border-radius: 50px;

            .userIcon {
                position: absolute;
                left: 0;
                width: 50px;
                height: 50px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50px;
                }
            }

            .message {
                position: absolute;
                left: 70px;
                font-size: 26px;
                font-weight: bold;
                line-height: 50px;
            }
        }
    }

    .logoutFn {
        .mask {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .logoutWrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 25px;
            top: 90px;
            width: 300px;
            height: 80px;
            background-color: white;
            z-index: 2;
            border-radius: 15px;
            box-shadow: 0 0 10px 1px rgb(255, 199, 230);

            .triangle {
                position: absolute;
                top: -12px;
                height: 0;
                width: 0;
                border: 6px solid transparent;
                border-bottom: 6px solid white;
            }

            .userLogout {
                height: 50px;
                width: 100%;
                padding-left: 20px;
                cursor: pointer;

                &:hover {
                    background-color: $onHover;
                }

                span {
                    font-size: 15px;
                    line-height: 50px;
                }
            }
        }
    }

    .usernav {
        width: 100%;

        .active {
            font-weight: bold;
            color: $brandColor;
        }

        /*background-color: blue;*/
        .navRouter {
            display: flex;
            position: relative;
            justify-content: left;
            align-items: center;
            padding-left: 40px;
            height: 70px;
            cursor: pointer;

            .mask {
                border-radius: 50px;
                transition: 0.2s;
            }

            /* background-color: yellowgreen; */
            &:first-child {
                margin-top: 5px;
            }

            &:hover .mask {
                background-color: $onHover;
            }

            i {
                vertical-align: middle;
                text-align: center;
            }

            span {
                position: relative;
                margin-left: 3px;
                font-size: 20px;
                font-weight: inherit;
                padding: 0 20px 0 10px;
                line-height: 55px;
                vertical-align: middle;
                text-align: center;
            }
        }

        .iconfont {
            padding-left: 10px;
            margin-left: 10px;
            margin-right: 10px;
            font-size: 30px;
            vertical-align: -2px;
        }
    }

    .sendpost {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        width: 100%;
        height: 70px;
        cursor: pointer;

        /*background-color: yellow ;*/
        div {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
            width: 220px;
            background-color: $brandColor;
            /*#0080FF*/
            border-radius: 50px;
            transition: 0.1s;

            &:hover {
                background-color: mix($brandColor, black, 90%);
            }

            span {
                position: absolute;
                font-weight: bold;
                font-size: 20px;
                color: #ffffff;
                padding: 0 30px;
                line-height: 60px;
            }
        }
    }

    .el-backtop {
        position: absolute;
        top: 800px;
        left: 40px;

        div {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: $brandColor;
        }
    }
}
//
@media (max-width: 1000px) {
    .regularLayout {
        display: none;
    }
    .smallLayout {
        width: 100px;

        .userInfo {
            margin-left: 0;
            .userInfoWrapper {
                width: 65px;
                .userInfoWrapperInside {
                    position: relative;
                    height: 50px;
                    width: 50px;
                    border-radius: 50px;
                }
                .loginAndRegister {
                    position: relative;
                    height: 50px;
                    width: 50px;
                    border-radius: 50px;
                }
            }
        }
        .usernav {
            display: flex;
            flex-direction: column;
            align-items: center;
            .navRouter {
                padding-left: 0px;
                .mask {
                    width: 55px;
                    height: 55px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50px;
                    transition: 0.2s;
                }
            }
            .iconfont {
                padding-left: 0;
                margin-left: 0px;
                margin-right: 0px;
                font-size: 30px;
                vertical-align: -2px;
            }
        }
        .sendpost {
            margin-top: 0;

            div {
                width: 55px;
                height: 55px;
            }
            .iconfont {
                padding-left: 0;
                margin-left: 0px;
                margin-right: 0px;
                font-size: 30px;
                vertical-align: -2px;
                //font-weight: bold;
                color: white;
            }
        }
    }
}
@media only screen and (min-width: 1000px) {
    .smallLayout {
        display: none;
    }
}
</style>
