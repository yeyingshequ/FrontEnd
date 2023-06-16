<template>
    <div class="tabs" :class="{hasTop: checkHasTop()}" ref="tabScroll">
        <div v-for="tab in tabs" :key="tab.id" class="router" @click="routeJump(tab.router)">
            <span :class="{actived: tab.routeName == route.name /* || tab.default */}"
                >{{ tab.Name }}
                <div v-show="tab.routeName == route.name /* || tab.default */"></div>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref, toRefs, watch} from 'vue'
import {useRoute, RouterLink, useRouter, RouteLocationRaw} from 'vue-router'
import useIndexStore from '@/store/index'
import useMainStore from '@/store/index'
const mainStore = useMainStore()
const indexStore = useIndexStore()
const router = useRouter()
const props = defineProps(['tabs', 'parentTop'])

//console.log('tabs', props.tabs)
let parentTop = computed(() => {
    return props.parentTop
})
let tabs = computed(() => {
    return props.tabs
})
watch(
    props.tabs,
    (nv) => {
        //console.log('tab nv', nv)
    },
    {deep: true}
)

let tabScroll = ref()
let tabStyle = ref()
//查询看否有top
function checkHasTop(): boolean {
    return route.meta.hasTop ? true : false
}
function routeJump(link: string) {
    //console.log('路由连接:', link)

    router.push(link)
}

const route = useRoute()
let lastParentTop = ref(0)
onMounted(() => {
    /* if (route.meta.hasTop) {
        window.addEventListener('scroll', function () {
            let distance = tabScroll.value.getBoundingClientRect().top
            //console.log('distance:', distance)
            //console.log('parentTop:', mainStore.parentTop)
            let direct = mainStore.parentTop - lastParentTop.value
             if (direct > 0) {
                //console.log('往上')
                tabStyle.value = {position: 'relative'}
            } else {
                //console.log('往下')
                tabStyle.value = {top: '60px', position: 'stiky'}
            }
            lastParentTop.value = mainStore.parentTop

            if (distance <= 110) {
                if (parentTop) indexStore.topScroll = `${distance - 50}px`
                //console.log('topScroll:', indexStore.topScroll)
            } else {
                indexStore.topScroll = '60px'
            } 
        })
    } */
    //console.log('tab:', tabs.value)
})
</script>
<style scoped lang="scss">
.tabs {
    position: sticky;
    top: 60px;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 55px;
    background-color: white;
    border-bottom: 1px #f1f1f1 solid;
    z-index: 1;

    .router {
        display: flex;
        position: relative;
        justify-content: center;
        flex: 1;
        height: 100%;
        //width: 698px;
        transition: 0.1s;
        cursor: pointer;

        &:hover {
            background-color: mix(#ff44aa, white, 10%);
        }

        span {
            position: absolute;
            line-height: 55px;
            white-space: nowrap;

            div {
                bottom: 0;
                position: absolute;
                width: 100%;
                height: 4px;
                border-radius: 50px;
                background-color: $brandColor;
            }
        }

        .actived {
            font-weight: bold;
        }
    }
}
.hasTop {
    top: 110px;
}
</style>
