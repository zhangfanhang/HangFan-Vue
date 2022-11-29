<template>
  <!--菜单组件-->
  <el-menu
      @select="menuSelect"
      background-color="#2D5A74"
      text-color="#fff"
      :collapse="isCollapse"
      :default-active="activeHash"
      :default-openeds="['/'+activeHash.split('/')[1]]"
      unique-opened
      router
  >
    <template v-for="menu in menuList" :key="menu._id">
      <el-sub-menu v-if="menu.children &&menu.children.length > 0 &&menu.children[0].menuType === 1" :index="menu.path">
        <template #title>
          <el-icon>
            <component :is="menu.icon"/>
          </el-icon>
          <span>{{ menu.menuName }}</span>
        </template>
        <!--        递归组件-->
        <menu-tree :menuList="menu.children"/>
      </el-sub-menu>
      <el-menu-item
          v-else-if="menu.menuType === 1"
          :index="menu.path">
        <el-icon v-if="menu.icon">
          <component :is="menu.icon"/>
        </el-icon>
        {{ menu.menuName }}
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup>
import {useTabsStore} from "@/store/tabs.js";
import {computed} from "vue";
const tabsStore = useTabsStore()
const props = defineProps(["menuList", "isCollapse"])
// 当前激活的hash路由
let activeHash = computed(() => tabsStore.currentTab)
const menuSelect = (index) => {
  tabsStore.changeTab(index)
}
</script>