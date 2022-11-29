<template>
<!--公共搜索组件-->
  <el-form>
    <el-form-item v-for="item in searchConfig" v-model="item."></el-form-item>
  </el-form>
  <el-form-item label="菜单名称" prop="menuName">
    <el-input v-model="queryParams.menuName" placeholder="请输入菜单名称"/>
  </el-form-item>
  <el-form-item label="菜单状态" prop="menuState">
    <el-select v-model="queryParams.menuState" placeholder="请选择菜单状态">
      <el-option label="正常" :value="1"/>
      <el-option label="停用" :value="2"/>
    </el-select>
  </el-form-item>

</template>

<script setup>
const props=defineProps({

})
</script>

<style scoped>

</style>