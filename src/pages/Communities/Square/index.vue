<template>
    <div class="Square">
        <div class="category">
            <div
                v-for="(category, index) in categoryList"
                :key="category.name"
                @click="$router.push(`/communities/square/${category.name}`)"
                :class="{active: category.name == $route.params.category}"
            >
                {{ category.name }}
            </div>
        </div>
        <div class="list">
            <CmtyCard
                :cmtyCardList="cmtySquareCardList"
                @regetSquareCmty="reqGetCmtySquareCardList"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import {getCmtySquareCardList} from '@/api'
import rename from '@/tools/rename'
import {onMounted, reactive, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import CmtyCard from '@/components/CmtyCard/index.vue'
import {storeToRefs} from 'pinia'
import useRouterStore from '@/store/community'
const routerStore = useRouterStore()
const route = useRoute()
const router = useRouter()
let categoryList = reactive([
    {name: '全部', id: 1},
    {name: '游戏', id: 2},
    {name: '数码', id: 3},
    {name: '科学', id: 4},
    {name: '动漫', id: 5},
    {name: '音乐', id: 6},
    {name: '休闲时尚', id: 7},
    {name: '文学', id: 8},
    {name: '校园', id: 9},
    {name: '明星', id: 10},
    {name: '网友俱乐部', id: 11},
    {name: '个人社区', id: 12},
    {name: '情感', id: 13}
])

let {cmtySquareCardList} = storeToRefs(routerStore)

async function reqGetCmtySquareCardList() {
    routerStore.getCmtySquareCardList(route.params)
}

watch(route, (nv: any, ov: any) => {
    reqGetCmtySquareCardList()
})

onMounted(() => {
    router.push('/communities/square/全部')
    reqGetCmtySquareCardList()
})
</script>
<style scoped lang="scss">
.Square {
    display: flex;

    .category {
        position: fixed;
        width: 100px;
        height: 100vmax;
        border-right: 1px solid #f1f1f1;

        /* background-color: blueviolet; */
        div {
            font-size: 15px;
            line-height: 40px;
            padding-left: 15px;
            height: 40px;
            transition: 0.1s;
            cursor: pointer;

            &:hover {
                background-color: mix(#ff44aa, white, 10%);
            }
        }

        .active {
            font-weight: bold;
            /* color: #ff44aa; */
            background-color: mix(#ff44aa, white, 20%);
        }
    }

    .list {
        margin-left: 100px;
        width: 100%;
        /* background-color: blue; */
    }
}
</style>
