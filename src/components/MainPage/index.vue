<template>
    <div class="box">
        <div class="wrapper">
            <div class="borderline"></div>
            <div class="Mainpart" ref="viewPage" style="height: 100%">
                <router-view :key="mainStore.topLevelRouteKey"></router-view>
                <!-- <Home v-if="route.path == '/'" /> -->
            </div>
            <Nav></Nav>
            <CmtyCreator v-show="mainStore.showCmtyCreator" />
        </div>
    </div>
</template>
<script setup lang="ts">
import Nav from '@/components/MainPage/Nav/Nav.vue'
import {ref, watch} from 'vue'
import {RouterView, useRoute, useRouter} from 'vue-router'
import CmtyCreator from '@/components/CmtyCreator/index.vue'
import Home from '@/pages/Home/index.vue'
import useMainStore from '@/store/index'
import {storeToRefs} from 'pinia'
const mainStore = useMainStore()
const router = useRouter()
const route = useRoute()
let showLogout = ref(true)

function isNotShowLogout(e: any) {
    console.log(e)
}
watch(
    () => route.params,
    (nv, ov) => {
        //console.log('ov:', Object.values(ov)[0])
        //Object.values(nv)[0] == Object.values(ov)[0] ? console.log('true') : console.log(false)
        if (Object.values(nv)[0] !== Object.values(ov)[0]) {
            //console.log('不同params')
            mainStore.topLevelRouteKey++
        }
    }
)
</script>
<style scoped lang="scss">
.box {
    width: 1000px;

    .wrapper {
        padding-top: 60px;

        /* background-color: green; */
        .borderline {
            position: fixed;
            height: 100%;
            width: 700px;
            //background-color: rebeccapurple;
            border-left: 1px solid #f1f1f1;
            border-right: 1px solid #f1f1f1;
        }

        .Mainpart {
            position: relative;
            width: 700px;
            /* height: 100%; */
            /* background: red; */
            border: 1px #f1f1f1 solid;
            border-top: 0;
            border-bottom: 0;
            @media (max-width: 717px) {
                width: 98vw;
            }
        }
    }
}
@media (max-width: 1000px) {
    .box {
        width: 800px;
    }
}
@media (max-width: 717px) {
    .box {
        .wrapper {
            .Mainpart {
            }
        }
    }
}
</style>
