<template>
  <el-button type="primary" @click="query">查询</el-button>
  <el-button @click="reSet">重置</el-button>
</template>
<script setup>
const props = defineProps({
  query: {
    type: Function,
    required: true
  },
  reSet: {
    type: Function,
    required: true
  }
})
</script>