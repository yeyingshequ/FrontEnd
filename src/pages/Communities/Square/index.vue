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
                parent="cmtySquare"
                :cmtyCardList="cmtySquareCardList"
                @regetCmtyCard="reqGetCmtySquareCardList"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import {onMounted, reactive, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import CmtyCard from '@/components/Cards/CmtyCard/index.vue'
import {storeToRefs} from 'pinia'
import useCmtyStore from '@/store/community'
const cmtyStore = useCmtyStore()
const route = useRoute()
const router = useRouter()
let categoryList = reactive([
    {name: '全部', id: 1},
    {name: '游戏', id: 2},
    {name: '数码', id: 3},
    {name: '科学', id: 4},
    {name: '动漫', id: 5},
    {name: '音乐', id: 6},
    {name: '时尚', id: 7},
    {name: '文学', id: 8},
    {name: '校园', id: 9},
    {name: '明星', id: 10},
    {name: '交友', id: 11},
    {name: '个人', id: 12},
    {name: '情感', id: 13},
    {name: '战场', id: 14}
])

let {cmtySquareCardList} = storeToRefs(cmtyStore)

async function reqGetCmtySquareCardList() {
    cmtyStore.getCmtyCard({type: 'cmtySquare', keyWords: route.params.category as string})
}

watch(route, (nv: any, ov: any) => {
    reqGetCmtySquareCardList()
})

onMounted(() => {
    reqGetCmtySquareCardList()
})
</script>
<style scoped lang="scss">
.Square {
    display: flex;

    .category {
        position: fixed;
        width: 70px;
        height: 100vmax;
        border-right: 1px solid #f1f1f1;
        /* background-color: blueviolet; */
        div {
            @extend .flexCentreGSC;
            font-size: 15px;
            line-height: 40px;
            height: 40px;
            transition: 0.1s;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &:hover {
                background-color: mix(#ff44aa, white, 10%);
            }
        }

        .active {
            font-weight: bold;
            /* color: #ff44aa; */
            background-color: $button;
        }
    }

    .list {
        margin-left: 70px;
        width: 100%;
        /* background-color: blue; */
    }
}
</style>
