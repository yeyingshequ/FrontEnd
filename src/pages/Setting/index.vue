<template>
    <div class="settingContainer">
        <div class="settingList">
            <div class="sections">
                <div
                    class="selection"
                    v-for="(setting, index) in settingList"
                    :class="{active: setting.routeName == route.name}"
                    @click="$router.push(`/setting/${setting.path}`)"
                >
                    <span>{{ setting.name }}</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
        </div>
        <div class="detail">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import {useRoute} from 'vue-router'
const route = useRoute()
const settingList = [
    {name: '修改密码', path: 'password', routeName: 'Password'},
    {name: '账号信息', path: 'account', routeName: 'Account'}
]
</script>

<style scoped lang="scss">
.settingContainer {
    display: flex;
    .settingList {
        width: 120px;
        border-right: 1px solid #f1f1f1;
        height: 100vh;
        flex-shrink: 0;

        .sections {
            .active {
                font-weight: bold;
                color: $brandColor;
            }
            .selection {
                position: relative;

                height: 50px;
                padding: 0 20px;
                cursor: pointer;

                &:hover {
                    background-color: $onHover;
                }

                span {
                    font-size: 17px;
                    line-height: 50px;
                }

                i {
                    position: absolute;
                    font-size: 20px;
                    right: 20px;
                    line-height: 50px;
                }
            }
        }
    }
    .detail {
        flex-grow: 1;
        width: 100%;
    }
}
@media (max-width: 717px) {
    .settingContainer {
        .settingList {
            .sections {
            }
        }
    }
}
</style>
