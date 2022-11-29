<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item,index) in matched" >
      <router-link to="/welcome" v-if='index===0' style="color:#fff !important;">{{ item.meta.title }}</router-link>
      <span v-else style="color:#fff">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import {useRoute} from "vue-router"
import {ArrowRight} from "@element-plus/icons-vue"
import {computed} from "vue"

const router = useRoute()
const matched = computed(() => {
  return router.matched
})
</script>