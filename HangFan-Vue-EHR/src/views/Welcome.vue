<template>
  <div class="welcome">
    <div class="welcome-content">
      <span> {{ userInfo.userName }}</span>,欢迎访问{{ title }}
      <div class="welcome-content-desc">一个由Vue 3 + Vue-Router + Element-Plus + Pinia打造的后台管理系统</div>
      <div class="welcome-content-desc-en">A background management system built by Vue 3 + Vue-Router + Element-Plus + Pinia</div>
    </div>
  </div>
</template>
<script setup>
import {storeToRefs} from "pinia"
import {useUserStore} from "@/store/user.js"
import {title} from "@/config/projectConfig.js"

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)
</script>
<style lang="scss" scoped>
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;

  &-content {
    font-size: 40px;

    &-desc {
      color: rgba(0, 207, 116, 1);
      font-size: 16px;
      margin-top: 3px;

      &-en {
        margin-top: 3px;
        font-size: 16px;
      }
    }
  }
}
</style>
