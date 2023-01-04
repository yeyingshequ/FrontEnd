<template>
    <div class="LoginAndRegister" v-if="showLoginScreen">
        <div class="wrapper" :class="{registerStyle: !isLogin}">
            <i class="iconfont icon-guanbi1" @click="close()"></i>
            <div class="background" :class="{registerStyle: !isLogin}"></div>
            <div class="inputinfo">
                <!--登录界面-->
                <div class="login" v-if="isLogin">
                    <div class="title">登 录</div>
                    <div class="input">
                        <input
                            v-model="loginParams.username"
                            @keyup.enter="reqLogin"
                            type="text"
                            placeholder="用户名"
                            class="nameAndPswd"
                        />
                        <input
                            v-model="loginParams.password"
                            @keyup.enter="reqLogin"
                            type="password"
                            placeholder="密码"
                            class="nameAndPswd"
                        />
                        <input type="submit" value="Login" class="submit" @click="reqLogin" />
                        <span class="message">{{ loginMessage }}</span>
                    </div>
                    <div class="fn">
                        <span @click="isLogin = false"> 注册账号 </span>
                        <span> 找回密码 </span>
                    </div>
                </div>
                <!--注册界面-->
                <div class="register" v-else>
                    <div class="title">注 册</div>
                    <div class="input">
                        <input
                            v-model="registerParams.username"
                            @keyup.enter="reqRegister(registerParams)"
                            style="margin-top: 10px"
                            type="text"
                            placeholder="用户名"
                            name=""
                            id=""
                            class="nameAndPswd"
                        />
                        <input
                            v-model="registerParams.email"
                            @keyup.enter="reqRegister(registerParams)"
                            type="email"
                            placeholder="邮箱"
                            name="nameAndPswd"
                            id=""
                        />
                        <input
                            v-model="registerParams.password"
                            @keyup.enter="reqRegister(registerParams)"
                            type="password"
                            placeholder="密码"
                            name=""
                            id=""
                            class="nameAndPswd"
                        />
                        <input
                            v-model="registerParams.confirmPassword"
                            @keyup.enter="reqRegister(registerParams)"
                            type="password"
                            placeholder="确认密码"
                            name=""
                            id=""
                            class="nameAndPswd"
                        />
                        <input
                            type="submit"
                            value="Login"
                            class="submit"
                            @keyup.enter="reqRegister(registerParams)"
                            @click="reqRegister(registerParams)"
                        />
                        <span class="message">{{ registerMessage }}</span>
                    </div>
                    <div class="fn">
                        <span @click="isLogin = true"> 登录账号 </span>
                        <span> 找回密码 </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="LoginAndRegister">
import {getMyInfo, registerApi} from '@/api/index.js'
import scroll from '@/tools/scroll'
import cookie from '@/tools/cookie'
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import useLoginStore from '@/store/login'
import useMainStore from '@/store/index'
import {storeToRefs} from 'pinia'
import useUserInfoStore from '@/store/user'
const userInfoStore = useUserInfoStore()
const store = useLoginStore()
const mainStore = useMainStore()
const router = useRouter()
let isLogin = ref(true)
let loginParams = reactive({
    username: '',
    password: ''
})
let loginMessage = ref('')
let registerMessage = ref('')
let {showLoginScreen} = storeToRefs(mainStore)
function close() {
    mainStore.showLoginScreen = false
    //console.log(this.showLoginScreen)
    scroll.move()
}
function reqLogin() {
    store.login(loginParams).then(async (result) => {
        loginMessage.value = result.message
        cookie.setCookie('UID', result.userId, 730)
        console.log('loginMessage', loginMessage.value)
        //关闭登录框
        if (loginMessage.value == '登录成功') {
            console.log('账号登录成功')
            setTimeout(() => {
                console.log('111')
                close()
                loginMessage.value = ''
            }, 1000)
            router.go(0)
        }
    })
}

let registerParams = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
})

async function reqRegister(params: any) {
    let result = await registerApi(registerMessage)
    //console.log(result.message)
    registerMessage.value = result.message
    if (registerMessage.value == '注册成功') {
        setTimeout(() => {
            isLogin.value = true
            for (let key in registerParams) {
                let newKey = key as unknown as keyof typeof registerParams
                registerParams[newKey] = ''
            }
            registerMessage.value = ''
        }, 1000)
    }
}
</script>

<style scoped lang="scss">
.LoginAndRegister {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(mix($brandColor, black, 10%), 0.5);
    z-index: 999;

    .wrapper {
        position: relative;
        -webkit-user-select: none;
        display: flex;
        width: 800px;
        height: 500px;
        background-color: #ffc7e6;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 10px 5px 5px #ffecf7;

        i {
            position: absolute;
            color: $brandColor;
            font-size: 30px;
            top: 10px;
            right: 10px;
            cursor: pointer !important;
            z-index: 1;
        }

        .background {
            height: 100%;
            width: 290px;
            background-image: url('https://p6.itc.cn/images01/20210213/093e7a5bb5034d3496465a66c6f2a5ae.jpeg');
            background-size: cover;
        }

        //注册时的背景图片
        .registerStyle {
            height: 100%;
            width: 290px;
            background-color: #cf3a33;
            background-image: url('@/images/魔道学者.jpg');
            background-size: cover;
            background-position: -10px;
        }

        .inputinfo {
            width: 510px;
            height: 100%;

            //.login和register的共有样式,除了表单的margin-top,其他样式一致
            .login,
            .register {
                display: flex;
                position: relative;
                flex-direction: column;
                align-items: center;
                width: inherit;
                height: inherit;

                .title {
                    font-size: 25px;
                    font-weight: bold;
                    color: $brandColor;
                    margin-top: 50px;
                }

                .input {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    input {
                        outline: none;
                        height: 50px;
                        width: 320px;
                        font-size: large;
                        border: none;
                        border-bottom: 1px solid $brandColor;
                        background-color: inherit;
                        padding: 15px 0 0 15px;
                    }

                    .message {
                        position: absolute;
                        bottom: -26px;
                        color: $mainFont;
                    }

                    .submit {
                        padding: 0;
                        height: 45px;
                        width: 190px;
                        font-weight: bold;
                        color: white;
                        vertical-align: top;
                        background-color: $brandColor;
                        border-radius: 50px;
                        cursor: pointer;

                        &:hover {
                            background-color: mix($brandColor, black, 90%);
                        }
                    }
                }

                .fn {
                    width: 80%;
                    display: flex;
                    justify-content: space-between;
                    position: absolute;
                    bottom: 30px;

                    span {
                        color: $regularFont;
                        text-decoration: underline;
                        cursor: pointer;

                        &:hover {
                            color: deeppink;
                        }
                    }
                }
            }

            .login {
                .input {
                    input {
                        margin-top: 45px;
                    }
                }
            }

            .register {
                .input {
                    input {
                        margin-top: 20px;
                    }
                }
            }
        }
    }
}

//解决谷歌浏览器记住密码——导致Input组件出现特殊样式的修改
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    -webkit-text-fill-color: $mainFont !important; //这个地方的颜色是字体颜色，可以根据实际情况修改
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important; //设置input输入框的背景颜色为透明色
    background-color: transparent; //设置input输入框的背景颜色为透明色
    background-image: none;
    transition: background-color 50000s ease-in-out 0s;
}

input {
    background-color: transparent; //设置input输入框的背景颜色为透明色
}
</style>
