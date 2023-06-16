<template>
    <div class="moreNavContainer" @click="showMoreNav = false">
        <Mask />
        <div class="navbox">
            <div
                v-for="(nav, index) in navList"
                :key="nav.id"
                class="items"
                @click="pushRoute(nav.path)"
            >
                <i :class="nav.icon"></i>
                <span>{{ nav.name }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import useMainStore from '@/store/index'
import {storeToRefs} from 'pinia'
import {ref, watch} from 'vue'
import {RouteLocationRaw, useRoute, useRouter} from 'vue-router'
import Mask from '@/components/littleComponents/Mask.vue'
import emitter from '@/tools/mitt'

const router = useRouter()
const mainStore = useMainStore()
const route = useRoute()

let {showMoreNav} = storeToRefs(mainStore)
//当前的路由地址
let currentNav = ref('')
function pushRoute(path: string) {
    router.push(path)
    emitter.emit('showMiniNav')
}
watch(route, (nv: any, ov: any) => {
    currentNav.value = nv.name
})

interface list {
    name: string
    id: number
    path: string
    pathName: string
    icon: string
}
const navList: list[] = [
    {
        name: '收藏',
        id: 6,
        pathName: 'Saved',
        path: '/saved',
        icon: 'iconfont icon-saved'
    },
    {
        name: '浏览历史',
        id: 7,
        pathName: 'History',
        path: '/history',
        icon: 'iconfont icon-bofangjilu'
    },
    {
        name: '设置',
        id: 8,
        pathName: 'Setting',
        path: '/setting',
        icon: 'iconfont icon-shezhi'
    }
]
</script>
<style lang="scss" scoped>
.moreNavContainer {
    position: relative;

    .mask {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }

    .navbox {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 300px;
        height: 180px;
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 10px 1px rgb(255, 199, 230);
        cursor: pointer;
        z-index: 1;

        .items {
            display: flex;
            align-items: center;
            width: 100%;
            height: 60px;
            padding-left: 40px;

            &:hover {
                background-color: $onHover;
            }

            i {
                font-size: 27px;
                font-weight: bold;
                margin-left: 20px;
                margin-right: 20px;
            }

            span {
                font-size: 20px;
                font-weight: bold;
            }
        }
    }
}
</style>
