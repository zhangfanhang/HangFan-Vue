<template>
  <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      class="demo-tabs"
      @tab-remove="removeTab"
      @tab-click="clickTab"
  >
    <el-tab-pane
        v-for="item in tabs"
        class="tab-pane"
        :key="item.path"
        :label="item.title"
        :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<!--路由tab切换组件-->
<script setup>
import Sortable from "sortablejs"
import {useTabsStore} from "@/store/tabs.js";
import {computed, onMounted} from "vue";
import {useRouter} from "vue-router";

const tabsStore = useTabsStore()
const router = useRouter()
let editableTabsValue = computed(() => tabsStore.currentTab)
let tabs = computed(() => tabsStore.tabs)
// 实现拖拽
const rowDrop = async () => {
  const el = document.querySelector('.el-tabs__nav')
  Sortable.create(el, {
    onEnd({newIndex, oldIndex}) {                             //oldIIndex拖放前的位置， newIndex拖放后的位置
      const currRow = tabsStore.tabs.splice(oldIndex, 1)[0]   //鼠标拖拽当前的el-tabs-pane
      tabsStore.tabs.splice(newIndex, 0, currRow)           //tableData 是存放所以el-tabs-pane的数组
    }
  })
}
onMounted(() => {
  rowDrop()
})
const removeTab = (targetName) => {
  if (targetName === '/welcome') return
  tabsStore.tabs.forEach((item, index) => {
    if (item.path === targetName && tabsStore.tabs[index - 1] && tabsStore.currentTab === targetName) {
      router.push(tabsStore.tabs[index - 1].path)
    }
  })
  tabsStore.removeTab(targetName)
}
const clickTab = (v) => {
  router.push(v.props.name)
}
</script>

<style scoped lang="scss">
.demo-tabs {
  height: 41px;
}
</style>