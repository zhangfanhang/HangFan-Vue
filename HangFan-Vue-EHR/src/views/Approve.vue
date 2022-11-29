<template>
  <div class="role-manage">
    <div class="role-manage-from">
      <el-form :inline="true" :model="queryParams" ref="elFormRef">
        <el-form-item label="审批状态" prop="applyState">
          <el-select v-model="queryParams.applyState" placeholder="请选择用户状态">
            <el-option
                v-for="item in applyStateList"
                :value="item.value"
                :key="item.value"
                :label="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <common-btns :query="setApproveList" :re-set="reSet"></common-btns>
        </el-form-item>
      </el-form>
    </div>
    <div class="role-manage-table">
      <CommonTable
          ref="commonTableRef"
          :tableHeight="450"
          rowKey="roleId"
          :selectable="false"
          :tableData="tableData"
          :columnData="columnData"
          :currentPage="pageParams.pageNum"
          :pageSize="pageParams.pageSize"
          :total="total"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
      />
    </div>
    <el-dialog :title="dialogTitle" width="40%" v-model="dialogVisible">
      <el-input v-model="remark" placeholder="请输入备注"></el-input>
      <template #footer>
        <el-button @click="submit(approve,'refuse')">拒 绝</el-button>
        <el-button type="primary" @click="submit(approve,'other')">通 过</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {onMounted} from "vue"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import CommonTable from "@/components/common/CommonTable.vue"
import {ElMessage} from "element-plus"
import "dayjs/locale/zh-cn"
import _ from 'lodash'
import CommonBtns from "@/components/common/CommonBtns.vue";
import {getApplyList, handleApproveOperate} from "@/api/leave.js";

dayjs.locale("zh-cn")
dayjs.extend(relativeTime)
/**
 * data
 */
// 当前审批
let approve = $ref({})
// 休假类型列表
const applyTypeList = {
  1: '事假',
  2: '调休',
  3: '年假',
}
// 用户状态列表
const applyStateList = [
  {
    label: '待审批',
    value: 1,
  },
  {
    label: '审批中',
    value: 2,
  },
  {
    label: '审批拒绝',
    value: 3,
  },
  {
    label: '审批通过',
    value: 4,
  },
  {
    label: '作废',
    value: 5,
  }
]
let leaveDetail = $ref({})
// 表单校验规则
const rules = {
  applyType: [
    {required: true, message: "请选择休假类型", trigger: "change"}
  ],
  time: [
    {required: true, message: "请选择休假时间", trigger: "change"}
  ],
}
// 用户操作
let action = $ref("create")
// 休假申请 弹窗可见性
let dialogVisible = $ref(false)
// 弹窗标题
let dialogTitle = $ref("是否通过此休假申请？")
// 查询表单Ref
const elFormRef = $ref()
// 表格Ref
const commonTableRef = $ref()
// 休假申请表单ref
const leaveInfoForm = $ref()
// 查询参数
const queryParams = $ref({
  applyState: ''
})
// 分页参数
let pageParams = $ref({
  pageSize: 10,
  pageNum: 1
})
// loading
let loading = $ref(true)
// 数据总数量
let total = $ref(0)
// 表格数据
let tableData = $ref([])
// 备注
let remark=$ref('')
/**
 * method
 */
// 提交
const submit = async (row,action) => {
  await handleApproveOperate({
    _id:row._id,
    remark,
    action
  })
  ElMessage.success("审核成功")
  await setApproveList()
  dialogVisible = false
}
// 重置查询表单
const reSet = () => {
  elFormRef.resetFields()
  setApproveList()
}
// 设置列表
const setApproveList = async () => {
  loading = true
  let params = {...queryParams, ...pageParams, type: 'approve'}
  let {list, page} = await getApplyList(params)
  total = page.total
  tableData = list
  loading = false
}
// 分页sizeChange
// TODO: 如何通过一个自定义事件完成分页操作
const handleSizeChange = val => {
  pageParams.pageSize = val.pageSize
  pageParams.pageNum = val.currentPage
  setApproveList()
}
// 分页numChange
const handleCurrentChange = val => {
  pageParams.pageNum = val
  setApproveList()
}
// Mounted
onMounted(() => {
  // 获取审批列表
  setApproveList()
})
// 表格操作：审核
const handleEdit = row => {
  dialogVisible=true
  approve = _.cloneDeep(row)
}
// 表头数据(放在最下面是为了获取参数:fun)
const columnData = [
  {
    label: "单号",
    prop: "orderNo",
    width: "60",
  },
  {
    label: "申请人",
    prop: "applyUser.userName",
    width: "60",
  },
  {
    label: "休假时间",
    prop: "",
    width: "60",
    formatter(row) {
      return `${dayjs(row.startTime).locale("zh-cn").format("YYYY/MM/DD")}~${dayjs(row.endTime).locale("zh-cn").format("YYYY/MM/DD")}`
    }
  },
  {
    label: "休假时长",
    prop: "leaveTime",
    width: "60",
    formatter(row, column, value) {
      return `${value}天`
    }
  },
  {
    label: "休假类型",
    prop: "applyType",
    width: "60",
    formatter(row, column, value) {
      return applyTypeList[value]
    }
  },
  {
    label: "休假原因",
    prop: "reasons",
    width: "60",
  },
  {
    label: "申请时间",
    prop: "createTime",
    width: "80",
    formatter(row, column, value) {
      return dayjs(value).locale("zh-cn").format("YYYY/MM/DD A hh:mm ")
    }
  },
  {
    label: "审批人",
    prop: "auditUsers",
    width: "60",
  },
  {
    label: "当前审批人",
    prop: "curAuditUserName",
    width: "60",
  },
  {
    label: "审批状态",
    prop: "applyState",
    width: "60",
    formatter(row, column, value) {
      const res = applyStateList.filter(item => item.value === value)
      return res[0].label
    }
  },
  {
    width: "100",
    fixed: "right",
    showOperation: true,
    operationConfig: {
      type: "button",
      buttons: [
        {
          title: "审核",
          func: handleEdit,
          link: true,
          type: "primary",
          show:row=>row.applyState===1||row.applyState===2
        },
      ]
    }
  }
]
</script>
<style lang="scss" scoped>
.role-manage {
  display: flex;
  flex-direction: column;

  &-from {
    margin: 20px 0 0 20px;
    display: flex;
    justify-content: center;
  }

  &-table {
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }
}
</style>
