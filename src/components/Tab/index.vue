<template>
  <div class="tabs">
    <router-link v-for="(tab) in tabs" :key="tab.id" :to="tab.router" class="router" @click.native="getId(tab)">
      <span :class="{ actived: tab.routeName == route.name }">{{ tab.Name }}
        <div v-show="tab.routeName == route.name"></div>
      </span>
    </router-link>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
const props = defineProps(
  ['tabs']
)
//console.log(props.tabs);

let { tabs } = toRefs(props)

let currentId = ref(0)

function getId(tab: { id: number }) {
  currentId.value = tab.id
}

const route = useRoute()
onMounted(() => {
  //console.log("route.name", route.name);
  //console.log("tabs", tabs);

})
</script>
<style scoped lang="scss">
.tabs {
  position: absolute;
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
    width: 698px;
    transition: 0.1s;

    &:hover {
      background-color: mix(#ff44aa, white, 10%);
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
