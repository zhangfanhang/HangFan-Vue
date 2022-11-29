<template>
  <div class="basic-layout">
    <div :class="['left-nav', isCollapse ? 'fold' : 'unfold']">
      <div class="logo">
        <img alt="logo" class="logo-img" src="@/assets/logo.png"/>
        <div class="logo-desc" v-if="!isCollapse">{{ title }}</div>
      </div>
      <!--      左侧菜单-->
      <menu-tree
          :isCollapse="isCollapse"
          :menu-list="menuList"
          class="left-nav-menu"
      />
    </div>
    <div :class="['right-content', isCollapse ? 'fold' : 'unfold']">
      <div class="top-nav">
        <div class="top-nav-left">
          <el-icon @click="toggle" class="top-nav-left-fold">
            <Fold/>
          </el-icon>
          <breadcrumb/>
        </div>
        <div class="top-nav-right">
          <el-badge :is-dot="!!noticeCount" class="top-nav-right-bell">
            <el-icon size="20">
              <Bell/>
            </el-icon>
          </el-badge>
          <el-dropdown
              @command="handleCommand2"
              trigger="click"
              class="top-nav-right-dropdown2"
          >
            <span style="color:#fff">
            <el-icon size="20" style="cursor: pointer"><SetUp/></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="exit">是否显示标签栏:
                  <el-switch v-model="showTabs"/>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown
              @command="handleCommand"
              trigger="click"
              class="top-nav-right-dropdown"
          >
            <span style="color:#fff">
              {{ userInfo.userName }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                >邮箱:{{ userInfo.userEmail }}
                </el-dropdown-item
                >
                <el-dropdown-item command="exit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <!--      标签栏-->
      <RouterTabs v-if="showTabs"/>
      <div class="main">
        <div class="main-page">
          <router-view v-slot="{Component}">
            <Transition
                mode="out-in"
                enter-active-class="animate__animated animate__fadeInBottomLeft animate__faster"
                leave-active-class="animate__animated animate__fadeOutBottomRight animate__faster"
            >
              <!--              缓存组件-->
              <KeepAlive>
                <component :is="Component"/>
              </KeepAlive>
            </Transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from '@/store/user.js'
import {useTabsStore} from "@/store/tabs.js";
import {storeToRefs} from 'pinia'
import {useRouter} from 'vue-router'
import {getNoticeCount, getPermissionList} from '@/api/home.js'
import {computed, onMounted} from 'vue'
import MenuTree from '@/components/MenuTree.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import {title} from '@/config/projectConfig.js'
import RouterTabs from "@/components/RouterTabs.vue";
import storage from "@/utils/storage.js";
import {loadAsyncRouter} from "@/utils/loadAsyncRouter.js";

const router = useRouter()
const userStore = useUserStore()
const tabStore = useTabsStore()
const {userInfo} = storeToRefs(userStore)
onMounted(() => {
  setNoticeCount()
  setMenuList()
})
// 是否显示标签栏
let showTabs = $ref(true)
// 动态控制标签栏的高度
let tabsHeight = computed(() => showTabs ? '132px' : '91px')
// 控制左侧菜单展开/关闭变量
let isCollapse = $ref(false)
// 待审批通知梳理
let noticeCount = $ref(0)
// 菜单列表
let menuList = $ref({})
// 右上角下拉菜单逻辑
const handleCommand = (command) => {
  if (command === 'exit') {
    // 清除用户信息｜按钮权限列表
    userStore.saveUserInfo({})
    userStore.saveUserAction([])
    tabStore.clearTabs()
    storage.clearItem('isLogin')
    router.push('/login')
  }
}
const handleCommand2 = (command) => {
  if (command === 'tabs') {
    showTabs = true
  }
}
// left-nav展开
const toggle = () => {
  isCollapse = !isCollapse
}
// 显示通知数量小红点
const setNoticeCount = async () => {
  noticeCount = await getNoticeCount()
}
// 设置菜单列表
const setMenuList = async () => {
  const res = await getPermissionList()
  userStore.saveUserAction(res.actionList)
  menuList = res.menuList
}
</script>

<style lang="scss" scoped>
.basic-layout {
  width: 100vw;
  height: 100vh;

  .left-nav {
    background-color: #ffffff;
    transition: width 0.5s;
    position: fixed;
    height: 100vh;

    &.fold {
      width: 64px;
    }

    &.unfold {
      width: 229px;
    }

    .logo {
      background-color: #2D5A74;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
      height: 50px;

      &-img {
        width: 50px;
      }

      &-desc {
        font-weight: bold;
        font-size: 19px;
        color: #03CF74;
      }
    }

    &-menu {
      // 取消el-menu自带1px右侧border
      border-right: none;
      height: calc(100vh - 50px);
    }
  }

  .right-content {
    height: 100vh;
    transition: all 0.5s;

    &.fold {
      margin-left: 64px;
    }

    &.unfold {
      margin-left: 229px;
    }

    .top-nav {
      display: flex;
      height: 50px;
      background-color: #2D5A74;
      color: #fff;
      border-bottom: 1px solid #eef0f3;
      line-height: 50px;
      justify-content: space-between;
      align-items: center;

      &-left {
        margin-left: 30px;
        display: flex;
        align-items: center;

        &-fold {
          cursor: pointer;
          margin-right: 20px;
        }
      }

      &-right {
        margin-right: 40px;
        display: flex;
        align-items: center;

        &-bell {
          cursor: pointer;
          line-height: 30px;
          margin-right: 20px;
          position: relative;
          top: 2px;
        }

        &-dropdown {
          cursor: pointer;
        }

        &-dropdown2 {
          margin-right: 20px;
        }
      }
    }
  }

  .main {
    padding: 20px;
    background-color: #eef0f3;
    height: calc(100vh - v-bind(tabsHeight));


    &-page {
      height: 100%;
      background-color: white;
      overflow: hidden;
    }
  }
}
</style>
