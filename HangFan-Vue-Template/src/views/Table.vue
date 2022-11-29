<template>
  <div class="user-manage">
    <div class="user-manage-table">
      <CommonTable
        ref="commonTableRef"
        :tableHeight="450"
        :pagination="false"
        :selectable="false"
        :tableData="tableData"
        :columnData="columnData"
      />
    </div>
  </div>
</template>
<script setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CommonTable from '@/components/common/CommonTable.vue'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
/**
 * data
 */
// 表格数据
let tableData = $ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
/**
 * method
 */
// 表头数据(放在最下面是为了获取参数:fun)
const columnData = [
  {
    label: '用户名',
    prop: 'name',
    width: '80',
  },
  {
    label: '地址',
    prop: 'address',
    width: '60',
  },
  {
    label: '注册时间',
    prop: 'date',
    width: '130',
    formatter(row, column, value) {
      return dayjs(value).locale('zh-cn').format('YYYY/MM/DD A hh:mm ')
    },
  },
]
</script>
<style lang="scss" scoped>
.user-manage {
  display: flex;
  flex-direction: column;

  &-table {
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }
}
</style>
