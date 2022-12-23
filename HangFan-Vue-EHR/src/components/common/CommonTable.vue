<template>
  <el-table
    default-expand-all
    style="margin-top: 10px"
    :loading="loading"
    :row-key="rowKey"
    ref="multipleTableRef"
    :data="tableData"
    :max-height="tableHeight"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      width="55"
      reserve-selection
      v-if="selectable"
    />
    <template v-for="(item, index) in columnData">
      <el-table-column
        :show-overflow-tooltip="true"
        :formatter="item.formatter"
        v-if="!item.slot && !item.showOperation"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
      />
      <!--      操作列-->
      <el-table-column
        label="操作"
        v-if="
          item.showOperation &&
          (item.operationConfig.type === 'button' ||
            item.operationConfig.type === 'switch')
        "
        :key="index"
        :label="item.label"
        :min-width="item.width"
        align="left"
        :fixed="item.fixed"
        header-align="left"
      >
        <template #default="scope">
          <template
            v-if="item.showOperation && item.operationConfig.type === 'button'"
          >
            <template v-for="(button, index) in item.operationConfig.buttons">
              <el-button
                :size="button.size"
                :key="index"
                @click="button.func(scope.row)"
                :link="button.link"
                :type="button.type"
                v-if="button.show ? button.show(scope.row) : true"
              >
                <i :class="button.icon"></i>{{ button.title }}
              </el-button>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div class="pagination">
    <el-pagination
      v-if="pagination"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup>
const emit = defineEmits([
  'handleSelectionChange',
  'handleCurrentChange',
  'handleSizeChange',
])
const multipleTableRef = $ref()
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  tableData: {
    type: Array,
    default: () => [],
    required: true,
  },
  columnData: {
    type: Array,
    default: () => [],
    required: true,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  tableHeight: {
    type: Number,
    default: 610,
  },
  // 是否分页
  pagination: {
    type: Boolean,
    default: true,
  },
})
// 表格已选项
let multipleSelection = $ref([])
// 清空已勾选项目
const clearAllChecked = () => {
  multipleTableRef.clearSelection()
}
// 处理勾选数据
const handleSelectionChange = (val) => {
  multipleSelection = val
  emit('handleSelectionChange', multipleSelection)
}
// 处理分页
const handleSizeChange = (val) => {
  emit('handleSizeChange', { currentPage: 1, pageSize: val })
}
const handleCurrentChange = (val) => {
  emit('handleCurrentChange', val)
}

defineExpose({
  clearAllChecked,
})
</script>
<style scoped lang="scss">
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
