<template>
    <div class="tabs">
            <router-link v-for="(tab, index) in tabs" :key="tab.id" :to="tab.router" class="router" @click.native="getId(tab)">
<<<<<<< HEAD
                <span :class="{ actived: tab.pathName == $route.name}">{{ tab.Name }}
                    <div v-show="tab.pathName == $route.name"></div>
=======
                <span :class="{ actived: tab.id == currentId }">{{ tab.Name }}
                    <div v-show="tab.id == currentId"></div>
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
                </span>
            </router-link>
        </div>
</template>
<script>
export default {
    name:'Tab',
    data() {
        return {
<<<<<<< HEAD

=======
           currentId:'1' 
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
        }
    },
    props:[
        'tabs'
    ],
    methods: {
        getId(tab) {
            console.log(tab.id);
            this.currentId = tab.id
        }
    },
<<<<<<< HEAD
  mounted() {
    console.log(this.$route)
  }

=======
    
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
}
</script>
<style scoped lang="scss">
.tabs {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 55px;
    border-bottom: 1px #f1f1f1 solid;

    .router {
        display: flex;
        position: relative;
        justify-content: center;
        flex: 1;
        height: 100%;
        width: 698px;
        transition: 0.1s;

        &:hover {
            background-color: mix(#ff44aa, white, 10%)
        }

        span {
            position: absolute;
            line-height: 55px;

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
</style>