<template>
  <router-view></router-view>
</template>
<script setup>
import { useRoute } from 'vue-router'
import {  watch } from 'vue'
const route = useRoute()
import {useTabsStore} from "@/store/tabs.js";
const tabsStore=useTabsStore()
// 监听路由变化
watch(
    [() => route.path,()=>route.meta.title],
    async newValue => {
      if(route.path==='/404') return
      tabsStore.changeTab(newValue[0])
      tabsStore.saveTab({path:newValue[0],title:newValue[1]})
    }
)

</script>
