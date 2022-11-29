<template>
  <div class="notFound">
    <img src="@/assets/logo.png" alt="" style="width: 100px;height: 88px">
    <div class="title">{{ title }}</div>
    <img src="@/assets/404.png" alt="404" style="width: 400px;height: 400px">
    <div class="desc">你要找的页面不存在!</div>
    <el-button @click='goHome' type="primary" class="btn"> 带我回家</el-button>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {title} from '../config/projectConfig.js'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>
<style scoped lang="scss">
.notFound {
  width: 100vw;
  height: 100vh;
  background-color: #2D5A74;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .desc {
    position: relative;
    bottom: 50px;
    font-size: 30px;
    color: #00CF74;
  }

  .title {
    font-size: 50px;
    color: #00CF74;
    margin-top: 40px;
  }
}
</style>