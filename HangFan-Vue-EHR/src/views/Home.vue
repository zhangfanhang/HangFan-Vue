<template>
  <div class="home-container">
    <avue-data-box :option="option"></avue-data-box>
  </div>

</template>
<script>
export default {
  data() {
    return {
      option: {
        span: 6,
        data: [
          {
            title: '错误日志',
            count: 12332,
            icon: 'el-icon-warning',
            color: 'rgb(242,56,72)',
          },
          {
            title: '用户数量',
            count: 33,
            icon: 'el-icon-user',
            color: 'rgb(56, 161, 242)',
          },
          {
            title: '菜单数量',
            count: 16,
            icon: 'el-icon-setting',
            color: 'rgb(117, 56, 199)',
          },
          {
            title: '权限管理',
            count: 77,
            icon: 'el-icon-lock',
            color: 'rgb(199,180,56)',
          },
        ]
      },
    }
  }
}
</script>
<style scoped lang="scss">
.home-container {
  padding: 20px;
  overflow-y: auto;
  height: 100%;
}
</style>